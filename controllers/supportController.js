import supportModel from '../models/supportModel.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;



export async function getAllTickets(req, res) {
    try {
        const supportTickets = await supportModel.find({}).sort([['_id', -1]]);
        res.status(200).json({ success: true, message: supportTickets });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export function addSupportTicket(req, res) {
    try {
        sign(req.headers.authorization.split(' ')[1], 'healthapp', async function (err, users) {
            const { userId, description } = req.body;
            var support = new supportModel({ userId, description });
            await support.save();
            res.status(200).json({
                status: false, message: {
                    message: "Ticket successfully Added",
                    supportTicket: support,
                }
            });
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }

}