"use client"

import { useChat } from 'context/ChatContext';
import { useState } from 'react';
import { BsUpload } from 'react-icons/bs';

function UploadZone() {
  const [fileStatus, setFileStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setChatMessages } = useChat();

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setLoading(true);

    if (file.name.endsWith('.json')) {
      const reader = new FileReader();

      setLoading(false);

      reader.onload = (e) => {
        try {
          setLoading(false);
          setChatMessages(
            JSON.parse(e.target.result)
          );
          
        } catch (error) {
          setFileStatus("Error parsing JSON");
        } finally {
          setLoading(false);
        }
      };

      reader.readAsText(file);

    } else {

      setFileStatus("File must be a .json");
      setLoading(false);
      return;
    }
  }


  return (
    <>
      <div className="justify-center text-center flex items-center flex-col h-full">
        <div className="h-fit">
          <h2 className="text-green-800 font-primary uppercase text-2xl">Upload Here!</h2>
          <p className="text-green-700 w-[80%] mx-auto mt-1">Get started by uploading a conversation!</p>

          <div className="flex items-center justify-center mt-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer border border-dashed border-green-700 rounded-2xl flex items-center justify-center p-4 hover:bg-green-50 transition"
            >
              {
                
              }
              {loading ? (
                <div className="animate-spin rounded-full border-dashed h-10 w-10 border-b-3 border-green-800"></div>
              ) : (
                <BsUpload className="text-green-800 w-10 h-auto" />
              )}
              <input
                disabled={loading}
                id="file-upload"
                type="file"
                onChange={handleUpload}
                onDrop={handleUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className='text-red-700 text-sm mt-2'>{fileStatus}</p>
        </div>
      </div>
    </>
  );
}

export default UploadZone;