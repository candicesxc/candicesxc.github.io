import React, { useRef, useState, useEffect } from 'react';

const videos = [
  "/videos/me1.MOV",
  "/videos/me2.mov",
  "/videos/me3.MP4",
  "/videos/me4.MOV"
];

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
    }
  }, [currentIndex]);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="w-full h-full rounded-card overflow-hidden shadow-xl border-4 border-text bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        autoPlay
        playsInline
        onEnded={handleEnded}
      >
        <source src={videos[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
