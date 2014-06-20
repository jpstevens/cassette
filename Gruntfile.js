module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      tmp: ['.tmp'],
      dist: ['dist']
    },
    mochaTest: {
      js: {
        options: {
          reporter: 'spec',
          colors: true
        },
        src: ['tests/**/*-spec.js']
      }
    },
    protractor: {
      options: {
        keepAlive: false,
        noColor: false
      },
      e2e: {
        configFile: "./protractor.conf.js",
        args: {}
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    jslint: {
      src: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['build:js', 'test:js']
      },
      css: {
        files: ['src/styles/**/*.{scss,css,sass}'],
        tasks: ['build:css', 'test:css']
      },
      img: {
        files: ['src/images/**/*'],
        tasks: ['build:img']
      },
      fonts: {
        files: ['src/fonts/**/*'],
        tasks: ['build:fonts']
      }
    },
    concat: {
      js: {
        src: ['src/**.js', 'src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js',
        options: {
          separator: ';',
        }
      },
      css: {
        src: ['.tmp/*.css', '.tmp/**/*.css'],
        dest: 'dist/<%= pkg.name %>.css',
      },
    },
    uglify: {
      js: {
        files: [{
          src: 'dist/<%= pkg.name %>.js',
          dest: 'dist/<%= pkg.name %>.min.js',
        }]
      }
    },
    cssmin: {
      css: {
        banner: '/* Cassette [<% pkg.version %>] */',
        expand: true,
        cwd: 'dist/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/<% pkg.name %>',
        ext: '.min.css'
      }
    },
    copy: {
      css: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['styles/**/*.css'],
          dest: '.tmp/',
          filter: 'isFile'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/',
          src: ['fonts/**/*.{eot,svg,ttf,woff,otf}'],
          dest: 'dist/',
          filter: 'isFile'
        }]
      },
      img: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'src/',
          src: ['images/**/*.*'],
          dest: 'dist',
          filter: 'isFile'
        }]
      }
    },
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: "<%= copy.img.files[0].src %>",
          dest: 'dist/'
        }]
      }
    },
    sass: {
      build: {
        expand: true,
        flatten: true,
        cwd: 'src/',
        src: ['styles/**/*.scss', '!styles/**/_*.scss'],
        dest: '.tmp',
        ext: '.css'
      }
    },
    connect: {
      options: {
        port: 10001,
        hostname: 'localhost'
      },
      dev: {
        options: {
          middleware: function (connect) {
            return [
              connect.static(require('path').resolve('.')),
              connect.static(require('path').resolve('tests/manual'))
            ];
          },
          keepalive: true
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ["*.json"],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }
  });

  // dependencies
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bump');

  // server
  grunt.registerTask('server:dev', ['connect:dev']);
  grunt.registerTask('server', ['server:dev']); // sets default server

  // build
  grunt.registerTask('build:fonts', ['copy:fonts']);
  grunt.registerTask('build:img', ['copy:img', 'imagemin']);
  grunt.registerTask('build:css', ['copy:css', 'sass', 'concat:css', 'cssmin', 'clean:tmp']);
  grunt.registerTask('build:js', ['jshint', 'concat:js', 'uglify']);
<<<<<<< HEAD
  grunt.registerTask('build', ['clean', 'build:js', 'build:css', 'build:fonts', 'build:img']);
=======
  grunt.registerTask('build', ['clean', 'build:js', 'build:css', 'build:img']);
>>>>>>> Added jslint support

  // test
  grunt.registerTask('test:css', []);
  grunt.registerTask('test:js:e2e', ['protractor']);
  grunt.registerTask('test:js:unit', ['karma']);
  // grunt.registerTask('test:js', ['test:js:unit', 'test:js:e2e']);
  grunt.registerTask('test:js', ['test:js:unit']);
<<<<<<< HEAD
  grunt.registerTask('test', ['test:js', 'test:css']);
  
=======
  grunt.registerTask('test', ['test:js']);

>>>>>>> Added jslint support
  // deploy
  grunt.registerTask('deploy:local', ['test', 'build']);
  grunt.registerTask('deploy:patch', ['deploy:local', 'bump:patch']);
  grunt.registerTask('deploy:minor', ['deploy:local', 'bump:minor']);
  grunt.registerTask('deploy:major', ['deploy:local', 'bump:major']);
  grunt.registerTask('deploy:build', ['deploy:local', 'bump:build']);
  grunt.registerTask('deploy', ['deploy:build']);

  // default
  grunt.registerTask('default', ['test', 'build']);
};
