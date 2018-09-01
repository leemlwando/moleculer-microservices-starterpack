const ApiService = require("moleculer-web");
const router = require('../../api');
module.exports = {
    mixins: [ApiService],

    settings: {
        
        middleware: true,
        use: [
            //express middleware
            router
        ],
    }
}