import pkg from 'mongoose';
const { Schema, model } = pkg;

const supportSchema = new Schema({
	userId : {
		required: true,
		type: String
	},
	description : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
},{collection : 'support'},)

export default model('support',supportSchema)
