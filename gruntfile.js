module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/css/main.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/main.css': 'src/css/main.scss'
                }
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
};