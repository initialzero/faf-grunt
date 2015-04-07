module.exports = function(grunt) {
    grunt.registerTask('install', 'Create artifact and publish to local repository', [
        'jshint',
        'merge-requirejs-configs',
        'test',
        'optimize',
        'overlay',
        'publish-artifact-locally'
    ]);
};