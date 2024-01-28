import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type ImageSliderProps = {
  images: string[] | undefined;
};

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const imagesData = images!;
  const lastImageIndex = imagesData?.length - 1;
  const selectedImagePreview = imagesData[selectedImageIndex];

  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const nextImg = () => {
    const isSelectedImageIndexEnd = selectedImageIndex === lastImageIndex;

    if (isSelectedImageIndexEnd) {
      return setSelectedImageIndex(0);
    }

    return setSelectedImageIndex((prevIndex) => prevIndex + 1);
  };

  const prevImg = () => {
    const isSelectedImageIndexStart = selectedImageIndex === 0;

    if (isSelectedImageIndexStart) {
      return setSelectedImageIndex(lastImageIndex);
    }

    return setSelectedImageIndex((prevIndex) => prevIndex - 1);
  };

  const isImageSelected = (index: number) => {
    if (selectedImageIndex === index) {
      return true;
    }

    return false;
  };

  return (
    <div className="relative">
      {/* Selected image preview */}
      <img
        alt="Image preview"
        className="rounded-md object-cover h-80 w-full bg-center"
        src={selectedImagePreview}
      />
      {/* Image options */}
      <div className="flex items-start mt-2 gap-2">
        {images?.map((image, index) => (
          <img
            onClick={() => selectImage(index)}
            alt="Image options"
            className={`rounded-md object-cover h-20 w-20 bg-center ${
              isImageSelected(index) ? "border border-black" : "border-none"
            } cursor-pointer`}
            src={image}
          />
        ))}
      </div>
      <div className="flex justify-between items-center w-full absolute top-36 px-2">
        <button
          onClick={prevImg}
          className="bg-black/60 hover:bg-black/70 rounded-full"
        >
          <HiChevronLeft className="text-white mx-auto" size={40} />
        </button>
        <button
          onClick={nextImg}
          className="bg-black/60 hover:bg-black/70 rounded-full"
        >
          <HiChevronRight className="text-white mx-auto" size={40} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
