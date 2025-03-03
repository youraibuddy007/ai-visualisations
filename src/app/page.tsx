import Link from 'next/link';
import Head from "next/head";

export default function LandingPage() {
  return (
    <>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
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
    </>
  );
}
