module.exports = function(grunt) {
    var overlayThemesDir = "build/overlay/themes",
        modulesDir = "src/bower_components/",
        modules = [
            "js-sdk",
            "bi-control",
            "bi-chart",
            "bi-repository",
            "bi-report",
            "bi-dashboard"
        ];

    function copyModuleThemes(path) {
        grunt.file.recurse(path, function(abspath, rootdir, subdir, filename) {
            var targetFile = overlayThemesDir + "/" + (subdir ? subdir + "/" : "") + filename;
            grunt.file.copy(abspath, targetFile);
        });
    }

    grunt.registerTask('copy-themes-overlay', 'Copy themes from modules to overlay', function(){
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
