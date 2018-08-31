"use strict";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_API_KEY);

module.exports = {
	name: "email",

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
		sendemail(ctx) {
			const msg = {
				to: ctx.params.to,
				from: ctx.params.from,
				subject: ctx.params.subject,
				text: ctx.params.text,
				html: `<strong>hello from me</strong>`,
			  };
			  console.log(ctx.params.to,ctx.params.from,ctx.params.subject, ctx.params.text )
			 return sgMail.send(msg);
		},

		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		test() {
			return "Hello Moleculer"+process.env.EMAIL_API_KEY;
		},

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
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