import { createContext, useState, useEffect } from "react";
import { getBlob } from "./utils";

export const AppProviderContext = createContext();

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const fileId = 'testFileId'
    const [file, setFile] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const cachedBlob = await getBlob(fileId);
            if (cachedBlob) {
                setFile(cachedBlob);
                setLoading(false);
                console.log(cachedBlob);
            };
            setLoading(false);
        })();
    }, []);


    return (
        <AppProviderContext.Provider value={{ file, setFile, loading, setLoading, fileId }}>
            {children}
        </AppProviderContext.Provider>
    );
}