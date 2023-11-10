import { Button, Tag } from "antd";

type AdoptionCardProps = {
  index: number;
  petId: string;
  status: string;
};

const AdoptionCard = ({ index, petId, status }: AdoptionCardProps) => {
  const getTagColor = () => {
    const upperCasedStatus = status.toUpperCase();
    if (upperCasedStatus === "TO BE REVIEWED") {
      return "orange";
    }
    if (upperCasedStatus === "REJECTED") {
      return "red";
    }
    return "green";
  };

  return (
    <div className="shadow-md rounded-md p-2 border bg-white">
      <h1 className="text-center font-bold">Application # {index + 1}</h1>
      <hr className="my-2" />
      <p className="mt-5 text-center">
        Status: <Tag color={getTagColor()}>{status.toUpperCase()}</Tag>
      </p>
      <div className="flex items-center justify-center mt-5 mb-2 gap-2">
        <Button size="small" type="primary" className="primary-btn ">
          View Details Of Pet
        </Button>
        <Button size="small" type="primary" danger>
          Cancel Application
        </Button>
      </div>
    </div>
  );
};

export default AdoptionCard;
