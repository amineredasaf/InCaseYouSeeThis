'use client';
import { useEffect } from 'react';

export default function NoiseOverlay() {
  useEffect(() => {
    function createNoise() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      const size = 200 + Math.random() * 40; 
      canvas.width = size;
      canvas.height = size;
      
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const rand = Math.random();
        let noise;
        
        if (rand < 0.4) {
          noise = 0;
        } else if (rand < 0.6) {
          noise = 255;
        } else {
          noise = Math.floor(Math.random() * 256);
        }
        
        data[i] = noise;     // R
        data[i + 1] = noise; // G  
        data[i + 2] = noise; // B
        data[i + 3] = Math.random() * 100 + 50;
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      const dataURL = canvas.toDataURL();
      const overlay = document.getElementById('noise');
      if (overlay) {
        overlay.style.backgroundImage = `url(${dataURL})`;
        const bgSize = 150 + Math.random() * 30;
        overlay.style.backgroundSize = `${bgSize}px ${bgSize}px`;
        overlay.style.backgroundPosition = `${Math.random() * 10}px ${Math.random() * 10}px`;
      }
    }
    
    function startNoise() {
      function scheduleNext() {
        const interval = 80 + Math.random() * 40; 
        setTimeout(() => {
          createNoise();
          scheduleNext();
        }, interval);
      }
      scheduleNext();
    }
    
    createNoise();
    startNoise();
    
    return () => {};
  }, []);
  
  return <div className="noise-overlay" id="noise" />;
}