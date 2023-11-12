import { useFetchApplicationsByRecipientId } from "../../../api/adoptions/adoptions";
import LoadingSpinner from "../../../global/LoadingSpinner";
import PendingApplicationsCard from "./PendingApplicationsCard";

const PetAdoption = () => {
  const { data: applicationsData, isLoading } =
    useFetchApplicationsByRecipientId();
  const applicationDataTotalCount = applicationsData?.length;
  const isAdoptionsDataEmpty = applicationDataTotalCount === 0;

  return (
    <div>
      {!isAdoptionsDataEmpty && (
        <h1 className="text-center text-lg mb-10">
          Total Adoption Applications To Be Reviewed:{" "}
          <span className="font-bold">{applicationDataTotalCount}</span>
        </h1>
      )}
      {!isLoading && (
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 w-full">
          {!isAdoptionsDataEmpty &&
            applicationsData.map((data) => (
              <PendingApplicationsCard key={data.id} {...data} />
            ))}
        </div>
      )}
      {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      {!isLoading && isAdoptionsDataEmpty && (
        <h1 className="flex justify-center items-center h-96 font-bold text-lg">
          No pending adoption applications yet...
        </h1>
      )}
    </div>
  );
};

export default PetAdoption;
