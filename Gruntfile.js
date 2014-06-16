module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['build/'],
      dist: ['dist/'],
      extraCSS: ['dist/style/elements/', 'dist/style/pages/']
    },

    copy: {
      bower_components: {
        expand: true,
        cwd: 'build/bower_components/',
        src: '**/dist/**/*',
        dest: 'dist/bower_components/'
      },
      css: {
        expand: true,
        cwd: 'build/style/',
        src: '**',
        dest: 'dist/style/'
      },
      images: {
        expand: true,
        cwd: 'build/image/',
        src: '**',
        dest: 'dist/image/'
      },
      cname: {
        src: 'CNAME',
        dest: 'dist/CNAME'
      },
    },

    cssmin: {
      dist: {
        options: {
          // banner: '/* My minified css file */'
          report: 'gzip'
        },
        expand: true,
        cwd: 'build/style/',
        src: '**/*.css',
        dest: 'dist/style/'
        // ext: '.min.css'
      }
    },

    git_deploy: {
      gh_pages: {
        options: {
          url: 'https://github.com/techmill/techmill.github.io',
          message: "Auto deploy pages, see 'source' branch",
          branch: 'master' // Careful with this one!!!
        },
        src: 'dist/'
      },
    },

    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min',    //'gzip' is nice too but slows task performance by 5-10x
        preserveComments: false
      },
      dist: {
        expand: true,
        cwd: 'build/script/',
        src: '**/*.js',
        dest: 'dist/script/'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true
        },
        expand: true,
        cwd: 'build/',
        src: '**/index.html',
        dest: 'dist/'
      }
    },

    wintersmith: {
      production: {
        options: {
          action: 'build',
          config: './config-production.json'
        }
      },
      preview: {
        options: {
          action: 'preview',
          config: './config.json'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-git-deploy');

  grunt.registerTask('default', ['preview']);
  grunt.registerTask('preview', ['wintersmith:preview']);
  grunt.registerTask('build', ['clean:build', 'wintersmith:production']);
  grunt.registerTask('dist', ['uglify:dist', 'htmlmin:dist', 'copy', 'clean:build', 'clean:extraCSS']);
  grunt.registerTask('deploy', ['clean', 'build', 'dist', 'git_deploy:gh_pages']);

};
