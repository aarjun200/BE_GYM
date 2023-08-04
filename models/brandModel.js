import pkg from 'mongoose';
const { Schema, model } = pkg;

const brandSchema = new Schema({
	brandName : {
		required: true,
		type: String
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
},{collection : 'brand'},)

export default model('brand',brandSchema)
