import heartRateModel from '../models/heartRateModel.js';
import pkgs from 'jsonwebtoken';
const { sign } = pkgs;
import dateFormat from 'dateformat';


export async function addHeartRate (req, res) {
    try {
        var codeId = req.body.codeId
        var heartRate = req.body.heartRate
        var createdAt = req.body.createdAt
        var heart = new heartRateModel({ codeId, heartRate, createdAt});
        await heart.save();
        res.status(200).json({
            success: true, message: {
                message: "Added successfully",
                heart: heart,
            }
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}


export async function getHourHeartRate(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var currentDate = dateFormat(Date.now(), "dd:mm:yyyy:HH")
            var heartRate = await heartRateModel.find({ codeId: req.body.codeId});
            var final_heart_rate = []
            var heartObj = {}
            if(heartRate.length > 0){
                for(var i = 0; i < heartRate.length; i++){
                    var gotDate = dateFormat(heartRate[i].createdAt, "dd:mm:yyyy:HH")
                    if(gotDate == currentDate){
                        final_heart_rate.push(heartRate[i])
                        heartObj[dateFormat(heartRate[i].createdAt, "dd:mm:yyyy:HH:MM")] = heartRate[i].heartRate
                    }
                }
            }
            res.status(200).json({ success: true, message: heartObj});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function getTodayHeartRate(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var heartRate = await heartRateModel.find({ codeId: req.body.codeId}).sort([['_id', 1]]);
            var obj = {}
            var todayDate = dateFormat(Date.now(), "dd mm yyyy")
            if(heartRate.length > 0){
                var todayHeartRate = []
                for(var i = 0; i < heartRate.length; i++){
                    var gotDate = dateFormat(heartRate[i].createdAt, "dd mm yyyy")
                    if(gotDate == todayDate){
                        todayHeartRate.push(heartRate[i])
                    }
                }
            }
            if(todayHeartRate.length > 0){
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
                    for(var i = 0; i < todayHeartRate.length; i++){
                        var gotDate = dateFormat(todayHeartRate[i].createdAt, "dd mm yyyy hh")
                        if(gotDate == currentDate){
                            maintainTime.push(todayHeartRate[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].heartRate)
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


export async function getMonthHeartRate(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var heartRate = await heartRateModel.find({ codeId: req.body.codeId}).sort([['_id', 1]]);
            var obj = {}
            var todayDate = dateFormat(Date.now(), "mm yyyy")
            var monthHeartRate = []
            if(heartRate.length > 0){
                for(var i = 0; i < heartRate.length; i++){
                    var gotDate = dateFormat(heartRate[i].createdAt, "mm yyyy")
                    if(gotDate == todayDate){
                        monthHeartRate.push(heartRate[i])
                    }
                }
            }
            if(monthHeartRate.length > 0){
                for(var k = 1 ; k < 31; k++){
                    var currentMonth
                    var maintainTime = []
                    if( k < 10){
                        var t = "0"+k;
                        currentMonth = dateFormat(Date.now(), t + " mm yyyy")
                    }
                    else{
                        currentMonth = dateFormat(Date.now(), k + " mm yyyy")
                    }
                    //console.log("this is current month " + currentMonth)
                    for(var i = 0; i < monthHeartRate.length; i++){
                        var gotMonth = dateFormat(monthHeartRate[i].createdAt, "dd mm yyyy")
                        if(gotMonth == currentMonth){
                            maintainTime.push(monthHeartRate[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].heartRate)
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