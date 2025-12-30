
import bcrypt from "bcryptjs";
import User from "../../models/User.model.js";
import { resetPassword } from '../auth.service';

jest.mock("../../models/User.model.js");
jest.mock("bcryptjs");

describe('resetPassword() resetPassword method', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      update: jest.fn(),
    };
  });

  describe('Happy paths', () => {
    it('should reset the password successfully for an existing user', async () => {
      // Arrange
      const data = { email: 'test@example.com', password: 'newPassword123' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.hash.mockResolvedValue('hashedPassword');

      // Act
      const result = await resetPassword(data);

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
      expect(mockUser.update).toHaveBeenCalledWith({ password: 'hashedPassword' });
      expect(result).toEqual({
        success: true,
        message: 'Password reset successfully',
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
        },
      });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if the user is not found', async () => {
  
      const data = { email: 'nonexistent@example.com', password: 'newPassword123' };
      User.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(resetPassword(data)).rejects.toThrow('User not found');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
    });

    it('should handle bcrypt hash failure gracefully', async () => {
      // Arrange
      const data = { email: 'test@example.com', password: 'newPassword123' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.hash.mockRejectedValue(new Error('Hashing failed'));

      // Act & Assert
      await expect(resetPassword(data)).rejects.toThrow('Hashing failed');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: data.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
    });
  });
});