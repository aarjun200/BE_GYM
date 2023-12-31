import pkg from 'mongoose';
const { Schema, model } = pkg;

const userSchema = new Schema({
	firstName : {
		required: false,
		type: String
	},
	lastName : {
		required: false,
		type: String
	},
	codeId : {
		required: false,
		type: String,
		default: Math.random().toString(36).substring(2,7)
	},
	organizationName : { // only for partner
		required: false,
		type: String
	},
	gender : {
		required: false,
		type: String,
	},
	phone : {
		required: true,
		type: String,
		unique: true
	},
	email : {
		required: true,
		type: String,
		unique: true
	},
	dob : {        // only for patient
		required: false,
		type: String, 
		default:''
	},
	userType : {
		required: false,
		type: Number, //patient = 2,partner = 1,admin = 0
		default: 1
	},
	healthActivity : {    // only for patient
		required: false,
		type: Array,
		default:''
	},
	profileImageUrl : {
		required: false,
		type: String,
		default: '1662632016476.webp'
	},
	description : {
		required: false,
		type: String,
		default:''
	},
	codeId : {
		required: false,
		type: String,
		default: Math.random().toString(36).substring(2,7)
	},
	coverImageUrl : {
		required: false,
		type: String,
		default:'1662565875921.webp'
	},
	category : {
		required: false,
		type: Object,
		default:''
	},
	password :{
		required: true,
		type: String,
	},
	address : {
		required: false,
		type: String,
		default:''
	},
	city : {
		required: false,
		type: String,
		default:''
	},
	state : {
		required: false,
		type: String,
		default:''
	},
	country : {
		required: false,
		type: String,
		default:''
	},
	active :{
		required : false,
		type: Number,
		default:1
	},
	pincode : {
		required: false,
		type: String,
		default:''
	},
	partnerId :{
		required : false,
		type: String,
		default: ''
	},
    deviceId :{ 
		required : false,
		type: String,
		default: ''
	},
	modelId :{ 
		required : false,
		type: String,
		default: ''
	},
	room :{ 
		required : false,
		type: String,
		default: ''
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'user'},)

export default model('user',userSchema)
