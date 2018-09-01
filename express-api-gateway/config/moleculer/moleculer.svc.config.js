const ApiService = require("moleculer-web");
const routes = require('../../api');
module.exports = {
    mixins: [ApiService],
    

    settings: {
        
        middleware: true,
        use: [
            //express middleware
            routes
        ],
    }
}