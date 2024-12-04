import React, { useState } from 'react';

const Dtrial = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [modelUrl, setModelUrl] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        setLoading(true);
        setProgress(0);  // Reset progress before upload
        setStatus('Uploading image...');

        try {
            // Step 1: Upload the image to the Flask backend
            const response = await fetch('http://localhost:5000/upload-and-generate', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            const taskId = data.task_id;

            // Step 2: Poll for processing status
            const checkStatus = async () => {
                const statusResponse = await fetch(`http://localhost:5000/check-status/${taskId}`);
                const statusData = await statusResponse.json();

                if (statusData.status === 'SUCCEEDED') {
                    setModelUrl(statusData.model_url);
                    setStatus('Model Generated Successfully');
                    setLoading(false);
                    setProgress(100); // Set progress to 100 when done
                } else if (statusData.status === 'FAILED') {
                    setStatus('Model Generation Failed');
                    setLoading(false);
                    setProgress(0); // Reset progress if failed
                } else {
                    // Simulate the different stages of progress
                    if (statusData.status === 'PROCESSING') {
                        setProgress(prev => Math.min(prev + 10, 90)); // Increase progress as processing continues
                        setStatus(`Processing... ${Math.min(progress + 10, 90)}%`);
                    }
                    setTimeout(checkStatus, 5000); // Retry after 5 seconds
                }
            };

            // Start the status check loop
            checkStatus();
        } catch (error) {
            console.error('Upload error', error);
            setLoading(false);
            setStatus('Error generating model');
            setProgress(0); // Reset progress on error
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f4f4f4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>
                    3D Model Generator
                </h1>

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />

                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: selectedFile && !loading ? '#4CAF50' : '#cccccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: selectedFile && !loading ? 'pointer' : 'not-allowed'
                    }}
                >
                    {loading ? 'Generating...' : 'Generate 3D Model'}
                </button>

                {status && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                        backgroundColor: status.includes('Failed') ? '#ffdddd' : '#ddffdd',
                        border: '1px solid ' + (status.includes('Failed') ? '#ff0000' : '#00ff00'),
                        borderRadius: '4px',
                        textAlign: 'center'
                    }}>
                        {status}
                    </div>
                )}

                {loading && (
                    <div style={{ marginTop: '1rem', width: '100%' }}>
                        <div style={{
                            height: '10px',
                            backgroundColor: '#ddd',
                            borderRadius: '5px',
                            width: '100%'
                        }}>
                            <div style={{
                                height: '100%',
                                backgroundColor: '#4CAF50',
                                width: `${progress}%`,
                                borderRadius: '5px',
                            }}></div>
                        </div>
                        <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                            {progress}% {status.includes('Processing') ? 'Processing...' : 'Complete'}
                        </p>
                    </div>
                )}
            </div>

            {modelUrl && (
                <div style={{
                    marginTop: '2rem',
                    width: '100%',
                    maxWidth: '800px',
                    height: '500px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src={modelUrl}
                        alt="Generated 3D Model"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Dtrial;
