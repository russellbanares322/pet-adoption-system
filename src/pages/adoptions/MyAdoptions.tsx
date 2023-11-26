import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AdoptionsData,
  useFetchAdoptionsByUserId,
} from "../../api/adoptions/adoptions";
import LoadingSpinner from "../../global/LoadingSpinner";
import usePaginate from "../../hooks/usePaginate";
import AdoptionCard from "./AdoptionCard";

const MyAdoptions = () => {
  const navigate = useNavigate();
  const { data: adoptionsData, isLoading } = useFetchAdoptionsByUserId();
  const pageData: AdoptionsData[] = adoptionsData;
  const { pageSize, currentItems, onPageChange, totalItemsCount } =
    usePaginate<AdoptionsData>({ pageData });
  const adoptionsDataTotalCount = adoptionsData?.length;
  const isAdoptionsDataEmpty = adoptionsDataTotalCount === 0;

  return (
    <div className="py-24 bg-whitesmoke min-h-screen h-full">
      <div className="container pt-10">
        {!isAdoptionsDataEmpty && (
          <h1 className="text-lg text-center">
            Total Sent Adoptions Application:{" "}
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
            {currentItems?.map((data) => (
              <AdoptionCard key={data.id} {...data} />
            ))}
          </div>
        )}
        {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      </div>
      {!isLoading && adoptionsDataTotalCount > 0 && (
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

export default MyAdoptions;
