module.exports = function(grunt) {
    grunt.registerTask('default', 'Run code quality tools. Execute tests, optimize', [
        'test',
        'jshint',
        'karma:coverage',
        'jsdoc',
        'metalsmith:default',
        'metrics-size'
    ]);
};