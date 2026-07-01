import React, { useState, useEffect } from 'react';

interface PropertyImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
}

export const PropertyImageSlider: React.FC<PropertyImageSliderProps> = ({ images, alt, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className={`bg-zinc-200 ${className}`} />;
  }

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {images.map((img, idx) => (
        <img
          key={`${img}-${idx}`}
          src={img}
          alt={`${alt} - Slide ${idx + 1}`}
          loading={idx === 0 ? "lazy" : undefined}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } group-hover:scale-105 transition-transform`}
        />
      ))}
    </div>
  );
};
