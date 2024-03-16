
import { Carousel } from 'flowbite-react';

interface CarouselFlowProps {
  src: string[];
}

const CarouselFlow = ({ src }: CarouselFlowProps) => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-[512px] bg-opacity-0">
      <Carousel leftControl=" " rightControl=" " indicators={false} slideInterval={1000}>
        {src.map((url, index) => (
          <img className='overflow-hidden' key={index} src={url} alt={`Image ${index}`} />
        ))}
      </Carousel>
    </div>
  );
}
export default CarouselFlow;
