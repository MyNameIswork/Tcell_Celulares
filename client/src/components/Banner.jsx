import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Banner({ images }) {
  const swiperRef = useRef(null);
  const [isSingleImage, setIsSingleImage] = useState(false);

  useEffect(() => {
    setIsSingleImage(images.length <= 1); // Define como true se houver 0 ou 1 imagem
  }, [images]);

  return (
    <section className="w-full max-w-full md:h-auto overflow-hidden rounded-2xl">
      <div className="w-full h-auto flex justify-center items-center">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          loop={!isSingleImage} // Desativa o loop se houver 0 ou 1 imagem
          spaceBetween={0}
          slidesPerView={1}
          onMouseEnter={() => swiperRef.current?.swiper?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.swiper?.autoplay.start()}
          navigation={!isSingleImage} // Já estava correto
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Link to={image.link} target="_blank" rel="noopener noreferrer">
                <div className="w-full h-full overflow-hidden rounded-2xl">
                  <img
                    className="w-full h-full object-cover rounded-2xl"
                    src={image.photo}
                    alt={`Slide ${index}`}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

Banner.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      photo: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
