import React, { useState, useEffect } from 'react';
import './ImageGrid.css';
import Particless from '../../Common/Particles/Particless.js';

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = () => {
      const imageUrls = Array.from({ length: 10 }, () => {
        const width = 400;
        const height = 400;
        return `https://picsum.photos/${width}/${height}`;
      });
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="events-gallery-header">
        <h1>Unforgettable</h1>
        <p>
          Ooh, like we in a hurry No, no I won't tell nobody You're on your
          level too Tryna do what lovers do
        </p>
      </div>

      <div className="image-grid">
        {images.map((url, index) => (
          <div key={index} className="image-grid-item">
            <img src={url} alt={`Random Image ${index + 1}`} />
          </div>
        ))}

        <Particless />
      </div>
    </>
  );
};

export default ImageGrid;