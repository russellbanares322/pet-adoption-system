import { Modal } from "antd";
import { NotificationDetailsModalProps } from "./types";

const NotificationDetailsModal = ({
  open,
  onCancel,
}: NotificationDetailsModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel}>
      NotificationDetailsModal
    </Modal>
  );
};

export default NotificationDetailsModal;
