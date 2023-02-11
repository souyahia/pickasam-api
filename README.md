# Overview

This repository is template used to create basic NodeJs projects with typescript.

# Features
## TypeScript
This project uses [TypeScript](https://www.typescriptlang.org/) for source files. The project configuration is available
in the `/tsconfig.json` file (`/tsconfig.build.json` for the build). Compiled JavaScript file are generated in the
`/dist` directory. Type declarations and source map files generation are enabled.

## Logger
A [Bunyan](https://www.npmjs.com/package/bunyan) logger is included in this project. The logger configuration can be
edited in `/src/logger/logger.ts`. Code snipplet to use the logger :

```TypeScript
import { logger } from './logger';

logger.info('Hello World!');
```

## Lint
This project uses an [ESLint](https://eslint.org/) linter, along with [Prettier](https://prettier.io/) to format the
code. The configurations for the linting are based on my own predefined ruleset that I use everywhere. See
[this repository](https://github.com/souyahia/configs) for more info.

To run a lint check, use the following command :
> `npm run lint`

To automatically fix linting errors, run the following command :
> `npm run lint:fix`

## Test
[Jest](https://jestjs.io/) is the testing framework used in this project. The framework is used with the [ts-jest](https://www.npmjs.com/package/ts-jest) to allow the writing and execution of tests in TypeScript without compilation.

Jest will execute every test file located in the `/test` directory and ending with `.test.ts`. The coverage report is generated in the LCOV format, and located in the `/coverage` directory.

To run the tests, use the following command :
> `npm run test`

To run the tests and generate a coverage report, use the following command :
> `npm run test:coverage`
