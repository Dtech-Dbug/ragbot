import React, { useState, useContext } from "react";
import { useFileUpload } from "./useFileUpload";
import { Loader } from "../Loader";
import { AppProviderContext } from "../../Provider.jsx";

export default function FileUpload() {

    const { loading } = useContext(AppProviderContext);
    const { onFileChange } = useFileUpload();


    return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-50">
            <div className="bg-white p-12 rounded-lg shadow-lg w-96 flex flex-col items-center">
                <label
                    className={`border-4 border-dashed p-10 cursor-pointer rounded-lg w-full flex flex-col items-center justify-center border-gray-300 hover:border-blue-500
                        }`}
                >
                    <input
                        type="file"
                        className="hidden"
                        onChange={onFileChange}
                        name="file"
                    />
                    {!loading ? (
                        <p className="text-gray-600 text-center">Click to upload doc </p>
                    ) : (
                        <Loader />
                    )}
                </label>
            </div>
        </div>
    );
}
