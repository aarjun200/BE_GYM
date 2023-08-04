import { Router } from 'express';
const router = Router();
export default router;
import { addUser, getallUsers, getUserDetails, statusUser,getUserbyId, updateUser, deleteUser, getallUsersAssigned, getallUsersDuringSignUp, partnerDashboard, adminDashboard } from '../controllers/userController.js';
import { getAllBrands,addBrand,getAllModelsFromBrand,deleteBrand,addDevice, deleteDevice, getDeviceDetailById } from '../controllers/deviceController.js';
import { signUp, login , getState, getCity } from '../controllers/authController.js';
import { getAllTickets, addSupportTicket } from '../controllers/supportController.js';
import { getNurseDashboardVital, getUserVitals, getEmergencyVital } from '../controllers/vitalController.js';
import { addHeartRate, getHourHeartRate, getTodayHeartRate, getMonthHeartRate } from '../controllers/heartVitalController.js';
import { addStep, getHourStep, getTodayStep, getMonthStep } from '../controllers/stepVitalController.js';
import { addSleep, getHourSleep, getTodaySleep, getMonthSleep } from '../controllers/sleepVitalController.js';
import { addGlucose, getHourGlucose, getTodayGlucose, getMonthGlucose } from '../controllers/glucoseController.js';

// const s3 = new AWS.S3({
// 	accessKeyId: "AKIA24434Q4N4WQH7TF4",
// 	secretAccessKey: "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",
// 	region : "us-east-2"
// });


// var uploadFile = multer({
//     storage: multerS3({
//         s3: s3,
//         //acl: 'public-read',
//         bucket: 'healthportalplus',
// 		contentType: multerS3.AUTO_CONTENT_TYPE, 
//         key: function (req, file, cb) {
// 			var nameFile = Date.now() + path.extname(file.originalname);
//             cb(null, nameFile); //use Date.now() for unique file keys
//         }
//     })
// });



/////////// (Admin/Partner/Patient) Route/////
router.route('/addUser').post(addUser);
router.route('/getallusers').post(getallUsers);
router.route('/getuserdetail').post(getUserDetails);
router.route('/getUserbyId/:uid').post(getUserbyId);
router.route('/updateUser').post(updateUser);
router.route('/statusUser').post(statusUser);
router.route('/deleteUser').post(deleteUser);
router.route('/getallUsersAssigned').post(getallUsersAssigned);
router.route('/getallUsersDuringSignUp').get(getallUsersDuringSignUp);
router.route('/partnerDashboard').get(partnerDashboard);


///////////Admin DashBoard Route/////
router.route('/adminDashboard').get(adminDashboard);

///////////Authentication Route/////
router.route('/signUp').post(signUp);
router.route('/login').post(login);


/////////// Device Route/////
router.route('/adddevice').post(addDevice);     ////Add Model of device
router.route('/addbrand').post(addBrand);       ////Add Brand of device
router.route('/getallmodels').post(getAllModelsFromBrand);     ////Get all models of particular Brand
router.route('/getallbrand').post(getAllBrands);  ////Get all Brands
router.route('/deletebrand').post(deleteBrand);      /////Delete a brand
router.route('/deletedevice').post(deleteDevice);     /////Delete a model
router.route('/getdevicedetail').post(getDeviceDetailById);



/////////// Heart Rate Route/////
router.route('/addHeartRate').post(addHeartRate);
router.route('/getHourRate').post(getHourHeartRate);
router.route('/getTodayRate').post(getTodayHeartRate);
router.route('/getMonthRate').post(getMonthHeartRate);

/////////// Glucose Route/////
router.route('/addGlucose').post(addGlucose);
router.route('/getHourGlucose').post(getHourGlucose);
router.route('/getTodayGlucose').post(getTodayGlucose);
router.route('/getMonthGlucose').post(getMonthGlucose);


/////////// Sleep Route/////
router.route('/addSleep').post(addSleep);
router.route('/getHourSleep').post(getHourSleep);
router.route('/getTodaySleep').post(getTodaySleep);
router.route('/getMonthSleep').post(getMonthSleep);

/////////// Steps Route/////
router.route('/addSteps').post(addStep);
router.route('/getHourStep').post(getHourStep);
router.route('/getTodayStep').post(getTodayStep);
router.route('/getMonthStep').post(getMonthStep);


/////////// Get User Route/////
router.route('/getUserVital').post(getUserVitals);


/////////// Get User Route/////
router.route('/getEmergencyVital').post(getEmergencyVital);
router.route('/getNurseDashboardVital').post(getNurseDashboardVital)


/////////// Get State and City of US/////
router.route('/getState').get(getState);
router.route('/getCity').post(getCity);


//////////// Support Ticket ////////////
router.route('/getAllTickets').get(getAllTickets);
router.route('/addTickets').post(addSupportTicket);

//Upload Photos
// router.post("/uploadphoto", uploadFile.single("file"), async (req, res) => {
// 	try{
// 		const ref = `${req.file.key}`;
// 		res.status(200).json({success : true,message: ref})
// 	}
// 	catch (error) {
// 		res.status(400).json({success : false,message: error.message})
// 	}
// });