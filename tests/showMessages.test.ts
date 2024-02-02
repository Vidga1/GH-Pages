import { green, red } from 'colorette';

import { showSuccessMessage, showWarningMessage } from '../bin/showMessages';

jest.mock('colorette', () => ({
  green: jest.fn((text) => `green(${text})`),
  red: jest.fn((text) => `red(${text})`),
}));

describe('showSuccessMessage', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it('prints message in green', () => {
    const message = 'Success!';
    showSuccessMessage(message);
    expect(green).toHaveBeenCalledWith(message);
    expect(console.log).toHaveBeenCalledWith(`green(${message})`);
  });
});

describe('showWarningMessage', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it('prints message in red', () => {
    const message = 'Warning!';
    showWarningMessage(message);
    expect(red).toHaveBeenCalledWith(message);
    expect(console.log).toHaveBeenCalledWith(`red(${message})`);
  });
});
