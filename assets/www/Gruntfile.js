module.exports = function (grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            main: {
                src: [
                    'dist/leaflet.js',

                ],
                dest: 'build/scripts.js'
            }
        },

        // Сжимаем
        uglify: {
            options: {
                //  sourceMap: true
            },
            main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2

                },
                files: {
                    "build/index.css": [
                        "css/index.less"

                    ]
                }
            }
        },
        watch: {
            styles: {
                files: [
                    'css/index.less'
                ],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-concat');//
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-less');//
    grunt.loadNpmTasks('grunt-contrib-watch');//
    grunt.loadNpmTasks('grunt-yui-compressor');

    // Задача по умолчанию
    grunt.registerTask('default', ['less', 'watch']);

};