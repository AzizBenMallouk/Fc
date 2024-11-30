const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const client = new Client();

let qrCodeData = '';
let connectedNumber = ''; // This will hold the connected number

// Handle QR Code Generation
client.on('qr', qr => {
  qrcode.toDataURL(qr, (err, url) => {
    if (!err) {
      qrCodeData = url;
    }
  });
});

// Handle Ready State
client.on('ready', async () => {
  console.log('WhatsApp client is ready!');
  try {
    // Fetch the connected account information
    const info = await client.info;
    connectedNumber = `${info.wid.user}@c.us`; // Save the connected user's chatId
    console.log(`Connected WhatsApp number: ${connectedNumber}`);
  } catch (error) {
    console.error('Error fetching connected number:', error);
  }
});

// Serve QR Code
app.get('/qr-code', (req, res) => {
  if (qrCodeData) {
    res.type('text/plain');
    res.status(200).send(qrCodeData);
  } else {
    res.status(500).json({ message: 'QR Code not available yet.' });
  }
});

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, `${Date.now()}${fileExtension}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint to Upload Image and Send via WhatsApp
app.post('/upload-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  console.log(connectedNumber, req.file)
  const filePath = path.resolve(__dirname, req.file.path);

  try {
    if (!connectedNumber) {
      throw new Error('WhatsApp is not connected. Please scan the QR code.');
    }

    // Send the image to the connected account's chat
    const media = MessageMedia.fromFilePath(filePath);
    await client.sendMessage(connectedNumber, 'You have received a new file!');
    await client.sendMessage(connectedNumber, media, {
        caption: 'Here is the uploaded image!',
    });

    console.log("GOOOD")

    res.status(200).json({
      message: 'Image uploaded and sent successfully!',
      filePath: `/uploads/${req.file.filename}`
    });
    console.log("GOOOD")
  } catch (error) {
    console.error('Error sending image:', error);
    res.status(500).json({ message: 'Failed to send the image via WhatsApp.' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

client.initialize();
