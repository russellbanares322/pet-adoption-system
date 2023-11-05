import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useFetchPets } from "../../api/pets/pets";

const Featured = () => {
  const navigate = useNavigate();
  const { data: petsData } = useFetchPets();
  const emptyPetsData = petsData?.length === 0;

  return (
    <div className="my-10 pt-3 pb-16 bg-whitesmoke">
      <div className="container">
        <p className="section-title">Featured Pets</p>
        {!emptyPetsData && (
          <p
            onClick={() => navigate("/pets")}
            className="text-medium py-3 flex items-center gap-2 justify-end cursor-pointer w-max ml-auto"
          >
            View more <HiOutlineArrowNarrowRight />
          </p>
        )}
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
          {!emptyPetsData &&
            petsData?.slice(0, 3)?.map((pet) => (
              <div
                className="hover:-translate-y-3 duration-150 ease-in-out relative"
                key={pet.id}
              >
                <img
                  className="object-cover rounded-lg border-l-4 border-b-4 border-b-maroon border-l-maroon h-96 w-full"
                  src={pet.petImage}
                />
                <div className="absolute top-1 left-0 bg-maroon text-white px-5 rounded-br-full rounded-tl-lg">
                  <p className="text-2xl">{pet.petName}</p>
                </div>
              </div>
            ))}
        </div>
        {emptyPetsData && (
          <h1 className="text-center text-lg">
            No featured pets to be displayed yet...
          </h1>
        )}
      </div>
    </div>
  );
};

export default Featured;
