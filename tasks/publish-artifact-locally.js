var fs = require('fs'),
	spawn = require('child_process').spawn,
	mvn = function(opts){

		var args = ['install:install-file'],
			opts = opts ? opts : {},
            result;

		args = Object.keys(opts).reduce(function(memo, argName){
			var argVal = opts[argName],
				newArg = '-D{name}={val}'
							.replace('{name}', argName)
							.replace('{val}', argVal);

				memo.push(newArg);
			return memo;
		}, args);

        //TODO: replace with 'exec'
		return spawn('mvn', args);
	};


module.exports = function(grunt) {

    grunt.registerTask('publish-artifact-locally','Publish prepared artifact to local maven repository', function(){

    		var process = grunt.config.process,
    			artifact = process(
					grunt.config
						.get('compress')
						.overlay
						.options
						.archive
    			), install,
    			error = grunt.log.error,		
    			done = this.async();

    		if (!fs.existsSync(artifact)){
    			grunt.fail.warn('Can\'t find artifact in ' + artifact);
    			done(false);
    		}else{
                install = mvn({
                    file : artifact,
                    groupId: process(
                        '<%= compress.overlay.options.groupId %>'
                    ),
                    //TODO: work on that case, it fails 'default' task
                    artifactId: process('<%= pkg.name %>' + "aaa"),
                    version : process(
                        '<%= compress.overlay.options.version %>'
                    ),
                    packaging: "zip"
                });

                install.on('error', function(err){
                    grunt.fail.warn('Can\'t execute \'mvn\'.');
                    done(false);
                });



                install
                    .stdout
                    .on('data', function(data){
                        grunt.log.write(data); 
                        // if (data.indexOf('BUILD FAILED') !== -1){
                        //     grunt.fail.warn(
                        //         'Can\'t install local maven artifact.'
                        //     );
                        //  }
                         done();
                    });

            }

    });
};



//mvn install:install -Dfile=/path/your-artifact-1.0.zip -DgroupId=org.some.group -DartifactId=your-artifact -Dversion=1.0 -Dpackaging=zip" to default grunt sequence to install faf zip locally to ~/.m2 folder