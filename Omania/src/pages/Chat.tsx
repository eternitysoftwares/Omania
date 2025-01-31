import React, { useState, useRef, useEffect } from 'react';
import { Bot, FileUp, Send, X, RefreshCw } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { chatWithDocument } from '../lib/gemini';

export const Chat = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !fileContent) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsLoading(true);
    try {
      const response = await chatWithDocument(fileContent, userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen flex bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <span className="font-bold text-lg">Omania</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Clear chat history"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="flex-1 p-4">
          {!selectedFile ? (
            <div className="h-full flex items-center justify-center">
              <label className="flex flex-col items-center cursor-pointer p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                <FileUp className="w-12 h-12 mb-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Upload a document<br />to start chatting
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          ) : (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Current Document</h3>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setFileContent('');
                  }}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="truncate">
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`
                    max-w-[70%] p-4 shadow-sm
                    ${message.role === 'user'
                      ? 'bg-black text-white dark:bg-white dark:text-black rounded-[20px] rounded-tr-[5px]'
                      : 'bg-white dark:bg-gray-700 rounded-[20px] rounded-tl-[5px]'
                    }
                  `}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-4 bg-white dark:bg-gray-700 rounded-[20px] rounded-tl-[5px] shadow-sm animate-pulse">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={selectedFile ? "Ask a question about your document..." : "Upload a document to start chatting"}
                className="flex-1 p-3 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                disabled={!selectedFile || isLoading}
              />
              <button
                type="submit"
                disabled={!selectedFile || !input.trim() || isLoading}
                className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};