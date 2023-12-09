import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import house1 from '../assets/house1.jpg'
import house2 from '../assets/house2.jpg'
import house3 from '../assets/house3.jpg'

function CarouselComponent() {
  return (
    <>
      <Carousel width={'60%'} infiniteLoop={true} autoPlay={true} autoFocus={true} interval={2500} className="flex flex-col items-center mt-2" showThumbs={false}>
        <div>
          <img src={house1} />
          <p className="legend">House 1</p>
        </div>
        <div>
          <img src={house2} />
          <p className="legend">House 2</p>
        </div>
        <div>
          <img src={house3} />
          <p className="legend">House 3</p>
        </div>
      </Carousel>
    </>
  );
}

export default CarouselComponent;
