"use strict";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_API_KEY);

module.exports = {
	name: "ping",

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

            ping(ctx){
                return this.broker.ping(['node-email','node-user'])
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