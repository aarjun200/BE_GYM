import stepModel from '../models/stepsModel.js';
import pkgs from 'jsonwebtoken';
const { sign } = pkgs;
import dateFormat from 'dateformat';



export async function addStep(req, res) {
    try {
        var codeId = req.body.codeId
        var steps = req.body.steps
        var createdAt = req.body.createdAt
        var step = new stepModel({ codeId, steps, createdAt});
        await step.save();
        res.status(200).json({
            success: true, message: {
                message: "Added successfully",
                steps: step,
            }
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}


export async function getHourStep(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var currentDate = dateFormat(Date.now(), "dd:mm:yyyy:HH")
            var steps = await stepModel.find({ codeId: req.body.codeId});
            var final_step_time = []
            var stepObj = {}
            if(steps.length > 0){
                for(var i = 0; i < steps.length; i++){
                    var gotDate = dateFormat(steps[i].createdAt, "dd:mm:yyyy:HH")
                    if(gotDate == currentDate){
                        final_step_time.push(steps[i])
                        stepObj[dateFormat(steps[i].createdAt, "dd:mm:yyyy:hh:MM")] = steps[i].steps
                    }
                }
            }
            res.status(200).json({ success: true, message: stepObj});
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function getTodayStep(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var steps = await stepModel.find({ codeId:  req.body.codeId});
            var obj = {}
            var todayDate = dateFormat(Date.now(), "dd mm yyyy")
            if(steps.length > 0){
                var todaySteps = []
                for(var i = 0; i < steps.length; i++){
                    var gotDate = dateFormat(steps[i].createdAt, "dd mm yyyy")
                    if(gotDate == todayDate){
                        todaySteps.push(steps[i])
                    }
                }
            }
            if(todaySteps.length > 0){
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
                    for(var i = 0; i < todaySteps.length; i++){
                        var gotDate = dateFormat(todaySteps[i].createdAt, "dd mm yyyy hh")
                        if(gotDate == currentDate){
                            maintainTime.push(todaySteps[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].steps)
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


export async function getMonthStep(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var steps = await stepModel.find({ codeId:  req.body.codeId}).sort([['_id', 1]]);
            var obj = {}
            var currentMonth = dateFormat(Date.now(), "mm yyyy")
            if(steps.length > 0){
                var monthStep = []
                for(var i = 0; i < steps.length; i++){
                    var gotDate = dateFormat(steps[i].createdAt, "mm yyyy")
                    if(gotDate == currentMonth){
                        monthStep.push(steps[i])
                    }
                }
            }
            if(monthStep.length > 0){
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
                    for(var i = 0; i < monthStep.length; i++){
                        var gotMonth = dateFormat(monthStep[i].createdAt, "dd mm yyyy")
                        if(gotMonth == currentMonthLoop){
                            maintainTime.push(monthStep[i]);
                        }
                    }
                    var total = 0
                    for(var x = 0 ; x < maintainTime.length; x++){
                        total = total + Number(maintainTime[x].steps)
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