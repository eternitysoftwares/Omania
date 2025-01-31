import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText, MessageSquare } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bot className="w-8 h-8" />
          <span className="text-xl font-bold">Omania</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            to="/chat"
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Chat with your documents using AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Upload your PDFs and documents, then chat with them naturally. Get instant answers and insights from your files.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
          >
            Start Chatting
            <MessageSquare className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <FileText className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Any Document</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Support for PDFs, Word documents, and more. Easy drag-and-drop upload.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <MessageSquare className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Natural Conversations</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Chat naturally with your documents. Ask questions and get instant answers.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <Bot className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced AI understanding provides accurate and contextual responses.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};