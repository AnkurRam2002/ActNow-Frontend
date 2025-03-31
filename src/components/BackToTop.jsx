import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { TiArrowUpThick } from "react-icons/ti";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-5 right-5 z-1000">
            {isVisible && 
                <button onClick={scrollToTop} className="text-white text-2xl py-3.5 px-3.5 flex items-center justify-center bg-[#463E3E] rounded-full">
                    <TiArrowUpThick />
                </button>
            }
        </div>
    );
};

export default BackToTop;