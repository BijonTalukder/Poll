// components/ViewPoll.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/polls'; // Change to your backend URL

function ViewPoll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setPoll(response.data);
        setComments(response.data.comments)
        // Check localStorage to see if user has already voted
        const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '{}');
        if (votedPolls[id]) {
          setHasVoted(true);
          setSelectedOption(votedPolls[id]);
        }
        
        // Fetch comments
        fetchComments();
      } catch (error) {
        console.error('Error fetching poll:', error);
        if (error.response?.status === 404) {
          setError('This poll has expired or doesn\'t exist');
        } else {
          setError('Failed to load poll. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPoll();
    
    // Set up interval for updating time left
    const intervalId = setInterval(updateTimeLeft, 1000);
    
    return () => clearInterval(intervalId);
  }, [id]);
  
  const updateTimeLeft = () => {
    if (!poll?.expiresAt) return;
  console.log(poll?.expiresAt);
  
    let expiration;

    console.log(expiration);
    
    if (typeof poll.expiresAt === "string") {
      console.log("block");
      
      expiration = new Date(poll.expiresAt);
    } else if (poll.expiresAt.seconds) {
      expiration = new Date(poll.expiresAt.seconds * 1000); 
    } else {
      return;
    }
  
    const now = new Date();
    const diff = expiration - now;
  
    if (diff <= 0) {
      setTimeLeft('Expired');
      navigate('/'); // Redirect if expired
    } else {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }
  };
  
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  const submitVote = async () => {
    if (selectedOption === null) return;
    
    try {
      const response = await axios.post(`${API_URL}/${id}/vote`, { optionIndex: selectedOption });
      setPoll(response.data);
      setHasVoted(true);
      
      // Save vote in localStorage
      const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '{}');
      votedPolls[id] = selectedOption;
      localStorage.setItem('votedPolls', JSON.stringify(votedPolls));
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Failed to submit vote. Please try again.');
    }
  };
  
  const addReaction = async (reactionType) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/reaction`, { reactionType });
      setPoll(response.data);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };
  
  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      await axios.post(`${API_URL}/${id}/comments`, { text: newComment.trim() });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };
  
  const copyPollLink = () => {
    const pollLink = window.location.href;
    navigator.clipboard.writeText(pollLink)
      .then(() => {
        setCopySuccess('Link copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
        setCopySuccess('Failed to copy link');
      });
  };
  
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500 border-opacity-50 mx-auto"></div>
        <p className="mt-4 dark:text-white">Loading poll...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl mt-4 font-bold dark:text-white">{error}</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
        >
          Create New Poll
        </button>
      </div>
    );
  }
  
  // Calculate percentages for the progress bars
  const calculatePercentage = (votes) => {
    if (!poll.totalVotes) return 0;
    return (votes / poll.totalVotes) * 100;
  };
  
  // Format date for readability
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-2 rounded-t-lg"></div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold dark:text-white">{poll.question}</h1>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Expires in: <span className="font-semibold">{timeLeft}</span>
            </span>
            <div className="flex mt-2 space-x-2">
              <button
                onClick={() => addReaction('trending')}
                className="flex items-center px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 text-sm hover:bg-orange-200 dark:hover:bg-orange-800 transition"
              >
                🔥 {poll?.reactions?.trending || 0}
              </button>
              <button
                onClick={() => addReaction('like')}
                className="flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition"
              >
                👍 {poll?.reactions?.likes || 0}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total votes: <span className="font-semibold">{poll.totalVotes || 0}</span>
            </span>
          </div>
          
          {poll?.options?.map((option, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="poll-option"
                  checked={selectedOption === index}
                  onChange={() => !hasVoted && setSelectedOption(index)}
                  disabled={hasVoted}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label 
                  htmlFor={`option-${index}`} 
                  className={`ml-2 block text-sm sm:text-base cursor-pointer dark:text-white ${
                    hasVoted && selectedOption === index ? 'font-bold' : ''
                  }`}
                >
                  {option.title}
                </label>
                
                {(!poll.hideResults || hasVoted) && (
                  <span className="ml-auto text-sm font-medium dark:text-white">
                    {option.votes !== null ? `${option.votes} (${Math.round(calculatePercentage(option.votes))}%)` : ''}
                  </span>
                )}
              </div>
              
              {(!poll.hideResults || hasVoted) && (
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      selectedOption === index 
                        ? 'bg-indigo-600 dark:bg-indigo-500' 
                        : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                    style={{ width: `${option.votes !== null ? calculatePercentage(option.votes) : 0}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
          
          {!hasVoted && (
            <button
              onClick={submitVote}
              disabled={selectedOption === null}
              className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium ${
                selectedOption === null
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800'
              }`}
            >
              Vote
            </button>
          )}
          
          {hasVoted && poll.hideResults && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-lg text-sm">
              Results will be visible when the poll ends.
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold dark:text-white">Share Poll</h2>
            <span className="text-xs text-green-600 dark:text-green-400">{copySuccess}</span>
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              readOnly
              value={window.location.href}
              className="flex-grow p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg dark:text-white"
            />
            <button
              onClick={copyPollLink}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-r-lg"
            >
              Copy
            </button>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-bold mb-4 dark:text-white">Comments</h2>
          
          <form onSubmit={submitComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add an anonymous comment..."
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              rows="2"
            ></textarea>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className={`mt-2 py-2 px-4 rounded-lg text-white font-medium ${
                !newComment.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800'
              }`}
            >
              Post Comment
            </button>
          </form>
          
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="dark:text-white">{comment.text}</p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPoll;