# Gilded Rose

This is the Gilded Rose kata in TypeScript.




# Steps Undertaken
### Created Unit Tests for the Existing Code<br>
Before making any changes, I wrote unit tests for the existing code to ensure that the current functionality was correctly covered and that I could detect any unintended side effects during the refactoring process.

### Refactored the Gilded Rose Code<br>
I refactored the code to improve readability, maintainability, and scalability. This involved breaking down complex logic into simpler, more modular components while ensuring that the unit tests continued to pass without any failures.

### Enhanced the Gilded Rose Code According to Requirements<br>
After refactoring, I updated the code to meet the additional requirements. 

## Getting started
Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

There are two unit test frameworks to choose from, Jest and Mocha.

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

Mocha

```sh
npm run test:mocha
```


## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python


