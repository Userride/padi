import React, { useState, useEffect } from 'react';
import './medicle.css';

function Article() {
  const [file, setFile] = useState(null);
  const [uploadDate, setUploadDate] = useState('');
  const [downloadDate, setDownloadDate] = useState('');
  const [filesList, setFilesList] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('Token is missing');
          return;
        }

        const response = await fetch('https://paediprime-4chb.onrender.com/api/users', {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData && userData.patientName) {
            setUser(userData);
          } else {
            console.error('User object does not include a patientName property');
          }
        } else {
          console.error('Failed to fetch user. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadDateChange = (e) => {
    setUploadDate(e.target.value);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to upload files');
      return;
    }
  
    if (!file || !uploadDate) {
      alert('Please select a file and date for upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', uploadDate);
  
    try {
      const response = await fetch('https://paediprime-4chb.onrender.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(`File uploaded successfully on ${data.uploadDate || uploadDate}`);
      } else {
        alert(data.error || 'Error uploading file');
      }
    } catch (error) {
      alert('Error uploading file');
      console.error(error);
    }
  };
  
  const fetchFiles = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to fetch files');
      return;
    }
  
    if (!downloadDate) {
      alert('Please enter a date to fetch files');
      return;
    }
  
    try {
      const response = await fetch(`https://paediprime-4chb.onrender.com/files?date=${downloadDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        setFilesList(data.files);
      } else {
        alert('No files found for the given date');
        setFilesList([]);
      }
    } catch (error) {
      alert('Error fetching files');
      console.error(error);
    }
  };
  
  const handleDownload = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to download files');
      return;
    }
  
    if (!selectedFile) {
      alert('Please select a file to download');
      return;
    }
  
    try {
      const response = await fetch(
        `https://paediprime-4chb.onrender.com/download?date=${downloadDate}&filename=${encodeURIComponent(selectedFile)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          throw new Error(errorData.message || 'File not found');
        }
        throw new Error(errorData.error || 'An error occurred');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile;
      a.click();
      alert('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
      alert(error.message || 'An unexpected error occurred while downloading the file');
    }
  };
  

  return (
    <div className="article">
      <h1>Understanding the Human Immune System</h1>
      {user ? (
        <p>Welcome, {user.patientName}</p>
      ) : (
        <p>Please log in to use the file manager.</p>
      )}

      {user && (
        <div className="file-upload">
          <h2>Upload and Download Files</h2>
          <input type="file" onChange={handleFileChange} />
          <input type="date" value={uploadDate} onChange={handleUploadDateChange} />
          <button onClick={handleUpload}>Upload File</button>
          <input type="date" value={downloadDate} onChange={(e) => setDownloadDate(e.target.value)} />
          <button onClick={fetchFiles}>Fetch Files</button>
          {filesList.length > 0 && (
            <div>
              <h3>Files Available:</h3>
              <select onChange={(e) => setSelectedFile(e.target.value)} value={selectedFile}>
                <option value="">Select a file</option>
                {filesList.map((file, index) => (
                  <option key={index} value={file}>
                    {file}
                  </option>
                ))}
              </select>
              <button onClick={handleDownload}>Download Selected File</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Article;




