import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaRobot, FaUser, FaSyncAlt, FaComments } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Make sure @tailwindcss/typography is installed and added to tailwind.config.js plugins

const ChatWithAI = ({ userData, dietPlane, healthInfo, onPlanUpdate }) => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [mode, setMode] = useState('discuss'); // 'discuss' or 'change'
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const newChat = [...chat, { sender: 'user', text: userInput, mode }];
    setChat(newChat);
    setUserInput('');
    setAiLoading(true);
    try {
      if (mode === 'discuss') {
        const res = await axios.post(`https://ai-diet-planner-dcal.onrender.com/api/v2/diet/ask-ai`, {
          question: userInput,
          user: userData,
          dietPlane,
          healthInfo
        }, { withCredentials: true });
        setChat([...newChat, { sender: 'ai', text: res.data.answer, mode }]);
      } else if (mode === 'change') {
        const res = await axios.post(`https://ai-diet-planner-dcal.onrender.com/api/v2/diet/change-plan`, {
          changeRequest: userInput,
          user: userData,
          dietPlane,
          healthInfo
        }, { withCredentials: true });
        setChat([...newChat, { sender: 'ai', text: 'Diet plan updated successfully! Here is your new plan:', mode }]);
        if (res.data.updatedPlan && onPlanUpdate) {
          onPlanUpdate(res.data.updatedPlan);
        }
      }
    } catch (e) {
      setChat([...newChat, { sender: 'ai', text: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, aiLoading]);

  return (
    <div className="flex flex-col h-[32rem] max-h-[80vh]">
      {/* Mode Switcher */}
      <div className="flex gap-2 mb-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow transition border ${mode === 'discuss' ? 'bg-green-500 dark:bg-lime-600 text-white border-green-500 dark:border-lime-600' : 'bg-white dark:bg-gray-800 text-green-700 dark:text-lime-300 border-green-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700'}`}
          onClick={() => setMode('discuss')}
          disabled={aiLoading}
        >
          <FaComments /> Discuss
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow transition border ${mode === 'change' ? 'bg-lime-500 dark:bg-green-600 text-white border-lime-500 dark:border-green-600' : 'bg-white dark:bg-gray-800 text-lime-700 dark:text-green-300 border-lime-200 dark:border-gray-700 hover:bg-lime-50 dark:hover:bg-gray-700'}`}
          onClick={() => setMode('change')}
          disabled={aiLoading}
        >
          <FaSyncAlt /> Change the Plan
        </button>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-2 py-4 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow border border-green-100 dark:border-gray-800 mb-4">
        {chat.length === 0 && (
          <div className="text-gray-400 dark:text-gray-500 text-center mt-10">
            {mode === 'discuss' ? 'Ask any question about your diet plan!' : 'Describe what you want to change in your diet plan.'}
          </div>
        )}
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            {msg.sender === 'ai' && (
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-500 dark:text-green-400 text-xl">
                  <FaRobot />
                </div>
                <div className="max-w-[80vw] md:max-w-lg bg-green-50 dark:bg-gray-800 text-green-900 dark:text-gray-200 rounded-2xl px-4 py-3 shadow prose prose-sm prose-table:prose-table prose-green dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </div>
            )}
            {msg.sender === 'user' && (
              <div className="flex items-end gap-2">
                <div className="max-w-[80vw] md:max-w-lg bg-green-500 dark:bg-lime-600 text-white rounded-2xl px-4 py-3 shadow font-sans">
                  {msg.text}
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-lime-600 flex items-center justify-center text-white text-xl">
                  <FaUser />
                </div>
              </div>
            )}
          </div>
        ))}
        {aiLoading && (
          <div className="flex items-center gap-2 text-green-400 dark:text-lime-400 mt-2">
            <FaRobot className="animate-spin" /> AI is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          className="flex-1 px-4 py-2 rounded-full border border-green-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-lime-400 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder={mode === 'discuss' ? 'Ask a question about your diet plan...' : 'Describe your change (e.g., Replace Meal 2 with a high-protein dish)'}
          disabled={aiLoading}
        />
        <button
          onClick={handleSend}
          disabled={aiLoading || !userInput.trim()}
          className={`px-6 py-2 rounded-full font-semibold shadow transition ${mode === 'discuss' ? 'bg-gradient-to-r from-green-500 to-lime-500 dark:from-lime-600 dark:to-green-600 text-white hover:from-green-600 hover:to-lime-600 dark:hover:from-lime-500 dark:hover:to-green-500' : 'bg-gradient-to-r from-lime-500 to-green-500 dark:from-green-600 dark:to-lime-600 text-white hover:from-lime-600 hover:to-green-600 dark:hover:from-green-500 dark:hover:to-lime-500'} disabled:opacity-50`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithAI;