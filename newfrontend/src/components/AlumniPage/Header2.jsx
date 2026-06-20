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
    <div className={`h-120 bg-cover shadow-[0px_2px_10px_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    style={{ paddingTop: '10rem'}}>
			<div 
                className='font-[Poppins, sans-serif] text-[4rem] font-bold text-center text-white'
                style={{fontFamily : 'Poppins, sans-serif'}}>
                OUR ALUMNI NETWORK
            </div>

			<div
                className='text-[1.2rem] text-center text-[#ddd] w-1/2 min-w-120 m-auto'
			    style={{fontFamily : 'Poppins, sans-serif'}}>
				Meet the distinguished alumni of Kharagpur Data Analytics Group and discover the impact they've made in the world of Machine Learning and Artificial Intelligence.
			</div>
		</div>
    </>
  );
};

export default Header2
