#!/usr/bin/env node

import { OptionValues } from 'commander';
import {
  validateInput,
  transformInputValue,
  updateSettings,
} from './dataProcessing';
import { showWarningMessage } from './showMessages';
import { defaultSettings } from './constants';
import { publish } from './publish';

export const deployAction = (args: OptionValues) => {
  try {
    let settings: OptionValues = { ...defaultSettings, ...args };

    if (settings.user) {
      const userIndex = 1;
      if (validateInput(settings.user as string, userIndex)) {
        const transformedUserValue = transformInputValue(
          settings.user as string,
          userIndex,
        );
        settings = updateSettings(transformedUserValue, userIndex, settings);
      } else {
        showWarningMessage(
          'The user data format is incorrect!\nDeployment has been halted!',
        );
        return;
      }
    }

    publish(settings);
  } catch (error) {
    console.error((error as Error).message);
  }
};
