"use strict";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_API_KEY);

module.exports = {
	name: "auth",

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
		register(ctx) {
            let user = {
                firstName:ctx.params.firstName,
                lastName:ctx.params.lastName,
                otherNames:ctx.params.otherNames,
                email:ctx.params.email,
                password:ctx.params.password,
                avatar:ctx.params.avatar
            }
			// console.log(ctx.params)
			 return this.broker.call('auth.register',user,{nodeID:"node-user"})
		},


		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		login: {
			params: {
                username: "string",
                password:"string"
			},
			handler(ctx) {
                let user = {
                    username:ctx.params.username,
                    password:ctx.params.password
                }
				return this.broker.call('auth.login',user,{nodeID:'node-user'});
			}
		},
		
		/**
		 * 
		 * @returns 
		 */

		confirmuser(ctx){
			 return this.broker.call('auth.confirmuser',ctx.params,{nodeID:'node-user'})
				 .then(res=>{return res})
				 	.catch(err=>{
						console.log(err);
						return err
						});
		 },

		resendtoken(ctx){
			return this.broker.call('auth.resendtoken',ctx.params,{nodeID:"node-user"})
					.then(res=>{return {status:200,msg:'sucess',res:res}})
						.catch(err=>console.log(err));
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