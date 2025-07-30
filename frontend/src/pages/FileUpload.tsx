// import React, { useState } from 'react';
// import axios from 'axios';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadProgress(0);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('https://httpbin.org/post', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(percent);
//           console.log(`Upload Progress: ${percent}%`);
//         },
//       });

//       alert('File uploaded successfully!');
//       console.log(response.data);
//     } catch (error) {
//       console.error('Upload failed:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>File Upload with Progress</h2>
//       <input type="file" onChange={handleFileChange} />
//       <br /><br />
//       <button onClick={handleUpload}>Upload</button>
//       <br /><br />
//       <progress value={uploadProgress} max="100" />
//       <div>{uploadProgress}%</div>
//     </div>
//   );
// }

// export default FileUpload;
