##Chatson

Chatson is a live chat analyzer created to give users insight into the emotional state and crowd mentality of Twitch chat streams.

## Team

  - __Product Owner__: Daniel Ramich
  - __Scrum Master__: Terry Capan
  - __Development Team Members__: Andrew Vedady, Ben Janes

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
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


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


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

### Note on history
In development mode the app uses `hashHistory` (e.g /#/home?k=x928123) which
keeps track of your currently location on and the state of the page. It is advised
for production to use `browserHistory` instead of `hashHistory`

To make this change edit `src/index.js`
```
// before change
...
import { Router, Redirect, hashHistory as history } from 'react-router';
...

// after change
...
import { Router, Redirect, browserHistory as history } from 'react-router';
...

```

The use of history push api requires that all your requests point to index.html
since react-router is keeping track of the navigation (e.g this can be done with `.htaccess` file at the web root or with `nginx` configuration)

## Running Tests
```
$ npm test
```
