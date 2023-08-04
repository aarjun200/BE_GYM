import pkg from 'mongoose';
const { Schema, model } = pkg;

const heartRateSchema = new Schema({
	codeId : {
		required: true,
		type: String
	},
	heartRate : {
		required: false,
		type: String,
		default:''
	},
    createdAt:{
		required: false,
		type: Date,
	},
},{collection : 'heartRate'}
)

export default model('heartRate',heartRateSchema)
