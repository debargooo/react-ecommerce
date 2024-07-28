import React, { useState, useEffect } from "react";
import BackgroundImage1 from "../../Assets/images/slider_1.jpg";
import BackgroundImage2 from "../../Assets/images/slider_2.jpg";
import BackgroundImage3 from "../../Assets/images/slider_3.jpg";

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
    <div className="relative overflow-hidden h-[70vh]">
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
          <div className="container max-w-[1200px] mx-auto h-full flex items-center px-4">
            <div className="w-1/2 p-4 " data-aos="fade-right">
              <h6 className="text-lg font-medium text-black ">Spring / Summer Collection 2024</h6>
              <h1 className="text-4xl md:text-6xl font-bold my-2 text-black mb-10">Get up to 30% Off New Arrivals</h1>
              <div className="mt-2">
                <a href="#" className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-semibold">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
              <div
                className=" bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image.src})`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hero;
