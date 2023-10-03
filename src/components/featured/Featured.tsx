import { dummyFeatured } from "./dummy-featured";
import { HiOutlineEye, HiOutlineArrowNarrowRight } from "react-icons/hi";

const Featured = () => {
  return (
    <div className="my-10 pt-3 pb-16 bg-whitesmoke">
      <div className="container">
        <p className="section-title">Featured Pets</p>
        <p className="text-medium py-3 flex items-center gap-2 justify-end cursor-pointer w-max ml-auto">
          View more <HiOutlineArrowNarrowRight />
        </p>
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
          {dummyFeatured.map((pet) => (
            <div className="relative group" key={pet.id}>
              <img
                className="object-cover rounded-lg border-l-4 border-b-4 border-b-maroon border-l-maroon"
                src={pet.img}
              />
              <div className="rounded-lg cursor-pointer bg-black/50 absolute text-white top-0 left-0 w-full flex-col h-full flex justify-center items-center opacity-0 group-hover:opacity-100">
                <HiOutlineEye size={45} />
                <p>View Details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
