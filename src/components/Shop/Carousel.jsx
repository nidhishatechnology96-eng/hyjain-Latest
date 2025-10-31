import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);
    
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        if (images && images.length > 1) {
            const slideInterval = setInterval(goToNext, 4000);
            return () => clearInterval(slideInterval);
        }
    }, [goToNext, images]);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="carousel-container">
            <div className="carousel-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
            <button className="carousel-btn prev" onClick={goToPrevious}>&#10094;</button>
            <button className="carousel-btn next" onClick={goToNext}>&#10095;</button>
            <div className="carousel-dots">
                {images.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(slideIndex)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;