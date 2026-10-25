import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

        if (!response.ok) {
          throw new Error('Image data not found');
        }

        const data = await response.json();
        const folderPath = `/images/gallery/${eventTitle}`;

        setGalleryTitle(data.title);
        setGallerySubTitle(data.subtitle);

        const imageUrls = data.images.map(
          (filename) => `${folderPath}/${filename}`
        );

        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [eventTitle]);

  return (
    <>
      <style>
        {`
          .events-gallery-header {
            padding-top: 20vh;
            padding-bottom: 15rem;
            height: 20rem;
            padding-top: 10rem;
            background-size: cover;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
          }

          .events-gallery-header h1 {
            font-size: 3rem;
            font-weight: 800;
            font-family: Poppins, sans-serif;
            text-align: center;
            color: #ddd;
            margin: 0 20px;
            min-width: 30rem;
            padding-bottom: 20px;
          }

          .events-gallery-header p {
            font-family: Poppins, sans-serif;
            font-size: 1.2rem;
            text-align: center;
            color: #ddd;
            width: 70%;
            margin: auto;
            min-width: 30rem;
          }

          .image-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            width: 100vw;
            padding: 0 2vw;
            justify-content: center;
            align-items: center;
            padding-bottom: 20vh;
          }

          .image-grid-item img {
            height: 24vw;
            width: 30vw;
            border-radius: 10px;
            object-fit: cover;
          }

          .image-grid-item {
            justify-self: center;
            align-self: center;
            width: 30vw;
            height: 24vw;
          }

          @media (max-width: 480px) {
            .image-grid-item img {
              height: 60vw;
              width: 80vw;
            }

            .image-grid-item {
              width: 80vw;
              height: 30vw;
              margin: 10vh 0;
            }
          }
        `}
      </style>

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