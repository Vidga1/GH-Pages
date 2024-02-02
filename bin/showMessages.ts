#!/usr/bin/env node

import { green, red } from 'colorette';

export const showSuccessMessage = (message: string) => {
  console.log(green(message));
};

export const showWarningMessage = (message: string) => {
  console.log(red(message));
};
