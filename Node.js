// server.js (مثال با Express.js)

const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

// این خط برای خواندن کلید از متغیرهای محیطی است
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'; // مدل پایدار جدید

app.use(bodyParser.json({ limit: '50mb' })); // برای دریافت داده‌های بزرگ (مانند تصاویر)

// تعریف نقطه پایانی جدید برای ارتباط با هوش مصنوعی
app.post('/api/solve', async (req, res) => {
    try {
        // دریافت payload از درخواست سمت کاربر (frontend)
        const payload = req.body;

        // ارسال درخواست به API هوش مصنوعی
        const response = await axios.post(
            `${API_URL}?key=${GEMINI_API_KEY}`, // **کلید API اینجا اضافه می‌شود و مخفی می‌ماند**
            payload
        );

        // ارسال پاسخ به سمت کاربر (frontend)
        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        res.status(500).send({ error: "خطا در ارتباط با سرویس هوش مصنوعی." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});
