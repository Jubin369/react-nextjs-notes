import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
    const { method } = req;
    
    switch (method) {
        case 'POST':
            try {
                const user = await User.create(req.body);

                res.status(201).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
            case 'GET':
                try {
                    let username = req.query.username;
                    let password = req.query.password;
                    
                    const user = await User.find({username,password});
                    
                    if (!user) {
                        return res.status(400).json({ success: false });
                    }
    
                    res.status(200).json({ success: true, data: user });
                } catch (error) {
                    res.status(400).json({ success: false });
                }
                break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}