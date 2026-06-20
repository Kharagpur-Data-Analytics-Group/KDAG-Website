import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ImageGrid.css';
import Particless from '../../Common/Particles/Particless.js';

const ImageGrid = () => {
  const { eventTitle } = useParams();
  const [images, setImages] = useState([]);
  const [GalleryTitle, setGalleryTitle] = useState('');
  const [GallerySubTitle, setGallerySubTitle] = useState('');

  useEffect(() => {
    if (!eventTitle) return;

    const fetchImages = async () => {
      try {
        const response = await fetch(`/images/gallery/${eventTitle}/info.json`);
        if (!response.ok) throw new Error('Image data not found');

        const data = await response.json();
        const folderPath = `/images/gallery/${eventTitle}`;

        setGalleryTitle(data.title);
        setGallerySubTitle(data.subtitle);

        // Generate full image URLs
        const imageUrls = data.images.map((filename) => `${folderPath}/${filename}`);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [eventTitle]);

  return (
    <>
      <div className="events-gallery-header">
        <h1>{GalleryTitle}</h1>
        <p>{GallerySubTitle}</p>
      </div>

      <div className="image-grid">
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="image-grid-item">
              <img src={url} alt={`Event ${eventTitle}`} />
            </div>
          ))
        ) : (
          <p>No images available for this event.</p>
        )}
      </div>

      <Particless />
    </>
  );
};

export default ImageGrid;
