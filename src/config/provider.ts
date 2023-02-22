/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as dotenv from 'dotenv';
import nconf from 'nconf';
import { defaults } from './defaults';

dotenv.config();
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

export function getEnum<T extends string | number | boolean>(
  key: string,
  enumValues: T[] | { [key: string]: T },
): T {
  const values = Array.isArray(enumValues) ? enumValues : Object.values(enumValues);
  const value = getValue(key);
  if (!values.includes(value as T)) {
    throw new Error(
      `Invalid value for configuration option ${key} : possible values are ${JSON.stringify(
        values,
      )}`,
    );
  }
  return value as T;
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
