
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.model.js";
import { login } from '../auth.service';


// src/services/auth.service.test.js


// src/services/auth.service.test.js
jest.mock("../../models/User.model.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe('login() login method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy paths', () => {
    it('should return a token and user details when login is successful', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      const user = { _id: '123', name: 'Test User', email, password: 'hashedPassword' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockToken');

      // Act
      const result = await login({ email, password });

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      expect(result).toEqual({
        token: 'mockToken',
        user: { id: user._id, name: user.name, email: user.email },
      });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if the user is not found', async () => {
      // Arrange
      const email = 'nonexistent@example.com';
      const password = 'password123';
      User.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(login({ email, password })).rejects.toThrow('User not found');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
    });

    it('should throw an error if the password is incorrect', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'wrongPassword';
      const user = { _id: '123', name: 'Test User', email, password: 'hashedPassword' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      // Act & Assert
      await expect(login({ email, password })).rejects.toThrow('Invalid password');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    });

    it('should handle JWT signing errors gracefully', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      const user = { _id: '123', name: 'Test User', email, password: 'hashedPassword' };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockImplementation(() => {
        throw new Error('JWT signing error');
      });

      // Act & Assert
      await expect(login({ email, password })).rejects.toThrow('JWT signing error');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    });
  });
});