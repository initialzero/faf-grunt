var fs = require('fs'),
    exec = require('child_process').exec,
    install = function (opts, cb) {

        var args = ['install:install-file'],
            opts = opts ? opts : {},
            result;

        args = Object.keys(opts).reduce(function (memo, argName) {
            var argVal = opts[argName],
            newArg = '-D{name}={val}'
                .replace('{name}', argName)
                .replace('{val}', argVal);

            memo.push(newArg);
            return memo;
        }, args);

        return exec('mvn ' + args.join(' '), cb);
    };


module.exports = function (grunt) {

    grunt.registerTask('publish-artifact-locally', 'Publish prepared artifact to local maven repository', function () {

        var process = grunt.config.process,
        artifact = process(
            grunt.config
                .get('compress')
                .overlay
                .options
                .archive
        ),
        error = grunt.log.error,
        done = this.async();

        if (!fs.existsSync(artifact)) {
            grunt.fail.warn('Can\'t find artifact in ' + artifact);
            done(false);
        } else {

            var options = {
                file: artifact,
                groupId: process(
                    '<%= compress.overlay.options.groupId %>'
                ),
                artifactId: process('<%= pkg.name %>'),
                version: process(
                    '<%= compress.overlay.options.version %>'
                ),
                packaging: "zip",
                generatePom: "true"
            };

            install(options, function (err, stdout) {

                var fail = function () {
                    done(false);
                };

                if (err) {
                    grunt.fail.warn('Can\'t execute \'mvn\'.');
                    fail();
                } else {
                    var output = stdout ? stdout.toString() : '';

                    grunt.log.write(output);

                    if (output.indexOf('BUILD FAILED') !== -1) {
                        grunt.fail.warn(
                            'Can\'t install local maven artifact.'
                        );
                        fail();
                    }
                }
                done();
            });

        }

    });
};