import { Tag, Tooltip } from "antd";
import Button from "../../global/Button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type AdoptionCardProps = {
  petId: string;
  status: string;
};

const AdoptionCard = ({ petId, status }: AdoptionCardProps) => {
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
      <h1 className="text-center flex flex-col items-center">
        Application for post:{" "}
        <Tooltip title="View Post Details" placement="right">
          <span className="font-bold underline cursor-pointer hover:text-blue">
            {petId}
          </span>
        </Tooltip>
      </h1>
      <hr className="my-2" />
      <p className="mt-5 text-center">
        Status: <Tag color={getTagColor()}>{status.toUpperCase()}</Tag>
      </p>
      <div className="flex items-center justify-center mt-5 mb-2 gap-2">
        <Button
          size="small"
          type="primary"
          title="Update"
          icon={<EditOutlined />}
          styleClass="primary-btn"
        />
        <Button
          size="small"
          type="primary"
          danger={true}
          title="Delete"
          icon={<DeleteOutlined />}
        />
      </div>
    </div>
  );
};

export default AdoptionCard;
