require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations');
const institutionRoutes = require('./routes/institutions');

const app = express();
app.use(express.json());
app.use(cors());

// חיבור למסד הנתונים
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ מחובר ל-MongoDB"))
  .catch(err => console.error("❌ שגיאת חיבור", err));

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/institutions', institutionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 השרת רץ על פורט ${PORT}`));
