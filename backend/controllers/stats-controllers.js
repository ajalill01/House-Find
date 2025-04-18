const User = require('../model/User');

const getAllUsers = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limits = parseInt(req.query.limits) || 10;
        const skip = (page-1)*limits;

        const users = await User.find({ role: 'user' }).skip(skip).limit(limits).lean();
        const totalUsers = await User.countDocuments({ role: 'user' });

        res.status(202).json({
            success: true,
            message: 'Get all users is done',
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limits),
            totalUsers: totalUsers,
            users: users
        });
    } catch (e) {
        console.log('Error from getAllUsers\n', e);
        res.status(500).json({
            success: false,
            message: 'Error from get all users'
        });
    }
};

module.exports = { getAllUsers };
