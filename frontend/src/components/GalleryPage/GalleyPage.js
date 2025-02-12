import Particless from '../Common/Particles/Particless';
import Carousel from './Carousel/Carousel';
import Header from './Header/Header';
import './Carousel/css/embla.css';

const OPTIONS = { loop: true, containScroll: false };
const SLIDES = [
  { title: "KDSH 25", image: "images/gallery/kdsh-25/1.jpeg" },
  { title: "KDSH 24", image: "images/gallery/kdsh-24/10.jpg" },
  { title: "KDSH 25", image: "images/gallery/kdsh-25/1.jpeg" },
  { title: "KDSH 24", image: "images/gallery/kdsh-24/10.jpg" }
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
