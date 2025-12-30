
import jwt from "jsonwebtoken";
import User from "../../models/User.model.js";
import { forgot } from '../auth.service';


// src/services/auth.service.test.js


// src/services/auth.service.test.js
jest.mock("../../models/User.model.js");
jest.mock("jsonwebtoken");

describe('forgot() forgot method', () => {
  const mockEmail = 'test@example.com';
  const mockUser = {
    _id: '12345',
    name: 'Test User',
    email: mockEmail,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy paths', () => {
    it('should return a reset URL and user details when the user is found', async () => {
      // Arrange
      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mockToken');
      process.env.JWT_SECRET = 'secret';
      process.env.FRONTEND_URL = 'http://localhost:3000';

      // Act
      const result = await forgot({ email: mockEmail });

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockEmail } });
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser._id, email: mockUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
      expect(result).toEqual({
        resetUrl: 'http://localhost:3000/reset-password?token=mockToken',
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email },
      });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if the user is not found', async () => {
      // Arrange
      User.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(forgot({ email: mockEmail })).rejects.toThrow('User not found');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockEmail } });
    });

    it('should throw an error if JWT signing fails', async () => {
      // Arrange
      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockImplementation(() => {
        throw new Error('JWT signing failed');
      });

      // Act & Assert
      await expect(forgot({ email: mockEmail })).rejects.toThrow('JWT signing failed');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockEmail } });
    });
  });
});