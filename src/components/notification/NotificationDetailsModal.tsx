import { Button, Modal } from "antd";
import { useFetchPet } from "../../api/pets/pets";
import { NotificationDetailsModalProps } from "./types";

const NotificationDetailsModal = ({
  open,
  onCancel,
  petId,
}: NotificationDetailsModalProps) => {
  const { data: petData } = useFetchPet(petId as string);

  return (
    <Modal
      className="z-10"
      closable={true}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button type="primary" danger>
          Delete
        </Button>,
      ]}
      title="Notification"
    >
      <h1>{petData?.petName}</h1>
    </Modal>
  );
};

export default NotificationDetailsModal;
