# Cassette

[![Build Status](https://secure.travis-ci.org/jpstevens/cassette.png?branch=master)](https://travis-ci.org/jpstevens/cassette)

Awesome front-end components, from Funding Circle

## Installation:

Clone the Cassettes repo from Github:

```
git clone https://github.com/jpstevens/cassette
```

Then install the dependencies:

```
npm install 
```

Finally, run the Grunt task to test and build the project:

```
grunt
```

## Scripts:

All javascript files are kept in the ```/src/scripts``` directory. They are linted using JSHint, and uglified into a single file during the build step.

## Styles:

CSS and SASS files are kept in the ```/src/styles``` directory.

SASS files will be compiled during the build process. The entry point for the SASS compile is the ```/src/styles/main.scss``` file.
The CSS in the styles directory, as well as the built SASS files, will be concatenated into a single file during the build step.

## Tests:

Tests are stored in the ```/tests``` directory. 

To run them, use the command:

```
npm test
```

Or, via Grunt:

```
grunt test
```

To test javascript functionality only:

```
grunt test:js
```

Or for CSS functionality only (if applicable):

```
grunt test:css
```