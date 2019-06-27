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

## Storyboook

We are using [Storybook](https://storybook.js.org/) as a component documentation tool. If you want to see how to use our UI components:

```
  yarn start:storybook
```

This command will start our documentation page after waiting 10 seconds.

[Storybook Showcase](http://components.ucurtmaprojesi.com.s3-website.eu-west-2.amazonaws.com)
[Non-production Environment](http://non-prod.ucurtmaprojesi.com.s3-website.eu-west-2.amazonaws.com)
