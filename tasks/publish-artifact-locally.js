var fs = require('fs'),
	spawn = require('child_process').spawn,
	mvn = function(opts){

		var args = ['install:install'],
			opts = opts ? opts : {};

		args = Object.keys(opts).reduce(function(memo, argName){
			var argVal = opts[argName],
				newArg = '-D{name}={val} '
							.replace('{name}', argName)
							.replace('{val}', argVal);

				memo.push(newArg);
			return memo;
		}, args);

		return spawn('mvn', args);
	};


module.exports = function(grunt) {
    grunt.registerTask('publish-artifact-locally','Publish prepared artifact to local maven repository', function(){

    		var artifact = grunt.config.process(
				grunt.config
					.get('compress')
					.overlay
					.options
					.archive
    			),
    			error = grunt.log.error,
    			done = this.async();

    		if (!fs.existsSync(artifact)){
    			grunt.log.error('Can\'t find artifact in ' + artifact);
    			done(false);
    		}	

    		var mvnInstall = mvn({
    			file : artifact,
    			groupId: "org.some.group",
    			artifactId: "your-artifact",
    			version : "0.0.1",
    			packaging: "zip"
    		});

    		// mvnInstall.stderr.on('data', function(){
    			
    		// });

    		mvnInstall.
	    		stdout
		    		.on('data', function(data){
		    			grunt.log.write(data);	
		    		})
		    		.on('end', function(data){
		    			done();
	    			});

		    mvnInstall.on('close', function(code){
  				console.log('child process exited with code ' + code );
  				if (code === 1){
    				done(false);
  				}
			});

    		console.log(artifact);
    		// check if overlay exists
    		// run maven on it
    		//  done or say what's wrong

    		//*imporove overlay to take version from 'version'
    });
};



//mvn install:install -Dfile=/path/your-artifact-1.0.zip -DgroupId=org.some.group -DartifactId=your-artifact -Dversion=1.0 -Dpackaging=zip" to default grunt sequence to install faf zip locally to ~/.m2 folder