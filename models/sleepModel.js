import pkg from 'mongoose';
const { Schema, model } = pkg;

const stepSchema = new Schema({
	codeId : {
		required: true,
		type: String
	},
	sleep : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		required: false,
		type:Date,
	},
},{collection : 'sleep'},)

export default model('sleep',stepSchema)
