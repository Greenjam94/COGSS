module.exports = function (grunt) {
    'use strict';

    // Auto load tasks for each grunt-* package
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
        },

        less: {
            project: {
                files: [
                    {
                        expand: true,
                        src: ['dist/app.less'],
                        ext: '.css'
                    }
                ]
            }
        }
    });

    // Tasks
    grunt.registerTask('default', ['less', 'watch']);

    // Warning task to let people know if the package.json file has changed
    grunt.task.registerTask('packageWarning', 'A console warning that the package.json file has changed', function () {
        console.log('Warning: Your package.json file has changed.'.red);
        console.log('\t You may want to stop watching and run "npm install" and "npm prune".'.red);
    });
};
