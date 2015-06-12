module.exports = function(grunt) {
    var overlayThemesDir = "build/overlay/themes",
        moduleDir = "src/bower_components/",
        modules = [
            "js-sdk",
            "bi-control",
            "bi-repository",
            "bi-report",
            "bi-dashboard"
        ];

    function copyModuleThemes(path) {
        grunt.file.recurse(path, function(abspath, rootdir, subdir, filename) {
            grunt.file.copy(abspath, overlayThemesDir + "/" + (subdir ? subdir + "/" : "") + filename);
        });
    }

    grunt.registerTask('copy-themes-overlay', 'Copy themes from modules to overlay', function(){
        var currentModule = grunt.config().pkg.name;

        modules.forEach(function(module) {
            var path = moduleDir + module + "/themes";
            if (grunt.file.isDir(path)) {
                copyModuleThemes(path);
            }
        });

        if (currentModule === "jrs-ui") {
            copyModuleThemes("themes");
        }
        if (currentModule === "jrs-ui-pro") {
            copyModuleThemes(moduleDir + "jrs-ui/themes");
            copyModuleThemes("themes");
        }

    });
};
