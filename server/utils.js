const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();


async function uploadFile() {
    console.log('env', process.env.PINECONE_KEY);
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_KEY
    });

    const assistant = pinecone.Assistant(process.env.PINECONE_ASST_NAME);

    try {
        const response = await assistant.uploadFile({
            path: './files/WorkDocs.pdf',
        });

        console.log('Upload response:', response);
    } catch (error) {
        console.error('File upload failed:', error);
    }
}

uploadFile();
