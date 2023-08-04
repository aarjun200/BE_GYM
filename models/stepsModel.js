import pkg from 'mongoose';
const { Schema, model } = pkg;

const stepSchema = new Schema({
	codeId : {
		required: true,
		type: String
	},
	steps : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		required: false,
		type: Date,
	},
},{collection : 'steps'},)

export default model('steps',stepSchema)
