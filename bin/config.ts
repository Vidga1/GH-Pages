#!/usr/bin/env node

import { blue, green, yellow } from 'colorette';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { OptionValues } from 'commander';
import {
  validateInput,
  transformInputValue,
  updateSettings,
} from './dataProcessing';
import { defaultSettings, userQueries } from './constants';
import { showSuccessMessage, showWarningMessage } from './showMessages';
import { publish } from './publish';

export const config = async () => {
  try {
    let options: OptionValues = { ...defaultSettings };

    const rl = readline.createInterface({ input, output });

    const menu = userQueries.reduce(
      (acc, query, index) =>
        `${acc}${blue(`(${index + 1})`)} ${yellow(
          `(${query.option.toUpperCase()})`,
        )} ${green(query.title)} ${yellow(`(default: ${query.default})`)}\n`,
      '',
    );

    console.log(`${green('\nConfiguration Menu:\n\n')}${menu}`);

    let menuItem: string = '';
    let configurationComplete = false;
    let resStart = '';

    do {
      if (resStart !== 'y' && resStart !== 'n') {
        resStart = await rl.question(
          'Would you like to adjust settings? (y/n) ',
        );
      }

      if (resStart === 'n') {
        break;
      } else if (resStart === 'y') {
        menuItem = await rl.question('\nSelect the configuration item: ');

        const index = Number(menuItem) - 1;

        if (!Number.isNaN(index) && index >= 0 && index < userQueries.length) {
          let validationPassed = false;

          do {
            const inputResult = await rl.question(
              `${userQueries[index].query} `,
            );

            validationPassed = validateInput(inputResult, index);

            if (validationPassed) {
              const adjustedValue = transformInputValue(inputResult, index);

              options = updateSettings(adjustedValue, index, options);

              showSuccessMessage('\nYour input has been saved successfully.');

              let continueResponse = '';
              do {
                continueResponse = await rl.question(
                  'Continue adjusting settings? (y/n): ',
                );
              } while (continueResponse !== 'y' && continueResponse !== 'n');

              if (continueResponse === 'n') {
                configurationComplete = true;
              }
            } else {
              showWarningMessage(
                'The input does not match the expected format. Please try again.',
              );
            }
          } while (!validationPassed && !configurationComplete);
        } else {
          showWarningMessage(
            'Invalid configuration item selected. Please try again.',
          );
        }
      }
    } while (!configurationComplete);

    rl.close();

    publish(options);
  } catch (error) {
    console.error((error as Error).message);
  }
};
