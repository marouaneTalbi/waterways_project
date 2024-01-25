'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileInput, Label } from 'flowbite-react';
import PdfIcon from '../../assets/png/pdf-icon.png';
import sendRequest from "../../services/axiosRequestFunction";


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
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10000000) { 
        notify('File is too large. Maximum size is 10MB.', 'error');
        return;
      }
      setFile(selectedFile);
      setSelectedFileName(selectedFile);
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
      const response = await sendRequest('/api/kbis', 'POST', formData);
      setIsLoading(false); 
      notify('File successfully uploaded', 'success');
    } catch (error) {
      notify('Upload error: ' + error.message, 'error');
      setIsLoading(false); 
    }
  };

  return (
    <>
      <div className="">
        <ToastContainer />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Deviens prestataire</h1>
        <p className='text-md text-gray-500 text-center'>
          Vous devez nous fournir un Kbis, pour que l'on puisse traiter votre demande
        </p>
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 flex flex-col items-center gap-8">
          <div className="w-full">
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-dark-orange bg-light-orange hover:bg-[#f7e7e6]"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Format supporté : PDF</p>
                </div>
                <FileInput id="file" name="file" className="hidden" onChange={handleFileChange} />
              </Label>
            </div>
            {
              selectedFileName && (
                <div className='flex flex-col gap-1 bg-white rounded-md p-3 border border-gray-300 mt-8'>
                  <div className='flex flex-row gap-1'>
                    <img className='h-12' src={PdfIcon} alt='pdf-icon' />
                    <div className='flex flex-col gap-1'>
                      <span className='text-black text-base font-medium'>{file.name}</span>
                      <span className='text-gray-400 text-sm font-medium'>{file.size} KO</span>
                    </div>
                  </div>
                </div>
              )
            }
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-dark-orange text-white font-bold py-3 px-20 rounded-lg focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
            {isLoading ? 'Uploading...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </>
  );
};

export default RequestProvider;
