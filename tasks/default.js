module.exports = function(grunt) {
    grunt.registerTask('default', 'Run code quality tools. Execute tests, optimize', [
        'test',
        'jshint',
        'karma:coverage',
        'jsdoc',
        'metrics-size'
    ]);
};