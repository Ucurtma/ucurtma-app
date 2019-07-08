[![CircleCI](https://circleci.com/gh/Ucurtma/ucurtma-app.svg?style=svg)](https://circleci.com/gh/Ucurtma/ucurtma-app)

# Uçurtma

There will be a good description/readme later. But now, this repository is here just for development purposes.

## Bootstrapping the dependencies using Lerna

Lerna helps you run `yarn` scripts for both projects. Bootstrapping is the first step to install the project dependencies. It will basically run the `yarn install` for both projects.

```
  yarn
  yarn bootstrap
```

## Running frontend

There is only front end package for now. If you want to run front-end using lerna,

```
  yarn start:frontend
```

This will kick `yarn start` on front end package. You can go to `localhost:3000` after running command.

## End to end testing

There is a test suite embedded into the project under the [tests](./tests) folder. Test suite is using a 3rd party library called `gherkin-testcafe` which is a nice wrapper around `testcafe` framework that allows us to create BDD style human-readable tests with `Gherkin` format.

In order to run the tests you first need to start the application using

```bash
yarn dev
```

And in order to run the tests locally you can then you can run

```bash
yarn e2e-test:chrome:local
```

This command will set the `BASE_URL` environment variable to `http://localhost:30000`, which is the base url that the tests will run against. Then, run the testcafe using `gherkin-testcafe chrome tests/features/**/*.feature tests/step_definitions/**/*.js` command.

As you might notice the tests will run against `Chrome` browser, meaning that the browser should be installed if you want to run the tests in your environment. If you want to run the tests using different browsers then you might find the [testcafe documentation](https://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browsers/browser-support.html) useful.

## Storybook

We are using [Storybook](https://storybook.js.org/) as a component documentation tool. If you want to see how to use our UI components:

```
  yarn start:storybook
```

This command will start our documentation page after waiting 10 seconds.

[Storybook Showcase](http://components.ucurtmaprojesi.com)

[Non-production Environment](http://non-prod.ucurtmaprojesi.com)

---

Cross-browser testing provided by:

<a href="http://browserstack.com"><img height="70" src="images/browserstack-logo.png" alt="BrowserStack"></a>
