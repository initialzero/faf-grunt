module.exports = {
    files: {
        src: [
            "test/**/*.js"
        ]
    },
    options: {
        "ignores": [
            "test/karma-coverage/**"
        ],
        "predef": [
            "define",
            "expect",
            "describe",
            "xdescribe",
            "it",
            "xit",
            "sinon",
            "beforeEach",
            "afterEach",
            "jasmine",
            "setTemplates",
            "setFixtures"
        ]
    }
};