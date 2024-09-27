import React, { useState } from 'react';
import axios from 'axios';

const RunPythonScript = () => {
    // State to hold the output of the Python script
    const [output, setOutput] = useState('');

    const handleButtonClick = async () => {
        try {
            const response = await axios.get('http://localhost:5000/run-script');
            console.log('Output:', response.data.output);
            setOutput(response.data.output); // Set the output state
        } catch (error) {
            console.error('Error running script:', error);
            setOutput('Error running script'); // Optional: Set an error message in the output
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <button 
                onClick={handleButtonClick} 
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Run Python Script
            </button>
            {output && (
                <div className="mt-4">
                    <br />
                    <br />
                    <br />
                    <br />
                    <pre>{output}</pre> {/* Display the output here */}
                </div>
            )}
        </div>
    );
};

export default RunPythonScript;
