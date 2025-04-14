import { useState } from 'react';
import api from '../api'; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const token = localStorage.getItem('token'); 

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!userMessage.trim()) return; // Prevent sending empty messages

    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setUserMessage('');
    setLoading(true);

    try {
      const response = await api.post('/chat', {
        message: userMessage,
      }, { 
        headers: { Authorization: `Bearer ${token}` } }); // Ensure you have the token available

      const botReply = response.data.reply;
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error while fetching chatbot response:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Sorry, I encountered an error. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen); 
  };

  const closeChatWindow = () => {
    setIsOpen(false); 
  };

  return (
    <>
    {/* Floating Chat Button */}
    <button
      onClick={toggleChatWindow}
      className={`fixed bottom-6 left-6 w-16 h-16 bg-blue-500 hover:bg-blue-600 active:bg-blue-500 cursor-pointer text-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
      style={{ zIndex: 999 }}
    >
      💬
    </button>

    {/* Chat Window */}
    {isOpen && (
      <div className="fixed bottom-24 left-6 w-96 h-96 bg-white rounded-lg shadow-lg p-4 flex flex-col z-50">
        {/* Close Button */}
        <button
          onClick={closeChatWindow}
          className="absolute top-2 right-2 text-2xl text-red-500 hover:text-red-700 cursor-pointer"
          style={{ zIndex: 999 }}
        >
          &times;
        </button>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto mt-8 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {msg.text.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && <div className="text-center text-gray-500">...</div>}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            className="w-full p-2 border rounded-lg mr-2"
            placeholder="Ask me anything..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 transition-all cursor-pointer text-white p-2 rounded-lg">
            Send
          </button>
        </form>
      </div>
    )}
  </>
);
};

export default Chatbot;

