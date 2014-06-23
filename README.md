# Cassette Seed

[![Build Status](https://secure.travis-ci.org/jpstevens/cassette-seed.png?branch=master)](https://travis-ci.org/jpstevens/cassette-seed)
[![Dependency Status](https://gemnasium.com/jpstevens/cassette-seed.svg)](https://gemnasium.com/jpstevens/cassette-seed)

Awesome front-end components, from Funding Circle

## Installation:

Clone the Cassettes repo from Github:

```bash
git clone https://github.com/jpstevens/cassette-seed
```

Then install the dependencies:

```bash
npm install && bower install
```

If you don't have SASS install, run:

```bash
bundle install
```

Finally, run the Grunt task to test and build the project:

```bash
grunt
```

## Preview/Development:

To preview your project, run:

```bash
grunt server
```

This will open up a new browser window, with an auto-generated preview of your project.

The page will auto-update as you make changes to your project.

## Scripts:

All javascript files are kept in the ```/src/scripts``` directory. They are linted using JSHint, and uglified into a single file during the build step.

## Styles:

CSS and SASS files are kept in the ```/src/styles``` directory.

SASS files will be compiled during the build process. The entry point for the SASS compile is the ```/src/styles/main.scss``` file.
The CSS in the styles directory, as well as the built SASS files, will be concatenated into a single file during the build step.

The directory structure for SASS should be as follows:
```
/src
  /styles
    /css
    /functions
    /mixins
    /partials
    /variables
    main.scss
```

## Tests:

Tests are stored in the ```/tests``` directory.

To run them, use the command:

```bash
npm test
```

Or, via Grunt:

```bash
grunt test
```

To test javascript functionality only:

```bash
grunt test:js # all javascript tests
grunt test:js:unit # all javascript unit tests
grunt test:js:e2e # all javascript e2e tests
```

Or for CSS functionality only (if applicable):

```bash
grunt test:css
```

### Javascript Testing Frameworks:

By default, Protractor is used for **e2e testing**.

For **unit testing**, either Jasmine (with Karma) or Mocha can be used. To switch between the two, edit ```test:js:unit``` task in the Gruntfile.js:

```javascript
grunt.registerTask('test:js:unit', ['mochaTest']); // for Mocha
// or...
grunt.registerTask('test:js:unit', ['karma']); // for Jasmine (with Karma)
```

## Deploying:

To release a new version of the package, use the command:

```bash
grunt deploy
```

This will increase your project's version (build) number, tag your latest commit with that version, then push to your project's git repository, as specified with 'origin'.

## TODO:

- implement test:js:e2e so that tests pass on CI
- link Protractor tests to the preview server, so that it runs tests against the local ```server:test```
- inject directives into the preview ```.grunt/index.html``` file, using ```<!-- cassette:directive -->``` or ```<!-- cassette:directive:[name-goes-here] -->```
- put seed project into a YO generator
- implement template cache on build for Angular directives
