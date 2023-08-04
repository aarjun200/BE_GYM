import glucoseModel from '../models/glucoseModel.js';
import userModel from '../models/userModel.js';
import pkgs from 'jsonwebtoken';
const { sign } = pkgs;
import dateFormat from 'dateformat';
import moment  from 'moment';


export async function addGlucose(req, res) {
    try {
        var codeId = req.body.codeId
        var glucose = req.body.glucose
        var createdAt = req.body.createdAt
        var bloodGlucose = new glucoseModel({ codeId, glucose, createdAt});
        await bloodGlucose.save();
        res.status(200).json({
            success: true, message: {
                message: "Added successfully",
                glucose: bloodGlucose,
            }
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}


export async function getHourGlucose(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var currentDate = dateFormat(Date.now(), "dd mm yyyy, hh")
            var glucoseList = await glucoseModel.find({ codeId: req.body.codeId}).sort([['_id', 1]]);
            var final_sleep_time = []
            var glucoseObj = {}
            if(glucoseList.length > 0){
                for(var i = 0; i < glucoseList.length; i++){
                    var gotDate = dateFormat(glucoseList[i].createdAt, "dd mm yyyy, hh")
                    if(gotDate == currentDate){
                        final_sleep_time.push(glucoseList[i])
                        glucoseObj[dateFormat(glucoseList[i].createdAt, "dd:mm:yyyy:hh:MM")] = glucoseList[i].glucose
                    }
                }
            }
            res.status(200).json({ success: true, message: glucoseObj});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function getTodayGlucose(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var glucoseList = await glucoseModel.find({ codeId:  req.body.codeId});
            var obj = {}
            var todayDate = dateFormat(Date.now(), "dd mm yyyy")
            if(glucoseList.length > 0){
                var todayGlucose = []
                for(var i = 0; i < glucoseList.length; i++){
                    var gotDate = dateFormat(glucoseList[i].createdAt, "dd mm yyyy")
                    if(gotDate == todayDate){
                        todayGlucose.push(glucoseList[i])
                    }
                }
            }
            if(todayGlucose.length > 0){
                for(var k = 0 ; k < 24; k++){
                    var currentDate
                    var maintainTime = []
                    if( k < 10){
                        var t = "0"+k;
                        currentDate = dateFormat(Date.now(), "dd mm yyyy "+t)
                    }
                    else{
                        currentDate = dateFormat(Date.now(), "dd mm yyyy "+k)
                    }
                    for(var i = 0; i < todayGlucose.length; i++){
                        var gotDate = dateFormat(todayGlucose[i].createdAt, "dd mm yyyy hh")
                        if(gotDate == currentDate){
                            maintainTime.push(todayGlucose[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].glucose)
                        obj[dateFormat(maintainTime[0].createdAt, "dd:mm:yyyy:hh:00")] = Math.ceil(total / maintainTime.length);
                    }
                }
            }
            res.status(200).json({ success: true, message: obj});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function getMonthGlucose(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var glucoseList = await glucoseModel.find({ codeId:  req.body.codeId}).sort([['_id', 1]]);
            var obj = {}
            var currentMonth = dateFormat(Date.now(), "mm yyyy")
            if(glucoseList.length > 0){
                var monthGlucose = []
                for(var i = 0; i < glucoseList.length; i++){
                    var gotDate = dateFormat(glucoseList[i].createdAt, "mm yyyy")
                    if(gotDate == currentMonth){
                        monthStep.push(glucoseList[i])
                    }
                }
            }
            if(monthGlucose.length > 0){
                for(var k = 1 ; k < 31; k++){
                    var currentMonthLoop
                    var maintainTime = []
                    if( k < 10){
                        var t = "0"+k;
                        currentMonthLoop = dateFormat(Date.now(), t + " mm yyyy")
                    }
                    else{
                        currentMonthLoop = dateFormat(Date.now(), k + " mm yyyy")
                    }
                    //console.log("this is current month " + currentMonth)
                    for(var i = 0; i < monthGlucose.length; i++){
                        var gotMonth = dateFormat(monthGlucose[i].createdAt, "dd mm yyyy")
                        if(gotMonth == currentMonthLoop){
                            maintainTime.push(monthGlucose[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].glucose)
                        obj[dateFormat(maintainTime[0].createdAt, "dd:mm:yyyy:00:00")] = Math.ceil(total / maintainTime.length);
                    }
                }
            }
            res.status(200).json({ success: true, message: obj});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}