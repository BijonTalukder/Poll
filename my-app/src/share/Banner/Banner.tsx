import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerCard from "./BannerCard";
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="px-5">
      <Slider {...settings}>
        <BannerCard />
        <BannerCard />
        <BannerCard />
        <BannerCard />
      </Slider>
    </div>
  );
};

export default Banner;
