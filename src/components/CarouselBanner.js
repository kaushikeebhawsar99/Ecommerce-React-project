import React from 'react'
import { Carousel } from'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import carouselImage1 from '../assets/edited/carousel1.png';
import carouselImage2 from '../assets/edited/carousel2.png';
import carouselImage3 from '../assets/edited/carousel3.png';
import carouselImage4 from '../assets/edited/carousel4.png';
import carouselImage5 from '../assets/edited/carousel5.png';
import banner from '../assets/Banner.jpg';

function CarouselBanner() { 
  return (
    <div className="carousel-container" >
      <Carousel  showThumbs={false} autoPlay={true}>
        <div>
          <img src={banner} alt="Banner" />
        </div>
        <div>
          <img src={carouselImage1} alt="Carousel Image 1" />
        </div>
        <div>
          <img src={carouselImage2} alt="Carousel Image 2" />
        </div>
        <div>
          <img src={carouselImage3} alt="Carousel Image 3" />
        </div>
        <div>
          <img src={carouselImage4} alt="Carousel Image 4" />
        </div>
        <div>
          <img src={carouselImage5} alt="Carousel Image 5" />
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselBanner
