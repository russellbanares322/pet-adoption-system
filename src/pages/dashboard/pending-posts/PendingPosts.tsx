import { useFetchPendingPostedPets } from "../../../api/pets/pets";
import LoadingSpinner from "../../../global/LoadingSpinner";
import PendingPostsCard from "./PendingPostsCard";

const PendingPost = () => {
  const { data: petsData, isLoading } = useFetchPendingPostedPets();

  return (
    <div>
      {!isLoading && (
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {petsData.length > 0 &&
            petsData.map((pet) => <PendingPostsCard key={pet.id} {...pet} />)}
        </div>
      )}
      {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      {!isLoading && petsData.length === 0 && (
        <h1 className="flex justify-center items-center h-96 font-bold text-lg">
          No pending post yet...
        </h1>
      )}
    </div>
  );
};

export default PendingPost;
