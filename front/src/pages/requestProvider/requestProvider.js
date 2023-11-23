import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message, type) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  }
};

const RequestProvider = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10000000) { 
        notify('File is too large. Maximum size is 10MB.', 'error');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      notify('Please select a file first!', 'error');
      return;
    }

    setIsLoading(true); 
    const formData = new FormData();
    formData.append('file', file);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch('http://localhost:8888/api/kabis', {
        method: 'POST',
        body: formData,
        headers: {
          //'Accept': 'application/ld+json',
          // Inclure d'autres en-têtes au besoin
        },
      });

      setIsLoading(false); 
      if (response.ok) {
        notify('File successfully uploaded', 'success');
        const responseData = await response.json();
        console.log(responseData);
      } else {
        notify('Upload failed with status: ' + response.status, 'error');
      }
    } catch (error) {
      notify('Upload error: ' + error.message, 'error');
      setIsLoading(false); 
    }
  };

  return (
    <><div className="container mx-auto p-4">
      <ToastContainer />
    </div>
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Devenir prestataire</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Upload KBIS de votre entreprise:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="file"
              type="file"
              onChange={handleFileChange} />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div></>
  );
};

export default RequestProvider;
