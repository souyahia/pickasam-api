/* eslint-disable @typescript-eslint/restrict-template-expressions */
import nconf from 'nconf';
import { defaults } from './defaults';

const provider = nconf.env('__').defaults(defaults);

function getValue(key: string): unknown {
  const value = provider.get(key) as unknown;
  if (value === undefined || value === null) {
    throw new Error(`Missing required configuration option : ${key}`);
  }
  return value;
}

export function getString(key: string): string {
  const value = getValue(key);
  if (typeof value !== 'string') {
    throw new Error(`Invalid value for configuration option ${key} : ${value} (expected string)`);
  }
  return value;
}

export function getBoolean(key: string): boolean {
  const value = getValue(key);
  switch (typeof value) {
    case 'boolean':
      return value;
    case 'string':
      return value === 'true';
    default:
      throw new Error(
        `Invalid value for configuration option ${key} : ${value} (expected boolean)`,
      );
  }
}

export function getNumber(key: string): number {
  const value = getValue(key);
  const errorMessage = `Invalid value for configuration option ${key} : ${value} (expected number)`;
  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      if (Number.isNaN(Number(value))) {
        throw new Error(errorMessage);
      }
      return Number(value);
    default:
      throw new Error(errorMessage);
  }
}
