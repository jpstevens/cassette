
(function () {

    'use strict';

    var path = require('path');

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
            jslint: {
                browser: {
                    src: ['src/scripts/**/*.js'],
                    directives: {
                        browser: true,
                        predef: ['console', 'angular']
                    }
                },
                node: {
                    src: ['*.js', 'test/**/*.js', '.grunt/*.js'],
                    directives: {
                        node: true,
                        browser: false,
                        nomen: true
                    }
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
                    runnerPort: 9999,
                    singleRun: true,
                    browsers: ['PhantomJS']
                }
            },
            watch: {
                options: {
                    livereload: true
                },
                js: {
                    files: ['src/scripts/**/*.js'],
                    tasks: ['build:js', 'test:js']
                },
                css: {
                    files: ['src/styles/**/*.{scss,sass,css}'],
                    tasks: ['build:css', 'test:css']
                },
                img: {
                    files: ['src/images/**/*'],
                    tasks: ['build:img']
                },
                fonts: {
                    files: ['fonts/**/*.{eot,svg,ttf,woff,otf}'],
                    tasks: ['build:fonts']
                },
                server: {
                    files: ['package.json', 'bower.json', '.grunt/*'],
                    tasks: ['copy:server', 'wiredep:server']
                }
            },
            express: {
                options: {
                    server: path.resolve(__dirname, '.tmp', 'server.js'),
                    hostname: 'localhost',
                    bases: ['dist', 'bower_components']
                },
                dev: {
                    options: {
                        port: (process.env.PORT || 9101),
                        livereload: true
                    }
                },
                test: {
                    options: {
                        port: (process.env.PORT || 9199),
                        livereload: false
                    }
                }
            },
            open: {
                dev: {
                    path: 'http://localhost:<%= express.dev.options.port%>'
                }
            },
            concat: {
                js: {
                    src: ['src/scripts/**.js', 'src/scripts/**/*.js'],
                    dest: 'dist/<%= pkg.name %>.js',
                    options: {
                        separator: ';'
                    }
                },
                css: {
                    src: ['.tmp/*.css', '.tmp/**/*.css'],
                    dest: 'dist/<%= pkg.name %>.css'
                }
            },
            uglify: {
                js: {
                    files: [{
                        src: 'dist/<%= pkg.name %>.js',
                        dest: 'dist/<%= pkg.name %>.min.js'
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
                img: {
                    files: [{
                        expand: true,
                        flatten: false,
                        cwd: 'src/',
                        src: ['images/**/*'],
                        dest: 'dist',
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
                server: {
                    files: [{
                        expand: true,
                        flatten: false,
                        cwd: '.grunt/',
                        src: ['*'],
                        dest: '.tmp/',
                        filter: 'isFile'
                    }]
                }
            },
            wiredep: {
                server: {
                    src: ['.tmp/**/*.html'],
                    ignorePath: './bower_components'
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
            },
            exec: {
                webdriver: {
                    cmd: function () {
                        if (process.env.TRAVIS) {
                            return "echo '> Skipping grunt exec:webdriver'";
                        } else {
                            return "node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update";
                        }
                    }
                }
            }
        });

        // dependencies
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        // postinstall
        grunt.registerTask('postinstall', 'exec:webdriver');

        // server
        grunt.registerTask('server:test', ['build', 'copy:server', 'wiredep:server', 'express:test']);
        grunt.registerTask('server:dev', ['build', 'copy:server', 'wiredep:server', 'express:dev', 'open:dev', 'watch']);
        grunt.registerTask('server', ['server:dev']);

        // build
        grunt.registerTask('build:fonts', ['copy:fonts']);
        grunt.registerTask('build:img', ['copy:img', 'imagemin']);
        grunt.registerTask('build:css', ['copy:css', 'sass', 'concat:css', 'cssmin', 'clean:tmp']);
        grunt.registerTask('build:js', ['jslint', 'concat:js', 'uglify']);
        grunt.registerTask('build', ['clean', 'build:js', 'build:css', 'build:img', 'build:fonts']);

        // test
        grunt.registerTask('test:css', []);
        grunt.registerTask('test:js:e2e', ['server:test', 'protractor']);
        grunt.registerTask('test:js:unit', ['karma']);
        grunt.registerTask('test:js', ['test:js:unit', 'test:js:e2e']);
        grunt.registerTask('test', ['test:js', 'test:css']);

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
}());
