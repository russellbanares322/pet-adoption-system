import { Modal, Space, Tag } from "antd";
import { Moment } from "moment";

type TNotificationDetailsData = {
  petId: string;
  approvalNote: string | null;
  petImage: string;
  status: string;
  dateUpdated: Moment;
  hasViewed: boolean;
  notificationId: string;
};

type AdoptionApplicationNotificationDetailsModalProps = {
  notificationDetailsData: TNotificationDetailsData | null;
  open: boolean;
  onCancel: (e: React.MouseEvent) => void;
};

const AdoptionApplicationNotificationDetailsModal = ({
  notificationDetailsData,
  open,
  onCancel,
}: AdoptionApplicationNotificationDetailsModalProps) => {
  const getStatusTagColor = (status: string) => {
    const lowercasedStatus = status?.toLowerCase();
    const colorEnum: Record<string, string> = {
      rejected: "red",
      approved: "green",
    };

    return colorEnum[lowercasedStatus];
  };

  const applicationsText = (label: string, value: string) => {
    return (
      <Space>
        {label}:{" "}
        <Tag color={label === "Status" ? getStatusTagColor(value) : ""}>
          {value}
        </Tag>
      </Space>
    );
  };

  return (
    <Modal
      title="Adoption Application Details"
      footer={false}
      open={open}
      onCancel={onCancel}
    >
      <div className="flex flex-col gap-2">
        {applicationsText("Status", notificationDetailsData?.status as string)}
        {applicationsText(
          "Approval Note",
          notificationDetailsData?.approvalNote as string
        )}
      </div>
    </Modal>
  );
};

export default AdoptionApplicationNotificationDetailsModal;
