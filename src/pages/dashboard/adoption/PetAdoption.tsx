import { useFetchApplicationsByRecipientId } from "../../../api/adoptions/adoptions";
import LoadingSpinner from "../../../global/LoadingSpinner";
import PendingApplicationsCard from "./PendingApplicationsCard";
import CountUp from "react-countup";

const PetAdoption = () => {
  const { data: applicationsData, isLoading } =
    useFetchApplicationsByRecipientId();
  const applicationDataTotalCount = applicationsData?.length;
  const toBeReviewedApplicationTotalCount = applicationsData?.filter(
    (data) => data.status.toLowerCase() === "to be reviewed"
  ).length;
  const approvedApplicationTotalCount = applicationsData?.filter(
    (data) => data.status.toLowerCase() === "approved"
  ).length;
  const rejectedApplicationTotalCount = applicationsData?.filter(
    (data) => data.status.toLowerCase() === "rejected"
  ).length;
  const isAdoptionsDataEmpty = applicationDataTotalCount === 0;

  const applicationsStatus = [
    {
      status: "Pending",
      count: toBeReviewedApplicationTotalCount,
      bgColor: "#FE6F45",
    },
    {
      status: "Approved",
      count: approvedApplicationTotalCount,
      bgColor: "#52C41A",
    },
    {
      status: "Rejected",
      count: rejectedApplicationTotalCount,
      bgColor: "#FF4D4F",
    },
  ];

  return (
    <div>
      {!isLoading && !isAdoptionsDataEmpty && (
        <div className="flex flex-col items-center justify-center gap-3 mb-10">
          <h1 className="text-lg">Applications Status:</h1>
          <div className="flex items-center justify-center gap-4">
            {applicationsStatus?.map((data) => (
              <div
                className="flex flex-col items-center justify-center"
                key={data.status}
              >
                <div
                  style={{ backgroundColor: data.bgColor }}
                  className="py-2 px-5 text-white rounded-md shadow-md border-l border-l-black border-b border-b-black"
                >
                  <CountUp
                    className="text-lg font-bold mb-2"
                    end={data.count}
                    duration={1}
                  />
                </div>
                <p className="text-xs font-bold">{data.status}</p>
              </div>
            ))}
          </div>
        </div>
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
