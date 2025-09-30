import Particless from '../Common/Particles/Particless';
import Carousel from './Carousel/Carousel';
import Header from './Header/Header';
import './Carousel/css/embla.css';

const OPTIONS = { loop: true, containScroll: false };
const SLIDES = [
  { title: "Intra KDAG Hackathon 2025", image: "images/gallery/intra-kdag-hackathon-2025/1.jpeg" },
  { title: "Kharagpur Data Science Hackathon 2025", image: "images/gallery/kharagpur-data-science-hackathon-2025/1.jpeg" },
  { title: "Generative AI Workshop 2025", image: "images/gallery/generative-ai-workshop-2025/1.jpeg" },
  { title: "Intra KDAG Hackathon 2024", image: "images/gallery/intra-kdag-hackathon-2024/1.jpeg" },
  { title: "Kharagpur Data Science Hackathon 2024", image: "images/gallery/kharagpur-data-science-hackathon-2024/10.jpg" }
];

const GalleryPage = () => {
  return (
    <>
      <Header />
      <Carousel slides={SLIDES} options={OPTIONS} />
      <Particless />
    </>
  );
};

export default GalleryPage;
