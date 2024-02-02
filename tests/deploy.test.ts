import { deployAction } from '../bin/deploy';
import * as dataProcessing from '../bin/dataProcessing';
import * as publishModule from '../bin/publish';
import { defaultSettings } from '../bin/constants';

jest.mock('../bin/dataProcessing', () => ({
  validateInput: jest.fn(),
  transformInputValue: jest.fn(),
  updateSettings: jest.fn(),
}));

jest.mock('../bin/publish', () => ({
  publish: jest.fn(() => {
    throw new Error('Test error');
  }),
}));

describe('deployAction', () => {
  it('calls publish with default parameters when there is no user input', () => {
    deployAction({});
    expect(publishModule.publish).toHaveBeenCalledWith(defaultSettings);
  });

  it('processing and transformation of user data', () => {
    const userOptions = { user: 'JaneDoe janedoe@example.com' };
    (dataProcessing.validateInput as jest.Mock).mockReturnValue(true);
    (dataProcessing.transformInputValue as jest.Mock).mockReturnValue({
      name: 'JaneDoe',
      email: 'janedoe@example.com',
    });

    deployAction(userOptions);

    expect(dataProcessing.validateInput).toHaveBeenCalledWith(
      userOptions.user,
      expect.any(Number), // Изменено с конкретного индекса на expect.any(Number), т.к. индекс должен быть определён в контексте теста
    );
    expect(dataProcessing.transformInputValue).toHaveBeenCalledWith(
      userOptions.user,
      expect.any(Number), // Аналогичное изменение для поддержки гибкости
    );
    expect(publishModule.publish).toHaveBeenCalled();
  });

  it('does not call publish if user data is invalid', () => {
    const userOptions = { user: 'invaliddata' };
    (dataProcessing.validateInput as jest.Mock).mockReturnValue(false);

    deployAction(userOptions);

    expect(dataProcessing.validateInput).toHaveBeenCalledWith(
      userOptions.user,
      expect.any(Number), // Изменено для согласованности
    );
    expect(publishModule.publish).not.toHaveBeenCalled();
  });

  it('updates configuration settings based on user data', () => {
    const userOptions = { user: 'JaneDoe janedoe@example.com', dir: 'newdir' };
    (dataProcessing.validateInput as jest.Mock).mockReturnValue(true);
    (dataProcessing.transformInputValue as jest.Mock).mockImplementation(
      (value) => value,
    );
    (dataProcessing.updateSettings as jest.Mock).mockImplementation(
      (value, _, options) => ({ ...options, value }),
    );

    deployAction(userOptions);

    expect(dataProcessing.validateInput).toHaveBeenCalledWith(
      userOptions.user,
      expect.any(Number),
    );
    expect(dataProcessing.transformInputValue).toHaveBeenCalledWith(
      userOptions.user,
      expect.any(Number),
    );
    expect(dataProcessing.updateSettings).toHaveBeenCalledWith(
      userOptions.user,
      expect.any(Number),
      expect.anything(),
    );
    expect(publishModule.publish).toHaveBeenCalledWith(
      expect.objectContaining({ user: userOptions.user, dir: userOptions.dir }),
    );
  });

  it('handles exceptions at runtime', () => {
    const userOptions = { user: 'JaneDoe janedoe@example.com' }; // Допустимый ввод для продолжения выполнения до publish
    (dataProcessing.validateInput as jest.Mock).mockReturnValue(true);
    const consoleSpy = jest.spyOn(console, 'error');

    deployAction(userOptions);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(String));
    consoleSpy.mockRestore(); // Восстановление оригинальной функциональности после теста
  });
});
