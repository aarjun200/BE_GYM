import pkg from 'mongoose';
const { Schema, model } = pkg;

const deviceSchema = new Schema({
	modelName : {
		required: true,
		type: String
	},
    brandId : {
		required: true,
		type: String
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
},{collection : 'deviceModel'},)

export default model('deviceModel',deviceSchema)
