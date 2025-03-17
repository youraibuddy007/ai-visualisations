"use client"
import React, { useState, useEffect } from 'react';
import { Dice3 } from 'lucide-react';
import { div } from 'framer-motion/client';

const WordPredictionVisualizer = () => {
  const [prompt, setPrompt] = useState("The cat sat on the");
  const [predictions, setPredictions] = useState([
    { word: "mat", probability: 0.35 },
    { word: "floor", probability: 0.25 },
    { word: "chair", probability: 0.15 },
    { word: "carpet", probability: 0.12 },
    { word: "bed", probability: 0.08 },
    { word: "table", probability: 0.05 }
  ]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 800);
    return () => clearTimeout(timer);
  }, [predictions]);

  const brandColor = "#ca5139";
  
  const renderProbabilityBar = (probability: any, index: number) => {
    return (
      <div className="h-2 rounded overflow-hidden">
        <div 
          className={`h-full rounded transition-all duration-800 ease-out ${animate ? 'animate-progress' : ''}`}
          style={{ 
            width: `${probability * 100}%`, 
            backgroundColor: brandColor,
            animation: animate ? `growWidth 800ms ease-out ${index * 100}ms` : 'none'
          }}
        ></div>
      </div>
    );
  };

  const shufflePredictions = () => {
    const shuffled = [...predictions].sort(() => Math.random() - 0.5);
    setPredictions(shuffled);
  };

  return (
    <div className="flex items-center h-screen max-w-4xl">
    <div className="flex-row rounded-lg self-center max-w-3xl mx-auto" style={{ backgroundColor: `${brandColor}5` }}>
      <div className="flex items-center mb-6">
        <span className="text-xl mr-2" style={{ color: brandColor }}>Prompt:</span>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow border p-2 rounded"
          style={{ borderColor: `${brandColor}40` }}
        />
        <button 
          onClick={shufflePredictions}
          className="ml-2 p-2 rounded hover:bg-opacity-70 transition-colors"
          style={{ backgroundColor: `${brandColor}20` }}
        >
          <Dice3 style={{ color: brandColor }} />
        </button>
      </div>
      <div className="shadow rounded p-6" style={{ backgroundColor: 'white' }}>
        <h3 className="font-bold mb-3" style={{ color: brandColor }}>Predicted Next Words</h3>
        {predictions.map((prediction, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-center">
              <span className="font-mono">{prediction.word}</span>
              <span className="text-sm" style={{ color: `${brandColor}` }}>
                {(prediction.probability * 100).toFixed(1)}%
              </span>
            </div>
            {renderProbabilityBar(prediction.probability, index)}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm" style={{ color: `${brandColor}` }}>
        <p>💡 LLMs predict the next word by calculating probabilities from training data.</p>
        <p>Each prediction is a statistical guess, not "thinking".</p>
      </div>
    </div>
    </div>
  );
};

export default WordPredictionVisualizer;