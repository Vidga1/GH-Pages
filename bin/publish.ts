#!/usr/bin/env node

import { OptionValues } from 'commander';
import ghpages from 'gh-pages';
import { showSuccessMessage, showWarningMessage } from './showMessages';

export const publish = (options: OptionValues) => {
  ghpages.publish(options.dir, options, (err) => {
    if (err) {
      showWarningMessage('Something has gone wrong!');
      throw err;
    }

    showSuccessMessage('Deployment successfully completed!');
  });
};
