import * as readline from 'node:readline/promises';
import { config } from '../bin/config';
import * as dataProcessing from '../bin/dataProcessing';
import * as publishModule from '../bin/publish';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest
      .fn()
      .mockResolvedValueOnce('y')
      .mockResolvedValueOnce('1')
      .mockResolvedValueOnce('новое значение')
      .mockResolvedValueOnce('n'),
    close: jest.fn(),
  }),
}));

jest.mock('../bin/publish', () => ({
  publish: jest.fn(),
}));

jest.mock('../bin/dataProcessing', () => ({
  validateInput: jest.fn().mockReturnValue(true),
  transformInputValue: jest.fn().mockImplementation((value) => value),
  updateSettings: jest
    .fn()
    .mockImplementation((value, _, options) => ({ ...options, value })),
}));

describe('config', () => {
  it('processes user input and calls publish with the correct parameters', async () => {
    await config();

    expect(dataProcessing.validateInput).toHaveBeenCalled();
    expect(dataProcessing.transformInputValue).toHaveBeenCalled();
    expect(dataProcessing.updateSettings).toHaveBeenCalled();
    expect(publishModule.publish).toHaveBeenCalledWith(expect.anything());
  });

  it('correctly handles invalid user input', async () => {
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: jest
        .fn()
        .mockResolvedValueOnce('y')
        .mockResolvedValueOnce('1')
        .mockResolvedValueOnce('invalid value')
        .mockResolvedValueOnce('valid value')
        .mockResolvedValueOnce('n'),
      close: jest.fn(),
    });

    (dataProcessing.validateInput as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    await config();

    expect(dataProcessing.validateInput).toHaveBeenCalledTimes(2);
    expect(dataProcessing.updateSettings).toHaveBeenCalledTimes(1);
  });

  it('allows you to continue configuration after saving the parameter', async () => {
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: jest
        .fn()
        .mockResolvedValueOnce('y')
        .mockResolvedValueOnce('1')
        .mockResolvedValueOnce('валидное значение')
        .mockResolvedValueOnce('y')
        .mockResolvedValueOnce('2')
        .mockResolvedValueOnce('другое значение')
        .mockResolvedValueOnce('n'),
      close: jest.fn(),
    });

    (dataProcessing.validateInput as jest.Mock).mockReturnValue(true);

    await config();

    expect(dataProcessing.updateSettings).toHaveBeenCalledTimes(2);
  });

  it('handles user refusal to configure parameters', async () => {
    (readline.createInterface as jest.Mock).mockReturnValueOnce({
      question: jest.fn().mockResolvedValueOnce('n'),
      close: jest.fn(),
    });

    await config();

    expect(dataProcessing.validateInput).not.toHaveBeenCalled();
    expect(dataProcessing.updateSettings).not.toHaveBeenCalled();
    expect(publishModule.publish).toHaveBeenCalledWith(expect.anything());
  });
});
