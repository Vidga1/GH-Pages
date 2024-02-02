#!/usr/bin/env node

import { OptionValues } from 'commander';
import { userQueries } from './constants';

type TransformValueType =
  | string
  | boolean
  | string[]
  | { name: string; email: string };

export const validateInput = (value: string, index: number): boolean =>
  userQueries[index].pattern.test(value);

export const transformInputValue = (
  value: string,
  index: number,
): TransformValueType => {
  const queryType = userQueries[index];

  if (['dotfiles', 'addFiles', 'enablePush'].includes(queryType.option)) {
    return value.toLowerCase() === 'y';
  }

  if (queryType.option === 'sourcePattern') {
    return value.includes(' ') ? value.split(' ') : value;
  }

  if (queryType.option === 'user') {
    const [name, email] = value.split(' ');
    return { name, email };
  }

  return value;
};

export const updateSettings = (
  value: TransformValueType,
  index: number,
  options: OptionValues,
): OptionValues => {
  const updatedOptions = { ...options };
  const queryOption = userQueries[index].option;

  updatedOptions[queryOption] = value;

  return updatedOptions;
};
