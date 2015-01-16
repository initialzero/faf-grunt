var glob = require('glob'),
    merge = require("merge");

function extendConfig(config, path, grunt) {
    var getContent = {
        js: require,
        json: grunt.file.readJSON
    };
    try {
        glob.sync('*.js?(on)', {cwd: path}).forEach(function (option) {
            var type = option.split(".").pop(),
                parts = option.replace(/\.json|.js$/, '').split("-"),
                obj = level = {};

            for (var i = 0; i < parts.length; i++) {
                level[parts[i]] = (i + 1) === parts.length ? getContent[type](path + option) : {};
                level = level[parts[i]];
            }

            config = merge.recursive(true, config, obj);
        });
    } catch(ex) {
        grunt.log.writeln("Cannot read grunt config options: " + ex);
    }

    return config;
}

module.exports = function (grunt, options) {
    options = options || {};

    if (!options.cwd) {
        throw new Error("Current working directory is not specified");
    }

    grunt.loadTasks(__dirname + '/tasks');

    try {
        grunt.loadTasks(options.cwd + '/tasks');
    } catch(ex) {
        grunt.log.writeln("Cannot load tasks from working dir: " + ex);
    }

    try {
        var ws = grunt.file.readJSON(options.cwd + '/.workspace'),
            server = ws ? ws.server : null,
            isPro = ws ? (ws.isPro !== false) : false,
            localSrc = ws ? ws['working-copy'] : null;
    } catch (e) {
        grunt.log.writeln('No \'.workspace\' was found.');
    }

    var config = {
        pkg: grunt.file.readJSON(options.cwd + '/package.json'),
        jrs: server,
        svn: localSrc,
        cwd: options.cwd,
        isPro: isPro,
        overlay: 'build/maven/com/jaspersoft/<%= pkg.name %>/<%= pkg.overlayVersion %>'
    };

    config = extendConfig(config, __dirname + '/tasks/options/', grunt);
    config = extendConfig(config, options.cwd + '/tasks/options/', grunt);

    grunt.initConfig(config);
};