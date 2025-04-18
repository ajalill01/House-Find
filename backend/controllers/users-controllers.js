const User = require('../model/User')
const bcrypt = require('bcrypt')



const updateProfile = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { newName, newEmail, oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Change username
        if (newName) {
            const nameTaken = await User.findOne({ username: newName });
            if (nameTaken && nameTaken._id.toString() !== userId) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                });
            }
            user.username = newName;
        }

        // Change email
        if (newEmail) {
            const emailTaken = await User.findOne({ email: newEmail });
            if (emailTaken && emailTaken._id.toString() !== userId) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use'
                });
            }
            user.email = newEmail;
        }

        // Change password
        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Old password is incorrect'
                });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(202).json({
            success: true,
            message: 'Profile updated successfully',
            updatedFields: {
                ...(newName && { newName }),
                ...(newEmail && { newEmail }),
                ...(newPassword && { passwordChanged: true })
            }
        });

    } catch (e) {
        console.log('Error from updateProfile\n', e);
        res.status(500).json({
            success: false,
            message: 'Error while updating profile',
            error: e.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.userInfo.userId;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User with this ID does not exist'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User has been deleted'
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Error while deleting user'
        });
        console.log('Error from deleteUser\n', e);
    }
};

module.exports = {
    updateProfile,
    deleteUser,
}