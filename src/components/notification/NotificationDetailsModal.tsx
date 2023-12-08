import { Modal } from "antd";
import { NotificationDetailsModalProps } from "./types";

const NotificationDetailsModal = ({
  open,
  onCancel,
  notificationId,
}: NotificationDetailsModalProps) => {
  return (
    <Modal className="z-10" closable={true} open={open} onCancel={onCancel}>
      {notificationId}
    </Modal>
  );
};

export default NotificationDetailsModal;
