const ApiService = require("moleculer-web");

module.exports = {
    mixins: [ApiService],
    

    settings: {
        
        middleware: true,
        use: [
            //express middleware
        ],
    }
}