"use client" 

import React, { useState, useEffect } from 'react';
import Image from "next/image";

const PatternRecognitionDemo = () => {
  const [step, setStep] = useState(0);
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === 0) {
      const scanTimer = setInterval(() => {
        setScanPosition((prev) => {
          if (prev >= 120) return 0;
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(scanTimer);
    } else {
      console.log("Setting 0")
      setScanPosition(0);
    }
  }, [step]);

  const objects = [
    { type: 'cup', confidence: 98.5, x: 8, y: 60, height: 155, width: 130 },
    { type: 'laptop', confidence: 96.2, x: 16, y: 2,  height: 380, width: 432 },
    { type: 'phone', confidence: 94.8, x: 87, y: 46, height: 112, width: 81 },
    { type: 'Notebook', confidence: 93.8, x: 71, y: 37, height: 162, width: 179 }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light text-gray-700">
      <div className=" space-y-6">
        {/* Stage display */}
        <h2 className="text-2xl text-center text-color font-bold mb-4">
          Stage {step + 1}: {
            ['Initial Scene', 'Edge Detection', 'Feature Analysis', 'Object Recognition'][step]
          }
        </h2>

        {/* Main visualization area */}
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          {/* Base objects - always visible */}
          <div className="absolute inset-0">
          <Image
          className="dark:invert"
          src="/image.jpg"
          alt="Demo Image"
          width={640}
          height={480}
          priority
        />
            
          </div>

          {/* Scanning effect */}
          {step === 0 && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-white-500/10" />
              <div
                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-blue-400/40 via-blue-400/20 to-transparent transition-all duration-40"
                style={{ left: `${scanPosition}%` }}
              />
            </div>
          )}

          {/* Edge detection */}
          {step === 1 && (
            <div className="absolute inset-0">
              {objects.map((obj, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                  }}
                >
                  <div style={{
                    height: `${obj.height}px`,
                    width: `${obj.width}px`
                  }} className="border-2 border-white-500 rounded-md  animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {/* Feature analysis */}
          {step === 2 && (
            <div className="absolute inset-0">
              {objects.map((obj, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`
                  }}
                >
                  <div className="relative" style={{
                    height: `${obj.height}px`,
                    width: `${obj.width}px`
                  }}>
     
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-md" />
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-75" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-150" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Object recognition */}
          {step === 3 && (
            <div className="absolute inset-0">
              {objects.map((obj, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`
                  }}
                >
                  <div className="relative" style={{
                    height: `${obj.height}px`,
                    width: `${obj.width}px`
                  }}>
                    <div className="absolute inset-0 border-2 border-green-500 rounded-md" />
                    <div className="absolute -top-0 left-0 bg-green-500 text-blue text-xs px-2 py-1 rounded">
                      {obj.type} <br/>({obj.confidence}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> 
  

        {/* Stage description */}
        <div className="text-sm text-center text-gray-600">
          {step === 0 && (
            "Initial scanning of the image, processing pixel data to identify potential objects..."
          )}
          {step === 1 && (
            "Detecting edges and boundaries around potential objects in the scene..."
          )}
          {step === 2 && (
            "Analyzing key features and patterns within each detected region..."
          )}
          {step === 3 && (
            "Final stage: Identifying objects with confidence scores based on learned patterns"
          )}
        </div>
      </div>
    </div>
  );
};


export default function Page() {
 
  return (
    <div>
      <PatternRecognitionDemo />
    </div>
  )
}

