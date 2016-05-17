##Chatson

Chatson is a live chat analyzer created to give users insight into the emotional state and crowd mentality of Twitch chat streams.

## Team

  - __Product Owner__: Daniel Ramich
  - __Scrum Master__: Terry Capan
  - __Development Team Members__: Andrew Vedady, Ben Janes

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Installing Dependencies](#installation)
1. [Contributing](#contributing)

## Usage

Open up the app and have a look at the data!

## Requirements

- Node 6.0.0
- React
- Redux
- RethinkDB


## Roadmap

View the project roadmap [here](https://github.com/badT/Chatson/issues)

## Installation
```
$ npm install
```

## Development
```
$ npm start
```
Runs the project in development mode with hot-reloading of `src` folder.
Open your browser at [http://localhost:3000](http://localhost:3000).

## Clean
```
$ npm run clean
```
Using rimraf clean the `dist` folder, which is the target of the `build`

## Build
```
$ npm run build
```
Builds the app into the 'dist' folder for deployment

### Production
```
$ npm run build:production
```
Cleans the `dist` folder, rebuilds the app for deployment and starts the server

## Running Tests
```
$ npm test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
