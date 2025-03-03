"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

enum ConnectionType {
  Fact = "fact",
  Partial = "partial",
  Hallucination = "hallucination",
}
type Connection = {
  from: number;
  to: number;
  type: ConnectionType;
}
type KnowledgeStep = {
  nodes: any[],
  connections: Connection[],
  explanation: string,
  whyHallucination: string,
}
const KnowledgeConnections = () => {
  const [step, setStep] = useState(0);

  const knowledgeSteps = [
    {
      nodes: [
        { id: 1, x: 150, y: 150, text: "Eiffel Tower", type: "fact" },
        { id: 2, x: 400, y: 150, text: "324 meters", type: "fact" },
      ],
      connections: [
        { from: 1, to: 2, type: "fact" }
      ] as Connection[],
      explanation: "The LLM starts with core facts it's completely certain about - like the Eiffel Tower's height of 324 meters.",
      whyHallucination: "At this stage, there's no hallucination because the model is only using its most confident knowledge - facts that appear consistently across its training data."
    },
    {
      nodes: [
        { id: 1, x: 150, y: 150, text: "Eiffel Tower", type: "fact" },
        { id: 2, x: 400, y: 150, text: "324 meters", type: "fact" },
        { id: 3, x: 150, y: 300, text: "Iron structure", type: "fact" },
        { id: 4, x: 400, y: 300, text: "Needs painting", type: "fact" },
      ],
      connections: [
        { from: 1, to: 2, type: "fact" },
        { from: 1, to: 3, type: "fact" },
        { from: 3, to: 4, type: "fact" }
      ]as Connection[],
      explanation: "It then connects other verified facts - the tower is made of iron and requires regular painting.",
      whyHallucination: "The model is still working with verified information, but it's starting to make connections between facts. This is where hallucinations can begin if the model makes incorrect associations between otherwise true facts."
    },
    {
      nodes: [
        { id: 1, x: 150, y: 150, text: "Eiffel Tower", type: "fact" },
        { id: 2, x: 400, y: 150, text: "324 meters", type: "fact" },
        { id: 3, x: 150, y: 300, text: "Iron structure", type: "fact" },
        { id: 4, x: 400, y: 300, text: "Needs painting", type: "fact" },
        { id: 5, x: 650, y: 300, text: "50 tons paint", type: "partial" }
      ],
      connections: [
        { from: 1, to: 2, type: "fact" },
        { from: 1, to: 3, type: "fact" },
        { from: 3, to: 4, type: "fact" },
        { from: 4, to: 5, type: "partial" }
      ] as Connection[],
      explanation: "When asked about specific details like paint quantity, it connects to less certain information it's seen in training.",
      whyHallucination: "Hallucinations often start here because the model is trying to be helpful by providing specific details. It might have seen various numbers in its training data but can't verify which is current. Like a human trying to remember exact numbers from a book they read long ago, the model might mix up or combine different pieces of information."
    },
    {
      nodes: [
        { id: 1, x: 150, y: 150, text: "Eiffel Tower", type: "fact" },
        { id: 2, x: 400, y: 150, text: "324 meters", type: "fact" },
        { id: 3, x: 150, y: 300, text: "Iron structure", type: "fact" },
        { id: 4, x: 400, y: 300, text: "Needs painting", type: "fact" },
        { id: 5, x: 650, y: 300, text: "50 tons paint", type: "partial" },
        { id: 6, x: 650, y: 150, text: "Every 7 years", type: "hallucination" }
      ],
      connections: [
        { from: 1, to: 2, type: "fact" },
        { from: 1, to: 3, type: "fact" },
        { from: 3, to: 4, type: "fact" },
        { from: 4, to: 5, type: "partial" },
        { from: 5, to: 6, type: "hallucination" }
      ],
      explanation: "Finally, when trying to complete the pattern about maintenance schedule, it might make up a plausible but incorrect timeframe - this is a hallucination.",
      whyHallucination: "This is where complete hallucinations happen. The model, trying to provide a complete answer, fills in gaps with what seems logical based on patterns it's learned. It's similar to how humans might guess the ending of a story based on typical plot patterns - it might make sense, but it isn't necessarily true."
    }
  ];

  const nodeColors = {
    [ConnectionType.Fact]: "border-green-500 bg-green-50",
    [ConnectionType.Partial]: "border-yellow-500 bg-yellow-50",
    [ConnectionType.Hallucination]: "border-red-500 bg-red-50"
  };

  const textColors = {
    [ConnectionType.Fact]: "text-green-700",
    [ConnectionType.Partial]: "text-yellow-700",
    [ConnectionType.Hallucination]: "text-red-700"
  };

  const lineColors = {
    [ConnectionType.Fact]: "stroke-green-500",
    [ConnectionType.Partial]: "stroke-yellow-500",
    [ConnectionType.Hallucination]: "stroke-red-500"
  };

  const renderConnections = () => {
    return knowledgeSteps[step].connections.map((conn, idx) => {
      const from = knowledgeSteps[step].nodes.find(n => n.id === conn.from);
      const to = knowledgeSteps[step].nodes.find(n => n.id === conn.to);
      const x = (lineColors as any)[conn.type];

      return from && to && (
        <motion.line
          key={`${from.id}-${to.id}`}
          x1={from.x + 100}
          y1={from.y + 20}
          x2={to.x + 100}
          y2={to.y + 20}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          className={`${ x || "stroke-black"} stroke-2`}
        />
      );
    });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl">
      <div className="mb-6">
        <h2 className="text-2xl text-center text-color font-bold mb-4">How and Why LLMs Hallucinate</h2>
        {/*<div className="bg-blue-50 p-4 rounded-lg">
           <h3 className="font-bold mb-2 text-gray-700 flex items-center gap-2">
            <Info className="text-black-700" />
            Why do AI models hallucinate?
          </h3>
          <p className="text-gray-700">
            LLMs hallucinate because they're pattern-matching machines, not knowledge databases. They try to complete patterns they've seen in their training, sometimes filling gaps with plausible but incorrect information. It's similar to how humans might confidently misremember details of a story they read long ago.
          </p> 
        </div>*/}
      </div>

      <div className="relative w-full h-96 border rounded-lg bg-white mb-6">
        <svg className="w-full h-full">
          {renderConnections()}
          {knowledgeSteps[step].nodes.map((node) => (
            <foreignObject
              key={node.id}
              x={node.x}
              y={node.y}
              width="200"
              height="40"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`h-full flex items-center justify-center border-2 rounded px-4 ${nodeColors[node.type]} ${textColors[node.type]}`}
              >
                {node.text}
              </motion.div>
            </foreignObject>
          ))}
        </svg>
      </div>

      <div className="space-y-4 bg-light text-gray-700 p-4 rounded-lg mb-6">
        <div>
          <h4 className="font-bold">What's happening:</h4>
          <p className="text-lg">{knowledgeSteps[step].explanation}</p>
        </div>
        <div>
          <h4 className="font-bold">Why hallucinations can occur here:</h4>
          <p className="text-lg ">{knowledgeSteps[step].whyHallucination}</p>
        </div>
      </div>

      <div className="flex text-gray-700 justify-between items-center">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className="px-4 py-2 bg-light rounded disabled:opacity-50"
          disabled={step === 0}
        >
          Previous Step
        </button>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-50 border-2 border-green-500 rounded" />
            <span>Verified Facts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-50 border-2 border-yellow-500 rounded" />
            <span>Partial Knowledge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-50 border-2 border-red-500 rounded" />
            <span>Potential Hallucination</span>
          </div>
        </div>

        <button
          onClick={() => setStep(Math.min(knowledgeSteps.length - 1, step + 1))}
          className="px-4 py-2 bg-dark text-white rounded disabled:opacity-50"
          disabled={step === knowledgeSteps.length - 1}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default KnowledgeConnections;