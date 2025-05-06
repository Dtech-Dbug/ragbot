import { useEffect, useState, useContext, useCallback } from 'react';
import { AppProviderContext } from '../../Provider.jsx';
import { saveBlob } from '../../utils.js';

const BASE_URL = "http://localhost:9000"; // Adjust this to your server's URL
const fileUploadEndpoint = `${BASE_URL}/upload`;

export const useFileUpload = () => {
    const { setLoading, setFile, fileId } = useContext(AppProviderContext);

    const handleFileUpload = useCallback(async (file) => {
        const formData = new FormData();
        formData.append("file", file); // "file" matches multer's field name
        setLoading(true);

        try {
            const response = await fetch(fileUploadEndpoint, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");
            const data = await response.json();
            setLoading(false);
            setFile(file)
            saveBlob(fileId, file, 'file'); // Save the file to local storage
            console.log("Upload success:", data);
        } catch (error) {
            console.error("Upload error:", error);
        }
    }, [])

    const onFileChange = (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    return { onFileChange };

}

