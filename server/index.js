import express from 'express';
import cors from 'cors';
import * as dot from 'dotenv'
import multer from 'multer'
import { chatWithAssistant, uploadFile } from './controllers.js';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // keep original filename as is
  },
});

const upload = multer({ storage });

dot.config();
const app = express();
const PORT = process.env.PORT || 9000;


const pineConeApiKey = process.env.PINECONE_KEY;

const origin = process.env.ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin
}));
app.use(express.json());

app.post('/chat', chatWithAssistant);
app.post('/upload', upload.single('file'), uploadFile);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, ${pineConeApiKey}`);
});