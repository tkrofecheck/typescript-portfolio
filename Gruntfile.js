module.exports = function(grunt) {


    // By default just display a message
    grunt.registerTask('default', ['tasks']);

    // Instead of building all files we prompt the user on which build they want
    grunt.registerTask('tasks', function() {
        grunt.log.subhead('Please choose a grunt build:');
        grunt.log.ok('grunt build		builds everything');
        grunt.log.ok('grunt css		build css');
		grunt.log.ok('grunt js		build js');
		grunt.log.ok('grunt typescript		build typescript');
    });
    // Build all
    grunt.registerTask('build', ['clean', 'copy:html', 'sass', 'copy:fonts', 'ts', 'copy:libjs', 'copy:json', 'minjson', 'cwebp', 'copy:images', 'jshint', 'copy:manifest', 'babel', 'gitinfo', 'usebanner']);
    // Build CSS
    grunt.registerTask('css', ['clean', 'sass']);
    // Build JS
    grunt.registerTask('js', ['clean', 'copy:libjs', 'copy:json', 'jshint']);
	// Build TS
	grunt.registerTask('typescript', ['clean', 'copy:html', 'copy:libjs', 'ts', 'copy:json', 'jshint']);

	require('load-grunt-tasks')(grunt);

    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* repo: <%= pkg.name %>/<%= gitinfo.local.branch.current.name %>@<%= gitinfo.description %> - Package Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM tt") %> - User: <%= gitinfo.local.branch.current.currentUser %> */\n',

		// File Path Setup
        dirSrc: 'src',
        dirBuild: 'build',
        dirDist: 'dist',
        dirDataPath: 'data',
        dirJsPath: 'scripts',
        dirCssPath: 'css',
        dirFontPath: 'fonts',
        dirImgPath: 'images',
        // Build Tasks
        clean: {
            all: ['dist', 'build']
        },
        sass: {
            build: {
                options: {
					style: 'expanded',
					sourcemap: 'none'
                },
                files: {
                    '<%= dirBuild %>/<%= dirCssPath %>/app.css' : '<%= dirSrc %>/scss/app.scss'
                }
			},
			dist: {
                options: {
					style: 'compressed',
					sourcemap: 'none'
                },
                files: {
                    '<%= dirDist %>/<%= dirCssPath %>/app.css' : '<%= dirSrc %>/scss/app.scss'
                }
            }
        },
		cwebp: {
			dynamic: {
				options: {
					sameExt: true
				},
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= dirBuild %>/images'
				}]
			}
		},
        copy: {
            'manifest': {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'manifest.json',
                    dest: '<%= dirBuild %>/'
                }, {
                    expand: true,
                    cwd: './',
                    src: 'manifest.json',
                    dest: '<%= dirDist %>/'
                }]
			},
            html: {
                files: [{
                    src: '*.html',
                    dest: '<%= dirBuild %>/'
                }, {
                    src: '*.html',
                    dest: '<%= dirDist %>/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= dirSrc %>/<%= dirFontPath %>/',
                    src: '**',
                    dest: '<%= dirBuild %>/<%= dirFontPath %>/'
                }, {
                    expand: true,
                    cwd: '<%= dirSrc %>/<%= dirFontPath %>/',
                    src: '**',
                    dest: '<%= dirDist %>/<%= dirFontPath %>/'
                }]
            },
            libjs: {
                files: [{
                    expand: true,
                    cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib/',
                    src: '**',
                    dest: '<%= dirBuild %>/<%= dirJsPath %>/',
                }, {
                    expand: true,
                    cwd: '<%= dirSrc %>/<%= dirJsPath %>/lib/',
                    src: '**',
                    dest: '<%= dirDist %>/<%= dirJsPath %>/',
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= dirBuild %>/<%= dirImgPath %>/',
                    src: '**',
                    dest: '<%= dirDist %>/<%= dirImgPath %>/',
                }, {
                    expand: true,
                    cwd: '<%= dirBuild %>/<%= dirImgPath %>/portfolio/',
                    src: '**/*',
                    dest: '<%= dirDist %>/<%= dirImgPath %>/portfolio/'
                }]
            },
            json: {
                expand: true,
                cwd: '<%= dirSrc %>/<%= dirDataPath %>/',
                src: '**',
                dest: '<%= dirBuild %>/<%= dirDataPath %>/'
            }
        },
        jshint: {
            options: {
				esversion: 6,
				reporterOutput: "",
				validthis: true
            },
            all: [
                'Gruntfile.js',
                '<%= dirSrc %>/<%= dirJsPath %>/*.js',
                '<%= dirSrc %>/<%= dirJsPath %>/app/*.js'
            ]
        },
        minjson: {
            compile: {
                files: {
                    '<%= dirDist %>/data/about.json':'<%= dirBuild %>/data/about.json',
                    '<%= dirDist %>/data/nav.json':'<%= dirBuild %>/data/nav.json',
                    '<%= dirDist %>/data/portfolio.json':'<%= dirBuild %>/data/portfolio.json',
                    '<%= dirDist %>/data/resume.json':'<%= dirBuild %>/data/resume.json'
                }
            }
		},
		ts: {
			default: {
				tsconfig: {
					// specifying tsconfig as a string will use the specified `tsconfig.json` file.
					tsconfig: './tsconfig.json'
				}
			}
		},
        watch: {
            options: {
                livereload: true
            },
            dist: {
                files: [
                    '<%= dirSrc %>/data/*.json',
                    '<%= dirSrc %>/scss/*.scss',
                    '<%= dirSrc %>/<%= dirJsPath %>/*.js',
                    '<%= dirSrc %>/<%= dirJsPath %>/app/*.js'
                ],
                tasks: ['build'],
                options: {
                    spawn: false
                },
            }
		},
		gitinfo: {
			commands: {
				'description': ['describe', '--tags', '--always', '--long', '--dirty']
			}
		},
		usebanner: {
			all: {
				options: {
					banner: '<%= banner %>',
					linebreak: false
				},
				files: {
					src: [
						'build/css/app.css',
						'build/scripts/app.js',
						'dist/css/app.css',
						'dist/scripts/app.js'
					]
				}
			}
		},
		babel: {
			options: {
				comments: true,
				compact: 'auto',
				minified: true,
				sourceMap: true,
				presets: ['env']
			},
			dist: {
				files: {
					'<%= dirDist %>/<%= dirJsPath %>/app.js': '<%= dirBuild %>/<%= dirJsPath %>/app.js'
				}
			}
		}
    });

};