var fs = require("fs");

module.exports = function(grunt) {
    grunt.registerTask('metrics-size', 'Collect size of source files', function () {

        var conf = grunt.config(),
            module = conf.pkg.name,
            dir = conf.requirejs.optimize.options.dir,
            files = [],
            metricsPath = "build/metrics/size.json";

         if ("visualize-js" === module) {
            var visFile = "build/visualize.js";
            if (fs.existsSync(visFile)) {
                files.push({
                    name: "visualize.js",
                    size: fs.statSync(visFile).size
                });
            } else {
                grunt.log.error("Failed to get file size: visualize.js");
            }

            grunt.file.write(metricsPath, JSON.stringify(files, null, " "));

        } else if (["jrs-ui", "jrs-ui-pro"].indexOf(module) !== -1) {

            var requireConfigFile = grunt.file.read('src/require.config.js'),
                paths = (new Function("requirejs", "return " + requireConfigFile))({
                    config: function(opts) {
                        return opts.paths;
                    }
                }),
                buildFile = grunt.file.read('src/build.js'),
                buildModules = (new Function("return " + buildFile))().modules,
                overlayName = conf.overlay + "/" + module + "-" + conf.pkg.overlayVersion + ".zip";

            if (fs.existsSync(overlayName)) {
                files.push({
                    name: "overlay",
                    size: fs.statSync(overlayName).size
                });
            } else {
                grunt.log.error("Failed to get file size: " + overlayName);
            }

            buildModules.forEach(function(file) {
                var size;
                var fname = file.name + ".js";
                if (fs.existsSync(dir + fname)) {
                    size = tryLoadFile(dir + fname);
                } else {
                    size = tryLoadFile(normalize(dir, fname, paths));
                }

                if (!size) {
                    grunt.log.error("Failed to get file size: " + fname);
                } else {
                    files.push({
                        name: fname,
                        size: size
                    });
                }
            });
            grunt.file.write(metricsPath, JSON.stringify(files, null, " "));
        }
    });
};

function normalize(dir, file, paths) {
    var res;

    for (var i in paths) {
        if (!paths.hasOwnProperty(i)) {
            continue;
        }

        if (file.search(i) === 0) {
            res = file.replace(i, paths[i]);
            if (fs.existsSync(dir + res)) {
                return dir + res;
            }
        }
    }
}

function tryLoadFile(path) {
    if (fs.existsSync(path)) {
        return fs.statSync(path).size;
    } else {
        return false;
    }
}