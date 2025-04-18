const User = require('../model/User');

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limits = parseInt(req.query.limits) || 10;
        const skip = (page - 1) * limits;
        const range = req.query.range;


        const filter = { role: 'user' };

        if (range === 'week') {
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            filter.createdAt = { $gte: lastWeek };
        } else if (range === 'month') {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            filter.createdAt = { $gte: lastMonth };
        }


        const users = await User.find(filter).skip(skip).limit(limits);
        const totalUsers = await User.countDocuments(filter);

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
