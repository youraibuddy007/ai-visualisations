"use client"
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light text-gray-700 p-6">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Visualizing AI <span className="text-color">Concepts</span>
      </h1>
      <p className="text-lg text-black mb-6 text-center max-w-2xl">
        AI Explained Visually – See It, Understand It.
      </p>
      
      
      <nav className="py-4 space-y-4">

        <Link href="/hallucination" className="block text-xl text-color hover:underline">
        How & Why LLMs hallucinate?
        </Link>
        <Link href="/computer-vision" className="block text-xl text-color hover:underline">
          Computer Vision
        </Link>
      </nav>
    </div>
  );
}
