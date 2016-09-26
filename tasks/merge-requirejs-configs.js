var requireMerge = require('requirejs-config-merge'),
    FAF_MODULES = [
        'js-sdk',
        'bi-report',
        'bi-control',
        "bi-chart",
        'bi-repository',
        'bi-dashboard',
        'bi-adhoc',
        'jrs-ui'
    ];

module.exports = function(grunt) {
    grunt.registerTask('merge-requirejs-configs', 'Merge RequireJS configs', function() {
        var cwd = grunt.config.get("cwd"),
            bowerConfig = grunt.file.readJSON(cwd + '/bower.json'),
            deps = [];

        for (var i = 0; i < FAF_MODULES.length; i++) {
            if (bowerConfig.dependencies[FAF_MODULES[i]]) {
                deps.push(FAF_MODULES[i]);
            }
        }

        grunt.log.writeln("Merging RequireJS configs of following modules: " + deps);

        deps = deps.map(function(module) {
            return "src/bower_components/" + module + "/config.js";
        });

        requireMerge(deps.concat("config.js"), 'src/require.config.js');
    });
};
 
