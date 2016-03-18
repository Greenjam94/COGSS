module.exports = function (grunt) {
    'use strict';

    // Auto load tasks for each grunt-* package
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            public: {
                src: 'public'
            }
        },

        concat: {
            project: {
                options: {

                },
                src: 'source/controllers/*.js',
                dest: 'public/js/app.js'
            },
            libraries: {
                src: [
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-route/angular-route.min.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js'],
                dest: 'public/js/libraries.js'
            },
            styles: {
                src:'node_modules/bootstrap/dist/css/bootstrap.min.css',
                dest:'public/css/styles.css'
            }
        },

        less: {
            project: {
                files: [
                    {
                        'public/css/app.css' : 'source/app.less'
                    }
                ]
            }
        },

        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['source/views/*'],
                        dest: 'public/'
                    }
                ]
            },
            font: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/bootstrap/dist/fonts/*'],
                        dest: 'public/fonts/'
                    }
                ]
            }
        },

        uglify: {
            app: {
                files: {
                    'public/js/app.min.js' : 'public/js/app.js'
                }
            }
        },

        watch: {

            // Util - If Gruntfile.js changes -  reload watch (which will also prune and install new packages)
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },

            // If package.json changes nsfs install and reload watch
            packageFiles: {
                files: ['package.json'],
                tasks: ['packageWarning'],
                options: {
                    reload: true
                }
            },

            projectLess: {
                options: {
                    cwd: ""
                },
                files: [
                    'app.less'
                ],
                tasks: ['less:project']
            }
        }
    });

    // Tasks
    grunt.registerTask('default', ['clean', 'less', 'watch']);

    grunt.registerTask('build', [
        'clean:public',
        'concat',
        'copy',
        'less',
        'uglify:app'
    ]);

    // Warning task to let people know if the package.json file has changed
    grunt.task.registerTask('packageWarning', 'A console warning that the package.json file has changed', function () {
        console.log('Warning: Your package.json file has changed.'.red);
        console.log('\t You may want to stop watching and run "npm install" and "npm prune".'.red);
    });
};
