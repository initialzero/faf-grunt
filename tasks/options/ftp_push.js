module.exports = {
    themes: {
        options: {
            username: "designer",
            password: "designer",
            host: "localhost",
            dest: "/themes",
            port: 2121
        },
        files: [{
            expand: true,
            cwd: 'themes',
            src: [
                "default/theme.css"
            ]
        }]
    }
};