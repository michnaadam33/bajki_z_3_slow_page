const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint for story requests
app.post('/api/send-story-request', async (req, res) => {
    try {
        const { name, email, words, moral } = req.body;

        // Validate input
        if (!name || !email || !words || words.length !== 3 || !moral) {
            return res.status(400).json({
                error: 'Wszystkie pola są wymagane'
            });
        }

        // Email content for you (the admin)
        const adminEmailContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                <h2 style="color: #6b46c1;">🎨 Nowe zamówienie bajki!</h2>

                <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="color: #4c1d95; margin-top: 0;">Dane zamówienia:</h3>

                    <p><strong style="color: #6b46c1;">Imię:</strong> ${name}</p>
                    <p><strong style="color: #6b46c1;">Email:</strong> ${email}</p>

                    <div style="margin: 20px 0; padding: 15px; background-color: #f3e8ff; border-radius: 8px;">
                        <h4 style="color: #4c1d95; margin-top: 0;">Trzy magiczne słowa:</h4>
                        <ol style="color: #6b46c1;">
                            <li>${words[0]}</li>
                            <li>${words[1]}</li>
                            <li>${words[2]}</li>
                        </ol>
                    </div>

                    <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
                        <h4 style="color: #4c1d95; margin-top: 0;">Morał:</h4>
                        <p style="color: #78350f; margin: 0;">${moral}</p>
                    </div>

                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                        Zamówienie złożone: ${new Date().toLocaleString('pl-PL')}
                    </p>
                </div>
            </div>
        `;

        // Confirmation email for the customer
        const customerEmailContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #6b46c1; font-size: 32px;">🌙 Bajki z Trzech Słów ✨</h1>
                </div>

                <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #4c1d95; text-align: center;">Dziękujemy za zamówienie!</h2>

                    <p style="color: #4b5563; line-height: 1.6;">
                        Cześć ${name}! 👋
                    </p>

                    <p style="color: #4b5563; line-height: 1.6;">
                        Otrzymaliśmy Twoje zamówienie na bajkę. Nasi kreatywni czarodzieje już pracują nad stworzeniem
                        magicznej historii ze słów: <strong>${words.join(', ')}</strong>.
                    </p>

                    <div style="margin: 25px 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
                        <h3 style="margin-top: 0;">Co dalej? 📚</h3>
                        <ul style="line-height: 1.8;">
                            <li>Tworzymy unikalną bajkę na podstawie Twoich słów</li>
                            <li>Dodajemy piękną ilustrację</li>
                            <li>Nagrywamy profesjonalną narrację z muzyką</li>
                            <li>Wysyłamy gotową bajkę na Twój email</li>
                        </ul>
                    </div>

                    <p style="color: #4b5563; line-height: 1.6;">
                        Twoja bajka będzie zawierać morał: <em>"${moral}"</em>
                    </p>

                    <p style="color: #4b5563; line-height: 1.6;">
                        Bajka zostanie wysłana w ciągu 24-48 godzin. Jeśli masz jakiekolwiek pytania,
                        po prostu odpowiedz na ten email.
                    </p>

                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #9ca3af; font-size: 14px;">
                            Z magicznymi pozdrowieniami,<br>
                            Zespół Bajki z Trzech Słów ✨
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Send email to admin
        await resend.emails.send({
            from: 'Bajki z Trzech Słów <onboarding@resend.dev>',
            to: process.env.ADMIN_EMAIL || 'your-email@example.com',
            subject: `Nowe zamówienie bajki od ${name}`,
            html: adminEmailContent,
        });

        // Send confirmation email to customer
        await resend.emails.send({
            from: 'Bajki z Trzech Słów <onboarding@resend.dev>',
            to: email,
            subject: 'Potwierdzenie zamówienia Twojej bajki 🌙',
            html: customerEmailContent,
        });

        res.json({
            success: true,
            message: 'Zamówienie zostało przyjęte'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            error: 'Wystąpił błąd podczas wysyłania zamówienia',
            details: error.message
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🌙 Serwer Bajki z Trzech Słów działa na porcie ${PORT}`);
    console.log(`✨ Otwórz http://localhost:${PORT} w przeglądarce`);
});
