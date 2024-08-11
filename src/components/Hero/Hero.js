import React, { useState, useEffect } from "react";
import BackgroundImage1 from "../../Assets/images/img1.jpg";
import BackgroundImage2 from "../../Assets/images/img2.jpg";
import BackgroundImage3 from "../../Assets/images/img3.jpg";
import Search from "../Search/Search";

const images = [
  { id: 1, src: BackgroundImage1, alt: "Slider 1" },
  { id: 2, src: BackgroundImage2, alt: "Slider 2" },
  { id: 3, src: BackgroundImage3, alt: "Slider 3" },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <Search />
      <div className="relative overflow-hidden sm:h-[70vh] h-[50vh]">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container max-w-[1200px] mx-auto h-full flex items-center px-2 sm:px-4">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative w-1/2 p-2 sm:p-4" data-aos="fade-right">
                <h6 className="sm:text-2xl font-medium text-[1rem] text-white mb-8">
                  Spring / Summer Collection 2024
                </h6>
                <h1 className="text-[1.4rem] md:text-7xl font-semibold my-2 text-white mb-10">
                  Get up to 30% Off New Arrivals
                </h1>
                <div className="mt-2">
                  <a
                    href="#"
                    className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-semibold"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Hero;
