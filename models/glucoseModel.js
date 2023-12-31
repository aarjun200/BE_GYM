import pkg from 'mongoose';
const { Schema, model } = pkg;

const glucoseSchema = new Schema({
	codeId : {
		required: true,
		type: String
	},
	glucose : {
		required: false,
		type: String,
		default:''
	},
	createdAt:{
		required: false,
		type:Date,
	},
},{collection : 'glucose'},)

export default model('glucose',glucoseSchema)
