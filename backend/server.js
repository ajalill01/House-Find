const mongoose = require('mongoose');
const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin-routes');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Hello, dashboard backend is live!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
mongoose.connect('mongodb://abderrahimboukhelfa:hN6l6fEMBlF382av@ac-8fbprbx-shard-00-00.ty0xwg4.mongodb.net:27017,ac-8fbprbx-shard-00-01.ty0xwg4.mongodb.net:27017,ac-8fbprbx-shard-00-02.ty0xwg4.mongodb.net:27017/?ssl=true&replicaSet=atlas-pkc4k2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));
