module.exports = function(grunt) {

    grunt.registerTask('deploy-themes', 'Deploy themes from all nested modules', function(){

        var pathToServer = grunt.config().jrs;

        if (!pathToServer) {
            return;
        }

        (pathToServer.substr(-1) === "/") || (pathToServer += "/");

        var dest = pathToServer + "themes",
            modulesDir = "src/bower_components/",
            modules = [
                "js-sdk",
                "bi-control",
                "bi-repository",
                "bi-report",
                "bi-dashboard"
            ];

        function copyModuleThemes(path) {
            grunt.file.recurse(path, function(abspath, rootdir, subdir, filename) {
                var targetFile = dest + "/" + (subdir ? subdir + "/" : "") + filename;
                grunt.file.copy(abspath, targetFile);
            });
        }

            var currentModule = grunt.config().pkg.name;

            modules.forEach(function(module) {
                var path = modulesDir + module + "/themes";
                if (grunt.file.isDir(path)) {
                    copyModuleThemes(path);
                }
            });

            if (currentModule === "jrs-ui") {
                copyModuleThemes("themes");
            }
            if (currentModule === "jrs-ui-pro") {
                copyModuleThemes(modulesDir + "jrs-ui/themes");
                copyModuleThemes("themes");
            }

        });
};
