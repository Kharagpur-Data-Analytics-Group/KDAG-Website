import Reac, { useState, useEffect } from 'react';

const Header2 = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);



  return (
    <>
    <div className={`!h-120 !pt-40 bg-cover shadow-[0px_2px_10px_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
			<div 
            className='font-[Poppins, sans-serif] text-[4rem] font-bold text-center text-white'
            >
                OUR ALUMNI NETWORK
            </div>

			<div
                className='font-[Poppins, sans-serif] text-[1.2rem] text-center text-[#ddd] w-1/2 min-w-120 m-auto'
			>
				Meet the distinguished alumni of Kharagpur Data Analytics Group and discover the impact they've made in the world of Machine Learning and Artificial Intelligence.
			</div>
		</div>
    </>
  );
};

export default Header2
