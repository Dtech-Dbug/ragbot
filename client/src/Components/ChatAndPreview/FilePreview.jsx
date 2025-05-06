import React, { memo, useContext } from "react";
import { AppProviderContext } from "../../Provider.jsx";

// useMemoized FilePreview component
export const FilePreview = memo(function FilePreview() {
    const { file } = useContext(AppProviderContext);
    if (!file) return <p className="text-gray-500">No file uploaded</p>;


    const url = URL.createObjectURL(file);
    if (file.type === "application/pdf") {
        return (
            <iframe
                src={url}
                title="PDF Preview"
                className="w-full h-[80vh] border rounded"
            />
        );
    }
    return <p className="text-gray-700">{file.name}</p>;
});