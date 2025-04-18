// routes/admin-routes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleware = require('../middleware/admin-middleware');
const {getAllUsers} = require('../controllers/stats-controllers')

// Total Listings
// router.get('/total-listings',adminMiddleware, (req, res) => {
//   res.json({ metric: 'Total Listings', value: 1200 });
// });

// // Users
// router.get('/users', adminMiddleware, (req, res) => {
//   res.json({ metric: 'Users', value: 345 });
// });

// //Verified Listings
// router.get('/verified-listings', adminMiddleware, (req, res) => {
//   res.json({ metric: 'Verified Listings', value: 980 });
// });

// // Reported Listings
// router.get('/reported-listings', adminMiddleware, (req, res) => {
//   res.json({ metric: 'Reported Listings', value: 26 });
// });
// // new users
// router.get('/new-users', adminMiddleware, (req, res) => {
//     res.json({ metric: 'new-users', value: 354 });
//   });
//   router.get('/new-users', adminMiddleware, async (req, res) => {
//     try {
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
//       const newUsersCount = await User.countDocuments({
//         createdAt: { $gte: oneWeekAgo }
//       });
  
//       res.json({ metric: 'New Users (last 7 days)', value: newUsersCount });
//     } catch (error) {
//       console.error('Error fetching new users:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
  
  
router.get('/users',authMiddleware,adminMiddleware,getAllUsers)

module.exports = router;