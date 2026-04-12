"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export function ImageGallery({ images }: { images: any[] }) {
  const [selectedImage, setSelectedImage] = useState(
    images?.[0]?.url || "/placeholder.png"
  );
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={imageContainerRef}
        className="relative aspect-square w-full border rounded-2xl bg-white overflow-hidden shadow-sm"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={selectedImage}
          alt="Product View"
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {showZoom && (
          <div
            className="absolute rounded-full border-2 border-white shadow-lg overflow-hidden pointer-events-none z-50"
            style={{
              left: `${zoomPosition.x}%`,
              top: `${zoomPosition.y}%`,
              width: "150px",
              height: "150px",
              transform: "translate(-50%, -50%)",
              backgroundImage: `url(${selectedImage})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: "300%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "white",
            }}
          />
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images?.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(img.url)}
            onMouseEnter={() => setSelectedImage(img.url)}
            className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-lg transition-all overflow-hidden ${
              selectedImage === img.url ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image 
              src={img.url} 
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="80px"
              className="object-contain p-1" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}