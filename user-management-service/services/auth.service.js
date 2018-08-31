"use strict";
//import local libraries
const {auth} = require('../lib');
const {DbStart,models} = require('../config/db');
const DbService = require("moleculer-db");
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

module.exports = {
	name: "auth",
	mixins: [DbService],
	adapter:DbStart(),
	model:models.User,

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
		 * register user
		 *
		 * @returns
		 */
		register(ctx) {
			
			return Promise.resolve(ctx)
					.then(ctx=>{
						return this.adapter.model.findOne({email:ctx.params.email}).then(user=>{return !user ? this.adapter.insert(ctx.params) : false;})
						
					})
						.then(user=>{
						if(user===false){
							return {status:304,success:false,user:false,msg:"user already exists with that email"};
						}
						const token = jwt.sign({email:user.email},process.env.CONFIRMATION_TOKEN_SECRET,{expiresIn:'60s'});
						return {token,user};
						}).then(token=>{
							if(token.user ===false){
								return token;
							}
							this.broker.call('email.sendconfirmation',{token:token.token,email:token.user.email},{nodeID:'node-email'})
							token.user.password = null;
							return {user:token.user, success:true};
						}).catch(err=>{
							console.log(err)
							return {status:500,sucess:false,user:false,msg:"could register user",err:err};
						});
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
		},

		/**
		 * 
		 * confirm user email
		 * @returns boolean
		 */

		confirmuser(ctx){
				
			return Promise.resolve(ctx)
					.then(ctx=>{return  jwt.verify(ctx.params.token,process.env.CONFIRMATION_TOKEN_SECRET);})
						.then(token=>{
							return Promise.resolve(this.adapter.model.findOne({email:token.email}))
								.then(user=>{
									if(!user){
										return null;
									}
									return {confirmed:user.confirmedToken(token),user};
								})
									.catch(err=>{return err;});
						})
						.then(res=>{
							if(!res){
								return null;
							}
							// console.log('dddd',res)
							if(res.user.confirmedMember===true){
							const {firstName,lastName,email,otherNames,id,confirmedMember} = res.user;
								return {status:304,firstName,lastName,email,otherNames,id,confirmedMember,msg:"email already verified"};
							}
								if(res.confirmed === false){
									return {confirmedToken:false,msg:"not a valid token"};
								}
								// console.log(res.user)
								
							let y = this.adapter.model.findOneAndUpdate({email:res.user.email},{$set:{confirmedMember:true}});

							let user = Promise.resolve(y).then(x=>{return x;});

							res.confirmedMember = true;
							
							return Promise.resolve(y).then(x=>{return {x,res};});
						}).then(res=>{
							//check if no user is returned
							if(!res){
								return {status:404,msg:"user not found"}
							}

							//check for invalid token
							if(res.confirmedToken === false){
								// console.log(res);
								return res;
							}
							
							
							
							//check if user is verified
							if(res.confirmedMember){
								let {status,firstName,lastName,email,otherNames,id,confirmedMember,msg} = res;
								return {status,firstName,lastName,email,otherNames,id,confirmedMember,msg};
							}
							console.log('here',res);
							let {firstName,lastName,email,otherNames,id,confirmedMember,msg} = res.x;
							return {status:200,firstName,lastName,email,otherNames,id,confirmedMember,msg:"email succesfully verified"};
						})
						.catch(err=>{
							console.log(err);
							switch(err.name){
								case 'JsonWebTokenError':
									return {status:401,confirmedMember:false,msg:"invalid token"};
									break;
								case 'TokenExpiredError':
									return {status:402,confirmedMember:false,msg:"token has expired"};
									break;
								default:
									return {status:500,confirmedMember:false,msg:"oops! its not you, its us"};	

							}
					
						});
			
	
		},
		resendtoken(ctx){

			return Promise.resolve(ctx)
					.then(ctx=>{
						//check if user exists and is not a verified member
						return this.adapter.model.findOne({email:ctx.params.email})
									.then(user=>{
										return {confirmedMember:user ? user.confirmedMember : false, ctx,exists: !user ? false : true };
									})
					})
					.then(res=>{
						// console.log(res)
						if(res.exists === false){
							return {status:404,msg:"user not found"}
						}
						if(res.confirmedMember === true && res.exists === true){
							return {status:304,msg:"cannot resend token, user already verified"};
						}
						const token = jwt.sign({email:ctx.params.email},process.env.CONFIRMATION_TOKEN_SECRET,{expiresIn:'60s'});
						let params = {email:ctx.params.email,token:token};
						return this.broker.call('email.sendconfirmation',params,{nodeID:"node-email"});
					}).then(res=>{return {status:res.status === 304 || res.status ===404 ? res.status : 200 ,msg:"request succesful",res:res.status===304 || res.status ==404 ? res.msg : "email succesfully sent"};})
						.catch(err=>{return {status:500,msg:"its not you, its us"}});
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