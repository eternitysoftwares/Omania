import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function chatWithDocument(fileContent: string, userMessage: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Create a chat session
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [`Here is the document content: ${fileContent}`],
        },
        {
          role: 'model',
          parts: ['I understand. I will help you with questions about this document.'],
        },
      ],
    });

    // Send the user's message and get a response
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error chatting with Gemini:', error);
    throw error;
  }
}