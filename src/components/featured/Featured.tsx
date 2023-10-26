import { dummyFeatured } from "./dummy-featured";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
  return (
    <div className="my-10 pt-3 pb-16 bg-whitesmoke">
      <div className="container">
        <p className="section-title">Featured Pets</p>
        <p
          onClick={() => navigate("/pets")}
          className="text-medium py-3 flex items-center gap-2 justify-end cursor-pointer w-max ml-auto"
        >
          View more <HiOutlineArrowNarrowRight />
        </p>
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
          {dummyFeatured.map((pet) => (
            <div
              className="hover:-translate-y-3 duration-150 ease-in-out"
              key={pet.id}
            >
              <img
                className="object-cover rounded-lg border-l-4 border-b-4 border-b-maroon border-l-maroon"
                src={pet.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
