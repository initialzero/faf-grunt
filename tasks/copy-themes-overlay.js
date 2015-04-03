module.exports = function(grunt) {
    var themesDir = "build/overlay/themes",
        moduleDir = "src/bower_components/",
        modules = [
            "js-sdk",
            "bi-control",
            "bi-repository",
            "bi-report",
            "bi-dashboard"
        ];

    function copyModuleThemes(path, module) {
        grunt.file.recurse(path, function(abspath, rootdir, subdir, filename) {

            if (typeof subdir === "undefined") {
                // copy files from <module>/themes/*.* to overlay/themes/
                grunt.file.copy(abspath, themesDir + "/" + filename);
            } else {
                // copy files from <module>/themes/<theme> to overlay/themes/<theme>/<module>
                if (module !== "jrs-ui" && module !== "jrs-ui-pro") {
                    subdir = subdir.split("/");
                    subdir.splice(1, 0, module);
                    subdir = subdir.join("/");
                }

                grunt.file.copy(abspath, [themesDir, subdir, filename].join("/"));
            }
        });
    }

    grunt.registerTask('copy-themes-overlay', 'Copy themes from modules to overlay', function(){

        modules.forEach(function(module) {
            var path = moduleDir + module + "/themes";
            if (grunt.file.isDir(path)) {
                copyModuleThemes(moduleDir + module + "/themes", module);
            }
        });
        copyModuleThemes("themes", "jrs-ui");
        grunt.config().pkg.name === "jrs-ui-pro" && copyModuleThemes("themes", "jrs-ui-pro");
    });
};
