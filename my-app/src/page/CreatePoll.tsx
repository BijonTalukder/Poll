import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/polls'; // Change to your backend URL

function CreatePoll() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ title: '' }, { title: '' }]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [hideResults, setHideResults] = useState(false);
  const [expiresIn, setExpiresIn] = useState('24hours');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, { title: '' }]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].title = value;
    setOptions(newOptions);
  };

  const createPoll = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }
    
    const validOptions = options.filter(opt => opt.title.trim());
    if (validOptions.length < 2) {
      setError('Please provide at least 2 options');
      return;
    }
    
    setIsLoading(true);
    setError('');
    let expiresAt;
    const now = new Date();

  if (expiresIn === '1hour') {
    expiresAt = new Date(now.getTime() + 1 * 60 * 60 * 1000); // Add 1 hour
  } else if (expiresIn === '12hours') {
    expiresAt = new Date(now.getTime() + 12 * 60 * 60 * 1000); // Add 12 hours
  } else if (expiresIn === '24hours') {
    expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
  } else {
    setError('Invalid poll duration');
    setIsLoading(false);
    return;
  }
    try {
      const response = await axios.post(`${API_URL}/create`, {
        question: question.trim(),
        options: validOptions.map(opt => ({ title: opt.title.trim() })), // Send the title property as part of the object
        expiresAt,
        hideResults,
        isPrivate
      });
      console.log('Poll created:', response);
      
      navigate(`/poll/${response.data._id}`);
    } catch (error) {
      console.error('Error creating poll:', error);
      setError('Failed to create poll. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-2 rounded-t-lg"></div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Create Anonymous Poll</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={createPoll}>
          <div className="mb-6">
            <label htmlFor="question" className="block mb-2 font-medium dark:text-gray-200">
              Your Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something..."
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium dark:text-gray-200">
              Options
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option.title}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-lg mr-2 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            
            {options.length < 10 && (
              <button
                type="button"
                onClick={addOption}
                className="mt-2 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Option
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="expiresIn" className="block mb-2 font-medium dark:text-gray-200">
                Poll Duration
              </label>
              <select
                id="expiresIn"
                value={expiresIn}
                onChange={(e) => setExpiresIn(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="1hour">1 Hour</option>
                <option value="12hours">12 Hours</option>
                <option value="24hours">24 Hours</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPrivate"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isPrivate" className="ml-2 text-sm dark:text-gray-200">
                Private (accessible only via link)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hideResults"
                checked={hideResults}
                onChange={(e) => setHideResults(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="hideResults" className="ml-2 text-sm dark:text-gray-200">
                Hide results until poll ends
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
          >
            {isLoading ? 'Creating Poll...' : 'Create Poll'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePoll;
