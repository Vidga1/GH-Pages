import {
  validateInput,
  transformInputValue,
  updateSettings,
} from '../bin/dataProcessing';
import { userQueries, defaultSettings } from '../bin/constants';

describe('dataProcessing', () => {
  describe('validateInput', () => {
    it.each([
      ['dir', 'dist'],
      ['user', 'JohnDoe johndoe@example.com'],
      ['src', 'index.js'],
      ['user', 'invalidemail'],
      ['src', 'invalidformat'],
    ])('validates user input for option %s and value %s', (option, value) => {
      const index = userQueries.findIndex((q) => q.option === option);
      const expected = userQueries[index].pattern.test(value);
      expect(validateInput(value, index)).toBe(expected);
    });
  });

  describe('transformInputValue', () => {
    it('converts the value for user option (index corresponding to user)', () => {
      const index = userQueries.findIndex((q) => q.option === 'user');
      const value = 'JohnDoe johndoe@example.com';
      expect(transformInputValue(value, index)).toEqual({
        name: 'JohnDoe',
        email: 'johndoe@example.com',
      });
    });

    it('converts value to boolean for a boolean-based option (e.g., dotfiles)', () => {
      const index = userQueries.findIndex((q) => q.option === 'dotfiles');
      expect(transformInputValue('y', index)).toBe(true);
      expect(transformInputValue('n', index)).toBe(false);
    });
  });

  describe('updateSettings', () => {
    it('updates the configuration for user option', () => {
      const index = userQueries.findIndex((q) => q.option === 'user');
      const value = { name: 'JohnDoe', email: 'johndoe@example.com' };
      const newConfig = updateSettings(value, index, defaultSettings);
      expect(newConfig).toEqual({
        ...defaultSettings,
        [userQueries[index].option]: value,
      });
    });
  });
});
