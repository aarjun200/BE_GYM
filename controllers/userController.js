import userModel from '../models/userModel.js';
import pkgs from 'jsonwebtoken';
const { sign } = pkgs;
import pkg from 'bcryptjs';
const { genSalt, hash } = pkg;


export async function getallUsersDuringSignUp(req, res) {
    try {
        var users = await userModel.find({ userType: 1 }).sort([['_id', -1]]).lean();
        res.status(200).json({ success: true, message: users });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function adminDashboard(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            var activePatient = await userModel.find({ userType: 2, active: 1 });
            var activePartner = await userModel.find({ userType: 1, active: 1 });
            var InactivePatient = await userModel.find({ userType: 2, active: 0 });
            var InactivePartner = await userModel.find({ userType: 1, active: 0 });
            let data = {
                activePatient: activePatient.length,
                activePartner: activePartner.length,
                InactivePatient: InactivePatient.length,
                InactivePartner: InactivePartner.length,
            };
            res.status(200).json({ success: true, message: data });
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function partnerDashboard(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            console.log('user cominf', user);
            var activePatient = await userModel.find({ userType: 1, active: 1 });
            var InactivePatient = await userModel.find({userType: 1, active: 0 });
            let data = {
                activePatient: activePatient.length,
                InactivePatient: InactivePatient.length,
            };
            res.status(200).json({ success: true, message: data });
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function getallUsers(req, res) {
    try {
        const { type, id } = req.body;
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            if(id != ''){
                var users = await userModel.find({ userType: type, partnerId : id }).sort([['_id', -1]]).lean();
                if (type == 2) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].partnerId != null) {
                            var partner = await userModel.findOne({ _id: users[i].partnerId });
                            users[i].partner = partner;
                        }
                    }
                }
                if (type == 1) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].partnerId != null) {
                            var partner = await userModel.find({ partnerId: users[i]._id });
                            users[i].patientCount = partner.length;
                        }
                    }
                }
            }
            else{
                var users = await userModel.find({ userType: type }).sort([['_id', -1]]).lean();
                if (type == 2) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].partnerId != null) {
                            var partner = await userModel.findOne({ _id: users[i].partnerId });
                            users[i].partner = partner;
                        }
                    }
                }
                if (type == 1) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].partnerId != null) {
                            var partner = await userModel.find({ partnerId: users[i]._id });
                            users[i].patientCount = partner.length;
                        }
                    }
                }
            }
            res.status(200).json({ success: true, message: users });
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function getallUsersAssigned(req, res) {
    try {
        const { id } = req.body;
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            const users = await userModel.find({ partnerId: id }).sort([['_id', -1]]);


            res.status(200).json({ success: true, message: users });
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function getUserDetails(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            const users = await userModel.findOne({ _id: req.body.id });
            res.status(200).json({ success: true, message: users });
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export function getUserbyId(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            const data = await userModel.findOne({ _id: req.params.uid });
            if (!data)
                return res.status(400).json({ status: false, message: "User Does not Exist" });
            res.status(200).json({
                success: true, message: {
                    user: data,
                }
            });
        });
    }
    catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
}
export function addUser(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { firstName, lastName, gender, phone, modelId, email, dob, address, city, state, country, active, pincode, userType, partnerId, deviceId, organizationName, password, room } = req.body;
            let user = await userModel.findOne({ email });
            let partner = '';
            if (userType === 2) {
                partner = await userModel.findOne({ _id: partnerId });
            }
            if (user)
                return res.status(400).json({ success: false, message: "Email Already Exists" });
            user = new userModel({ firstName, lastName, gender, modelId, phone, email, userType, dob, address, city, state, country, active, pincode, partnerId, deviceId, organizationName, room });
            const salt = await genSalt(10);
            user.password = await hash(password, salt);
            user.codeId = Math.random().toString(36).substring(2,7);
            await user.save();
            if (userType === 2) {
                res.status(200).json({
                    status: true, message: {
                        message: "Added User Successfully",
                        user: user,
                        partner: partner
                    }
                });
            }
            if (userType === 1 || userType === 0) {
                res.status(200).json({
                    status: true, message: {
                        message: "Added User Successfully",
                        user: user,
                    }
                });
            }

        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}
export function statusUser(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { active, id } = req.body;
            let user = await userModel.findOne({ _id: id });
            if (!user)
                return res.status(400).json({ status: false, message: "No User Exist" });
            user = await userModel.findOneAndUpdate({ _id: id }, {
                active: active
            }, {
                new: true
            });
            await user.save();
            res.status(200).json({
                status: false, message: {
                    message: "Updated User Successfully",
                    user: user,
                }
            });
        });
    }
    catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
}

///Add password condition
export function updateUser(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { firstName, lastName, gender, phone, email, dob, userType, modelId, healthActivity, profileImageUrl, description, coverImageUrl, category, address, city, password, state, country, active, pincode, organizationName, partnerId, deviceId, id, room } = req.body;
            let user = await userModel.findOne({ _id: id });
            if (!user)
                return res.status(400).json({ status: false, message: "No User Exist" });
            user = await userModel.findOneAndUpdate({ _id: id }, {
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phone: phone,
                email: email,
                dob: dob,
                modelId: modelId,
                userType: userType,
                healthActivity: healthActivity,
                profileImageUrl: profileImageUrl,
                description: description,
                coverImageUrl: coverImageUrl,
                category: category,
                address: address,
                city: city,
                state: state,
                country: country,
                active: active,
                pincode: pincode,
                password: password,
                organizationName: organizationName,
                partnerId: partnerId,
                deviceId: deviceId,
                room : room
            }, {
                new: true
            });
            if(req.body.updateAll == 1){
                const salt = await genSalt(10);
                user.password = await hash(password, salt);
            }
            await user.save();
            res.status(200).json({
                status: false, message: {
                    message: "Updated User Successfully",
                    user: user,
                }
            });
        });
    }
    catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
}
export function deleteUser(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { id } = req.body;
            let user = await userModel.findOne({ _id: id });
            if (!user)
                return res.status(200).json({ status: false, message: "No User Exist" });
            user = await userModel.findByIdAndDelete({ _id: req.body.id }, function (errorDelete, response) {
                if (errorDelete)
                    res.status(400).json({ success: false, message: errorDelete.message });
                else
                    res.status(200).json({ success: true, message: 'User Deleted' });
            });
        });
    }
    catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
}