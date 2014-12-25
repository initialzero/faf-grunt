var fs = require("fs");

module.exports = function(grunt) {
    grunt.registerTask('metrics-size', 'Collect size of source files', function () {

        var conf = grunt.config(),
            module = conf.pkg.name,
            buildOptions = conf.requirejs.optimize.options,
            overlayName = conf.overlay + "/" + module + "-" + conf.pkg.overlayVersion + ".zip",
            files = [];

        if (["jrs-ui", "jrs-ui-pro"].indexOf(module) !== -1) {

            files.push({
                name: "snapshot",
                size: fs.statSync(overlayName).size
            });

            buildOptions.modules.forEach(function(file) {
                files.push({
                    name: file.name,
                    size: fs.statSync(buildOptions.dir + "/" + file.name + ".js").size
                });
            });

            if ("jrs-ui-pro" === module) {
                files.push({
                    name: "visualize",
                    size: fs.statSync("build/optimized/bower_components/visualize-js/build/visualize.js").size
                });
            }

            grunt.file.write("build/metrics/size.json", JSON.stringify(files));

        }
    });
};

