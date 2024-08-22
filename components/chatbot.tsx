"use client";
import React, { useEffect } from 'react';

interface KapaWidgetProps {
  websiteId: string;
  projectName: string;
  projectColor: string;
  projectLogo: string;
}

const Chatbot: React.FC<KapaWidgetProps> = ({ websiteId, projectName, projectColor, projectLogo }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.kapa.ai/kapa-widget.bundle.js";
    script.setAttribute("data-website-id", websiteId);
    script.setAttribute("data-project-name", projectName);
    script.setAttribute("data-project-color", projectColor);
    script.setAttribute("data-project-logo", projectLogo);
    script.setAttribute("data-user-analytics-fingerprint-enabled", "true");
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [websiteId, projectName, projectColor, projectLogo]);

  return null;
};

export default Chatbot;

