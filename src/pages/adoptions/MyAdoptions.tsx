import { useNavigate } from "react-router-dom";
import { useFetchAdoptionsByUserId } from "../../api/adoptions/useFetchMyAdoptions";
import LoadingSpinner from "../../global/LoadingSpinner";
import AdoptionCard from "./AdoptionCard";

const MyAdoptions = () => {
  const navigate = useNavigate();
  const { data: adoptionsData, isLoading } = useFetchAdoptionsByUserId();
  const adoptionsDataTotalCount = adoptionsData?.length;
  const isAdoptionsDataEmpty = adoptionsDataTotalCount === 0;

  return (
    <div className="py-24 bg-whitesmoke min-h-screen h-full">
      <div className="container pt-10">
        {!isAdoptionsDataEmpty && (
          <h1 className="text-lg text-center">
            Total Adoptions:{" "}
            <span className="font-bold">{adoptionsDataTotalCount}</span>
          </h1>
        )}
        {!isLoading && isAdoptionsDataEmpty && (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-lg">
              You currently have no adopted pet yet...
            </h1>
            <button onClick={() => navigate("/pets")} className="button-filled">
              Adopt Pet
            </button>
          </div>
        )}
        {!isLoading && (
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            {adoptionsData?.map((data) => (
              <AdoptionCard key={data.id} {...data} />
            ))}
          </div>
        )}
        {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      </div>
    </div>
  );
};

export default MyAdoptions;
