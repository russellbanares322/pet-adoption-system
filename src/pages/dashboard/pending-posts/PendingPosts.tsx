import { useFetchPendingPets } from "../../../api/pets/pets";
import LoadingSpinner from "../../../global/LoadingSpinner";
import PendingPostsCard from "./PendingPostsCard";

const PendingPost = () => {
  const { data: petsData, isLoading } = useFetchPendingPets();
  const petsDataTotalCount = petsData?.length;
  const isPetsDataEmpty = petsDataTotalCount === 0;

  return (
    <div>
      {!isPetsDataEmpty && (
        <h1 className="text-center text-lg mb-10">
          Total Pending Post:{" "}
          <span className="font-bold">{petsDataTotalCount}</span>
        </h1>
      )}
      {!isLoading && (
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {!isPetsDataEmpty &&
            petsData.map((pet) => <PendingPostsCard key={pet.id} {...pet} />)}
        </div>
      )}
      {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      {!isLoading && isPetsDataEmpty && (
        <h1 className="flex justify-center items-center h-96 font-bold text-lg">
          No pending post yet...
        </h1>
      )}
    </div>
  );
};

export default PendingPost;
