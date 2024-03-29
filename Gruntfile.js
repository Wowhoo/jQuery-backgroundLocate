'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // -- Clean Config ---------------------------------------------------------
        clean: {
            files: ['dist']
        },
        // -- copy config ----------------------------------------------------------
        // copy: {
        // jquery_range: {
        //     files: [{
        //             expand: true,
        //             flatten: true,
        //             cwd: 'bower_components/',
        //             src: [
        //                     'jquery-range/dist/*.js',
        //             ],
        //             dest: 'demo/js/',
        //         }
        //     ]
        // },

        // jquery_unitInput: {
        //     files: [{
        //             expand: true,
        //             flatten: true,
        //             cwd: 'bower_components/',
        //             src: [
        //                     'jquery-unitInput/dist/*.js',
        //             ],
        //             dest: 'demo/js/',
        //         }
        //     ]
        // },
        // },
        // -- Concat Config --------------------------------------------------------
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
        },
        // -- uglify Config --------------------------------------------------------
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            },
        },
        // -- jshint Config --------------------------------------------------------
        jshint: {
            // gruntfile: {
            //     options: {
            //         jshintrc: '.jshintrc'
            //     },
            //     src: 'Gruntfile.js'
            // },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            },
        },
        // -- watch Config ---------------------------------------------------------
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
        },
        // -- jsbeautifier Config --------------------------------------------------
        jsbeautifier: {
            files: ['Gruntfile.js', "src/**/*.js", "less/*.less"],
            options: {
                "indent_size": 4,
                "indent_char": " ",
                "indent_level": 0,
                "indent_with_tabs": true,
                "preserve_newlines": true,
                "max_preserve_newlines": 10,
                "jslint_happy": false,
                "brace_style": "collapse",
                "keep_array_indentation": false,
                "keep_function_indentation": false,
                "space_before_conditional": true,
                "eval_code": false,
                "indent_case": false,
                "unescape_strings": false
            },
        },
        // -- replace Config --------------------------------------------------------
        // replace: {
        //     bower: {
        //         src: ['bower.json'],
        //         overwrite: true, // overwrite matched source files
        //         replacements: [{
        //             from: /("version": ")([0-9\.]+)(")/g,
        //             to: "$1<%= pkg.version %>$3"
        //         }]
        //     },
        //     jquery: {
        //         src: ['tabs.jquery.json'],
        //         overwrite: true, // overwrite matched source files
        //         replacements: [{
        //             from: /("version": ")([0-9\.]+)(")/g,
        //             to: "$1<%= pkg.version %>$3"
        //         }]
        //     },
        // },
        // -- recess config -------------------------------------------------------
        // recess: {
        //     dist: {
        //         options: {
        //             compile: true
        //         },
        //         files: {
        //             'demo/css/check.css': ['less/jquery.check.less']
        //         }
        //     }
        // },
    });



    // -- Main Tasks ---------------------------------------------------------------
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default task.
    grunt.registerTask('dist', ['concat', 'uglify']);
    grunt.registerTask('css', ['recess']);
    grunt.registerTask('copy', ['copy']);
    grunt.registerTask('js', ['jshint', 'jsbeautifier']);
    grunt.registerTask('version', [
        'replace:bower',
        'replace:jquery'
    ]);

    // Default task.
    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'recess']);

};
