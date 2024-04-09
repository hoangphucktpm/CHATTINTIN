import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setIsListening(true);
    // Your code to start listening for speech
  };

  const stopListening = () => {
    setIsListening(false);
    // Your code to stop listening for speech
  };

  useEffect(() => {
    // Your code to handle speech recognition
    // Update transcript state with recognized speech
  }, [isListening]); // Run effect whenever isListening state changes

  return { transcript, startListening, stopListening, isListening };
};

export default useSpeechRecognition;
