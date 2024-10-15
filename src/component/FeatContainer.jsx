// import React from 'react';

// function FeatContainer({title, description, imagesrc }) {
//   return (
//     <>
//       <div
//         className="featured-content"
//         style={{
//           backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url(${imagesrc})`,
//         }}
//       >
//         <p className="featured-desc">{title}</p>
//       </div>
//     </>
//   );
// }

// export default FeatContainer;

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function FeatContainer({ title, images = [] ,movieref}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <div className="featured-content">
      <Slider {...settings}>
        {images.map((image, index, movieref,overview) => (
          <div key={index}>
            <a href={`https://goku.sx/search?keyword=${image.movieref}`} className="links" target="_blank">
              <div
              style={{
                height: '100vh',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), #042242),linear-gradient(to left, rgba(0,0,0,0), #042242), url(${image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding:'50px',
              }}
            >
              <p className="featured-desc">{image.title || title}</p>
              <p className="feat-text">{image.overview || overview}</p>
            </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FeatContainer;