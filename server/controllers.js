import { Pinecone } from '@pinecone-database/pinecone';
import * as dot from 'dotenv';
dot.config();

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_KEY
});

const assistant = pinecone.Assistant(process.env.PINECONE_ASST_NAME);


export const chatWithAssistant = async (req, res) => {
    const { messages } = req.body;
    // [{ role: 'user', content: 'Who is the CFO of Netflix?' }] format for messages attr

    if (!messages || messages.length === 0 || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'No messages provided' });
    }

    const chatResp = await assistant.chat({
        messages,
        includeHighlights: true,
    });
    // res.status(200).json(chatResp);
    // return;
    const content = chatResp?.message?.content;
    // const pageRef = chatResp?.citations?.[0]?.references?.[0]?.pages  

    const response = {
        content,
    };
    res.status(200).json(response);
}

// upload file controller 
export const uploadFile = async (req, res) => {
    console.log(req.file);
    const name = req.file.originalname;
    const dest = req.file.destination;
    const filePath = `./${dest}/${name}`;
    try {
        const response = await assistant.uploadFile({
            path : filePath,
        });
        res.status(200).json({ message: 'File uploaded successfully', response });
    } catch (error) {
        console.error('File upload failed:', error);
    }
}