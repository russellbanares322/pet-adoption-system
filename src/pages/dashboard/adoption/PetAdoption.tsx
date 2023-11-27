import {
  AdoptionsData,
  useFetchApplicationsByRecipientId,
} from "../../../api/adoptions/adoptions";
import LoadingSpinner from "../../../global/LoadingSpinner";
import PendingApplicationsCard from "./PendingApplicationsCard";
import CountUp from "react-countup";
import usePaginate from "../../../hooks/usePaginate";
import { Pagination } from "antd";
import { useState } from "react";

const PetAdoption = () => {
  const { data: applicationsData, isLoading } =
    useFetchApplicationsByRecipientId();
  const [selectedApplicationStatus, setSelectedApplicationStatus] = useState<
    string[]
  >([]);
  const applicationDataTotalCount = applicationsData?.length;
  const pageData: AdoptionsData[] = applicationsData;
  const { pageSize, currentItems, onPageChange, totalItemsCount } =
    usePaginate<AdoptionsData>({ pageData });
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

  const filterOptions = [
    {
      title: "All",
      count: applicationDataTotalCount,
    },
    {
      title: "Pending",
      count: toBeReviewedApplicationTotalCount,
    },
    {
      title: "Approved",
      count: approvedApplicationTotalCount,
    },
    {
      title: "Rejected",
      count: rejectedApplicationTotalCount,
    },
  ];

  const handleSelectFilterStatus = (selectedStatus: string) => {
    if (checkIfStatusIsSelected(selectedStatus)) {
      const filteredSelectedStatus = selectedApplicationStatus.filter(
        (status) => status !== selectedStatus
      );
      setSelectedApplicationStatus(filteredSelectedStatus);
    } else {
      setSelectedApplicationStatus([
        ...selectedApplicationStatus,
        selectedStatus,
      ]);
    }
  };

  const checkIfStatusIsSelected = (applicationStatus: string) => {
    if (selectedApplicationStatus.includes(applicationStatus)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {!isLoading && !isAdoptionsDataEmpty && (
        <div>
          <div className="flex flex-col items-center justify-center gap-3 mb-10">
            <h1 className="text-lg">Adoption Applications</h1>
          </div>
          <div>
            <p className="mb-2">Filter by status:</p>
            <div className="flex items-center justify-start gap-2">
              {filterOptions.map((data) => (
                <div
                  className={`border rounded-full cursor-pointer py-2 px-3 flex items-center justify-start gap-2 ${
                    checkIfStatusIsSelected(data.title)
                      ? "bg-blue text-white"
                      : "text-black"
                  }`}
                  key={data.title}
                  onClick={() => handleSelectFilterStatus(data.title)}
                >
                  <p>{data.title}</p>
                  <p>{data.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 w-full">
          {!isAdoptionsDataEmpty &&
            currentItems.map((data) => (
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
      {!isLoading && applicationDataTotalCount > 0 && (
        <div className="flex items-center justify-center mt-5">
          <Pagination
            defaultCurrent={1}
            onChange={onPageChange}
            size="default"
            total={totalItemsCount}
            pageSize={pageSize}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default PetAdoption;
