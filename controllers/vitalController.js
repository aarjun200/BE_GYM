import heartRateModel from '../models/heartRateModel.js';
import glucoseModel from '../models/glucoseModel.js';
import weightModel from '../models/weightModel.js';
import sleepModel from '../models/sleepModel.js';
import stepModel from '../models/stepsModel.js';
import userModel from '../models/userModel.js';
import pkgs from 'jsonwebtoken';
const { sign } = pkgs;
import dateFormat from 'dateformat';
import moment  from 'moment';


export async function getUserVitals(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            const toDate = Date.now()
            const fromDate = Date.now() - (req.body.date * 24*60*60*1000)
            var users = await userModel.findOne({ _id: req.body.id }).select("codeId");
            var code = users.codeId
            const heartRate = await heartRateModel.find({ codeId: code ,
                // createdAt: {
                //     $gte: fromDate, 
                //     $lt: toDate
                // }
            }).sort([['createdAt', -1]]).limit(1);
            const weight = await weightModel.find({ codeId: code ,
                // createdAt: {
                //     $gte: fromDate, 
                //     $lt: toDate
                // }
            }).sort([['_id', -1]]).limit(1);
            const glucose = await glucoseModel.find({ codeId: code ,
                // createdAt: {
                //     $gte: fromDate, 
                //     $lt: toDate
                // }
            }).sort([['_id', -1]]).limit(1);
            const sleep = await sleepModel.find({ codeId: code ,
                // createdAt: {
                //     $gte: fromDate, 
                //     $lt: toDate
                // }
            }).sort([['_id', -1]]).limit(1);
            const steps = await stepModel.find({ codeId: code ,
                // createdAt: {
                //     $gte: fromDate, 
                //     $lt: toDate
                // }
            }).sort([['_id', -1]]).limit(1);
            res.status(200).json({ success: true, user: users , heartRate : heartRate, weight : weight,
                glucose: glucose, sleep : sleep, steps : steps});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function getNurseDashboardVital(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            let userList = [];
            const {id,type} = req.body
            if(type === '0'){
                var userDetails = await userModel.find({userType : 2 }).select("firstName")
                .select("lastName").select("phone").select("email").select("profileImageUrl").select("address").select("city")
                .select("state").select("country").select('gender').select("dob").select("code").select('_id').lean()
            } else {
                var userDetails = await userModel.find({partnerId :id }).select("firstName")
                .select("lastName").select("phone").select("email").select("profileImageUrl").select("address").select("city")
                .select("state").select("country").select('gender').select("dob").select("code").select('_id').lean()
            }
            if(userDetails.length > 0){
                for(var x = 0 ; x < userDetails.length ; x++){
                    var heartRate = await heartRateModel.find( { userId: userDetails[x]._id}).sort([['_id', -1]]).limit(1)
                    var glucose = await glucoseModel.find( { userId: userDetails[x]._id}).sort([['_id', -1]]).limit(1)
                    var sleep = await sleepModel.find( { userId: userDetails[x]._id}).sort([['_id', -1]]).limit(1)
                    var steps = await stepModel.find( { userId: userDetails[x]._id}).sort([['_id', -1]]).limit(1)
                    userDetails[x].heartRate  = heartRate
                    userDetails[x].glucose = glucose
                    userDetails[x].sleep = sleep
                    userDetails[x].steps = steps
                }
            }
            res.status(200).json({ success: true, userDetail : userDetails});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function getEmergencyVital(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            let userList = [];
            const {id,type} = req.body
            if(type === '0'){
                var userDetails = await userModel.find({userType : 2 }).select("firstName")
                .select("lastName").select("phone").select("email").select("profileImageUrl").select("address").select("city")
                .select("state").select("country").select('gender').select("dob").select('_id').select("codeId").lean()
            } else {
                var userDetails = await userModel.find({partnerId :id }).select("firstName")
                .select("lastName").select("phone").select("email").select("profileImageUrl").select("address").select("city")
                .select("state").select("country").select('gender').select("dob").select('_id').select("codeId").lean()
            }
            if(userDetails.length > 0){
                for(var x = 0 ; x < userDetails.length ; x++){
                    var heartRate = await heartRateModel.find({ $and: [ { $or : [ { heartRate: { $lt: 60 } }, { heartRate: { $gt: 95 } }]}, { codeId: userDetails[x].codeId} ] }).sort([['_id', -1]])
                    userDetails[x].heartRate  = heartRate
                    if(userDetails[x].heartRate.length !== 0){
                        userList.push(userDetails[x])
                    }
                }
            }
            res.status(200).json({ success: true, userDetail : userDetails});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}




