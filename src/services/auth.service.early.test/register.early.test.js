
import bcrypt from "bcryptjs";
import User from "../../models/User.model.js";
import { register } from '../auth.service';


// src/services/auth.service.test.js


// src/services/auth.service.test.js
jest.mock("../../models/User.model.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe('register() register method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy paths', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      const data = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword123';
      const createdUser = { _id: 'userId123', name: 'John Doe', email: 'john@example.com' };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue(hashedPassword);
      User.create.mockResolvedValue(createdUser);

      // Act
      const result = await register(data);

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });
      expect(result).toEqual({ id: createdUser._id, name: createdUser.name, email: createdUser.email });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if the email is already registered', async () => {
      // Arrange
      const data = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
      const existingUser = { _id: 'userId123', name: 'John Doe', email: 'john@example.com' };

      User.findOne.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(register(data)).rejects.toThrow('Email already registered');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
    });

    it('should handle bcrypt hash failure gracefully', async () => {
      // Arrange
      const data = { name: 'John Doe', email: 'john@example.com', password: 'password123' };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockRejectedValue(new Error('Hashing failed'));

      // Act & Assert
      await expect(register(data)).rejects.toThrow('Hashing failed');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
    });

    it('should handle User.create failure gracefully', async () => {
      // Arrange
      const data = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword123';

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue(hashedPassword);
      User.create.mockRejectedValue(new Error('User creation failed'));

      // Act & Assert
      await expect(register(data)).rejects.toThrow('User creation failed');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });
    });
  });
});