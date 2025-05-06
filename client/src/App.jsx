import { useState, useContext } from 'react'
import './App.css'
import FileUpload from "./Components/FileUpload/index.jsx";
import ChatPreview from './Components/ChatAndPreview';
import { AppProviderContext } from './Provider.jsx';


export function App() {
  const { file } = useContext(AppProviderContext);
  console.log("isFileUploaded", file);

  return (
    <>
      {
        file ? <ChatPreview /> : <FileUpload />
      }

    </>
  );
}


export default App
