module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      src: 'src',
      dest: 'dist',
      banner: '/*\n <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/'
    },

    jshint: {
      options: {
        esversion: 6,
        reporter: require('jshint-stylish')
      },

      build: ['Grunfile.js', 'src/js/**/*.js']
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>\n',
        sourceMap : true
      },
      dev: {
        files: {'<%= meta.dest %>/js/bundle.js': '<%= meta.src %>/js/**/*.js'},
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          sourceMap : false
        },
      },
      prod: {
        files: {
          '<%= meta.dest %>/js/bundle.min.js': [
            '<%= meta.src %>/js/data.js',
            '<%= meta.src %>/js/globals.js',
            '<%= meta.src %>/js/data-store.class.js',
            '<%= meta.src %>/js/data-store-manager.class.js',
            '<%= meta.src %>/js/gunpla-calculator-ui.class.js',
            '<%= meta.src %>/js/gunpla-calculator.class.js',
            '<%= meta.src %>/js/index.js'
          ]
        }
      }
    },

    less: {
      build: {
        files: {
          '<%= meta.dest %>/css/bundle.css': [
            '<%= meta.src %>/css/gbgw-icons.css',
            '<%= meta.src %>/css/style.css',
            '<%= meta.src %>/css/themes/dark.css'
          ]
        }
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      build: {
        files: {
          '<%= meta.dest %>/css/bundle.min.css': [
            '<%= meta.src %>/css/gbgw-icons.css',
            '<%= meta.src %>/css/style.css',
            '<%= meta.src %>/css/themes/dark.css'
          ]
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: '<%= meta.src %>/data',
          src: '**/*.json',
          flatten: true,
          dest: '<%= meta.dest %>/data',
        },{
          expand: true,
          cwd: '<%= meta.src %>/assets/icons',
          src: '**/*.png',
          flatten: true,
          dest: '<%= meta.dest %>/assets',
        }, {
          expand: true,
          cwd: '<%= meta.src %>/assets/third-party',
          src: [ '**/*.svg', '**/*.jpg' ],
          flatten: true,
          dest: '<%= meta.dest %>/assets',
        }, {
          expand: true,
          cwd: '<%= meta.src %>/css/fonts',
          src: '*',
          flatten: true,
          dest: '<%= meta.dest %>/css/fonts',
        }]
      }
    },

    // In-place minification of copied JSON files.
    'json-minify': {
      build: {
        files: '<%= meta.dest %>/data/**/*.json'
      }
    },

    usebanner: {
      taskName: {
        options: {
          position: 'top',
          banner: '<%= meta.banner %>\n',
          linebreak: true
        },
        files: {
          src: [ '<%= meta.dest %>/css/**/*.css' ]
        }
      }
    }
  });

  /* Register tasks */
  grunt.registerTask('default', ['jshint', 'uglify:prod', 'less', 'cssmin', 'copy', 'json-minify', 'usebanner']);
  grunt.registerTask('dev', ['jshint', 'uglify:dev', 'less', 'cssmin', 'json-minify', 'copy']);
  grunt.registerTask('prod', ['jshint', 'uglify:prod', 'less', 'cssmin', 'copy', 'json-minify', 'usebanner']);

  /* Load plugins */
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-json-minify');
};

