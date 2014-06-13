module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      tmp: ['.tmp'],
      dist: ['dist/<%= pkg.name %>.*']
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
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          angular: true,
          console: true,
          module: true,
          exports: true
        }
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['build:js', 'test:js']
      },
      scss: {
        files: ['src/styles/**/*.scss'],
        tasks: ['build:css']
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bump');

  // server
  grunt.registerTask('server:dev', ['connect:dev']);

  // build
  grunt.registerTask('build:css', ['copy:css', 'sass', 'concat:css', 'cssmin', 'clean:tmp']);
  grunt.registerTask('build:js', ['jshint', 'concat:js', 'uglify']);
  grunt.registerTask('build', ['clean', 'build:js', 'build:css']);
  
  // test
  grunt.registerTask('test:js', ['mochaTest']);
  grunt.registerTask('test', ['test:js']);
  
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
