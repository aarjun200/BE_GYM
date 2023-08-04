import brandModel from '../models/brandModel.js';
import pkg from 'jsonwebtoken';
import deviceModel from '../models/deviceModel.js';
const { sign } = pkg;



export async function getAllBrands(req, res) {
    try {
        const brands = await brandModel.find({}).sort([['_id', -1]]);
        res.status(200).json({ success: true, message: brands });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function getAllModelsFromBrand(req, res) {
    try {
        const devices = await deviceModel.find({brandId : req.body.id}).sort([['_id', -1]]);
        res.status(200).json({ success: true, message: devices });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export function addBrand(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { brandName } = req.body;
            var brand = new brandModel({ brandName });
            await brand.save();
            res.status(200).json({
                status: false, message: {
                    message: "Added Brand Successfully",
                    brand: brand,
                }
            });
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}

export function addDevice(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { modelName, brandId } = req.body;
            let device = await deviceModel.findOne({ modelName: modelName, brandId: brandId });
            if (device)
                return res.status(400).json({ success: false, message: "Device Already added" });
            device = new deviceModel({ modelName, brandId });
            await device.save();
            res.status(200).json({
                status: false, message: {
                    message: "Added User Successfully",
                    device: device,
                }
            });
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}

// export function updateDevice(req, res) {
//     try {
//         sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
//             const { name, modelName, modelId, partnerId, id } = req.body;
//             let device = await deviceModel.findOne({ _id: id });
//             if (!device)
//                 return res.status(400).json({ status: false, message: "No Device Exist" });
//             device = await deviceModel.findOneAndUpdate({ _id: id }, {
//                 name: name,
//                 modelName: modelName,
//                 modelId: modelId,
//                 partnerId: partnerId
//             }, {
//                 new: true
//             });
//             await device.save();
//             res.status(200).json({
//                 status: false, message: {
//                     message: "Updated Device Successfully",
//                     device: device,
//                 }
//             });
//         });
//     }
//     catch (err) {
//         return res.status(400).json({ status: false, message: err.message });
//     }
// }
export function deleteDevice(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { id } = req.body;
            let device = await deviceModel.findOne({ _id: id });
            if (!device)
                return res.status(400).json({ status: false, message: "No Device Exist" });
            device = await deviceModel.findByIdAndDelete({ _id: req.body.id }, function (errorDelete, response) {
                if (errorDelete)
                    res.status(400).json({ success: false, message: errorDelete.message });
                else
                    res.status(200).json({ success: true, message: 'Device Deleted' });
            });
        });
    }
    catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
}
export function deleteBrand(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { id } = req.body;
            let brand = await brandModel.findOne({ _id: id });
            if (!brand)
                return res.status(400).json({ status: false, message: "No Brand Exist" });
            brand = await brandModel.findByIdAndDelete({ _id: req.body.id }, function (errorDelete, response) {
                if (errorDelete)
                    res.status(400).json({ success: false, message: errorDelete.message });
                else
                    res.status(200).json({ success: true, message: 'Brand Deleted' });
            });
        });
    }
    catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
}

export async function getDeviceDetailById(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, user) {
            const device = await deviceModel.findOne({ _id: req.body.id });
            res.status(200).json({ success: true, message: device });
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}