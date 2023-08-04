import sleepModel from '../models/sleepModel.js';
import pkgs from 'jsonwebtoken';
const { sign } = pkgs;
import dateFormat from 'dateformat';
import moment  from 'moment';

export async function addSleep(req, res) {
    try {
        var codeId = req.body.codeId
        var sleep = req.body.sleep
        var createdAt = req.body.createdAt
        var sleeps = new sleepModel({ codeId, sleep, createdAt});
        await sleeps.save();
        res.status(200).json({
            success: true, message: {
                message: "Added successfully",
                sleep: sleeps,
            }
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}

export async function getHourSleep(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var currentDate = dateFormat(Date.now(), "dd mm yyyy, hh")
            var sleep = await sleepModel.find({ codeId: req.body.codeId}).sort([['_id', 1]]);
            var final_sleep_time = []
            var sleepObj = {}
            if(sleep.length > 0){
                for(var i = 0; i < sleep.length; i++){
                    var gotDate = dateFormat(sleep[i].createdAt, "dd mm yyyy, hh")
                    if(gotDate == currentDate){
                        final_sleep_time.push(sleep[i])
                        sleepObj[dateFormat(sleep[i].createdAt, "dd:mm:yyyy:hh:MM")] = sleep[i].sleep
                    }
                }
            }
            res.status(200).json({ success: true, message: sleepObj});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function getTodaySleep(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var sleep = await sleepModel.find({ codeId:  req.body.codeId});
            var obj = {}
            var todayDate = dateFormat(Date.now(), "dd mm yyyy")
            if(sleep.length > 0){
                var todaySleep = []
                for(var i = 0; i < sleep.length; i++){
                    var gotDate = dateFormat(sleep[i].createdAt, "dd mm yyyy")
                    if(gotDate == todayDate){
                        todaySleep.push(sleep[i])
                    }
                }
            }
            if(todaySleep.length > 0){
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
                    for(var i = 0; i < todaySleep.length; i++){
                        var gotDate = dateFormat(todaySleep[i].createdAt, "dd mm yyyy hh")
                        if(gotDate == currentDate){
                            maintainTime.push(todaySleep[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].sleep)
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

export async function getMonthSleep(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var sleep = await sleepModel.find({ codeId:  req.body.codeId}).sort([['_id', 1]]);
            var obj = {}
            var currentMonth = dateFormat(Date.now(), "mm yyyy")
            if(sleep.length > 0){
                var monthSleep = []
                for(var i = 0; i < sleep.length; i++){
                    var gotDate = dateFormat(sleep[i].createdAt, "mm yyyy")
                    if(gotDate == currentMonth){
                        monthSleep.push(sleep[i])
                    }
                }
            }
            if(monthSleep.length > 0){
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
                    for(var i = 0; i < monthSleep.length; i++){
                        var gotMonth = dateFormat(monthSleep[i].createdAt, "dd mm yyyy")
                        if(gotMonth == currentMonthLoop){
                            maintainTime.push(monthSleep[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].sleep)
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