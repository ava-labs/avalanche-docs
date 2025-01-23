"use client";
import React, { useEffect } from 'react';

const COOKBOOK_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmJlNDZhZDZkMjk4YjBkZjY5OWExMTgiLCJpYXQiOjE3MjM3NDU5NjUsImV4cCI6MjAzOTMyMTk2NX0.YRFXnhY4r8Z3it93zRzBenOL3oBPtD96tGYYl-USX2o"
const Chatbot: React.FC = () => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let script = document.getElementById('__cookbook-script') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@cookbookdev/docsbot/dist/standalone/index.cjs.js';
        script.id = '__cookbook-script';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <div id="__cookbook" data-api-key={COOKBOOK_API_KEY} />
  );
};

export default Chatbot;