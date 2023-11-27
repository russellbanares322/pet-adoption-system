import noResult from "../assets/no-result.svg";

type NoResultsFoundProps = {
  title: string;
};

const NoResultsFound = ({
  title = "No results found",
}: NoResultsFoundProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-3">
      <img className="object-cover h-60 w-auto bg-center" src={noResult} />
      <p className="text-center mt-3 mr-14 text-lg">{title}</p>
    </div>
  );
};

export default NoResultsFound;
