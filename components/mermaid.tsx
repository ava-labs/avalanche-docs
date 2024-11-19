"use client";
import React, { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
});

type MermaidProps = {
  readonly chart: string;
};

const Mermaid = ({ chart }: MermaidProps): JSX.Element => {
  useEffect(() => mermaid.contentLoaded(), []);

  return <div className="mermaid">{chart}</div>;
};

export default Mermaid;