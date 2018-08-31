"use strict";

module.exports = {
	name: "audio",

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		register() {
			return "user registred";
		},

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		login: {
			params: {
				name: "string"
			},
			handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};