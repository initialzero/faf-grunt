module.exports = function(grunt) {
    var overlayBundlesDir = "build/overlay/WEB-INF/bundles",
        modulesDir = "src/bower_components/",
        modules = [
            "js-sdk",
            "bi-control",
            "bi-chart",
            "bi-repository",
            "bi-report",
            "bi-dashboard"
        ];

    function copyModuleBundles(path) {
        if (grunt.file.isDir(path)) {
            grunt.file.recurse(path, function(abspath, rootdir, subdir, filename) {
                var targetFile = overlayBundlesDir + "/" + (subdir ? subdir + "/" : "") + filename;
                grunt.file.copy(abspath, targetFile);
            });
        }
    }

    grunt.registerTask('copy-bundles-overlay', 'Copy bundles from modules to overlay', function(){
        var currentModule = grunt.config().pkg.name;

        modules.forEach(function(module) {
            var path = modulesDir + module + "/bundles";
            copyModuleBundles(path);
        });

        if (currentModule === "jrs-ui") {
            copyModuleBundles("bundles");
        }
        if (currentModule === "jrs-ui-pro") {
            copyModuleBundles(modulesDir + "jrs-ui/bundles");
            copyModuleBundles("bundles");
        }

    });
};
