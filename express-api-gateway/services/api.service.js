"use strict";

const ApiGateway = require("moleculer-web");
require('dotenv').config()

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 80,
		cors: {
            // Configures the Access-Control-Allow-Origin CORS header.
            origin: "*",
            // Configures the Access-Control-Allow-Methods CORS header. 
            methods: ["GET","HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
            // Configures the Access-Control-Allow-Headers CORS header.
            allowedHeaders: ["*"],
            // Configures the Access-Control-Expose-Headers CORS header.
            exposedHeaders: [{"cache-control":"none"}],
            // Configures the Access-Control-Allow-Credentials CORS header.
            credentials: false,
            // Configures the Access-Control-Max-Age CORS header.
			maxAge: 3600,
			cacheControl:"none"
        },

		routes: [{
			path: "/api",
			cors: {
                origin: "*",
                methods: ["GET","HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
                credentials: false
            },
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"**"
			]
		}],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		}
	}
};
