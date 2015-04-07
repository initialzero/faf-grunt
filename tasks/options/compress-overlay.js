module.exports = {
    options: {
        //TODO: this one property to generate 'overlay'
        groupId : 'com.jaspersoft',
        version : '<%= pkg.overlayVersion ? pkg.overlayVersion : pkg.version %>',
        archive: '<%= overlay %>/<%= pkg.name %>-<%= compress.overlay.options.version %>.zip'
    },
    files: [
        {
            expand: true,
            cwd: 'build/overlay',
            src: ['**/*']
        }
    ]
};