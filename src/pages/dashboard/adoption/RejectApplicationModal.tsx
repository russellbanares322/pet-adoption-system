import { Input, Modal } from "antd";
import React from "react";
import { AdoptionsData } from "../../../api/adoptions/adoptions";
import useApproveAdoptionApplication from "../../../hooks/useApproveAdoptionApplication";

type RejectApplicationModalProps = {
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rejectInputValue: string | "";
  open: boolean;
  onCancel: () => void;
  applicationData: AdoptionsData;
};

const RejectApplicationModal = ({
  onInputChange,
  rejectInputValue,
  open,
  onCancel,
  applicationData,
}: RejectApplicationModalProps) => {
  const { rejectApplication, isLoading } = useApproveAdoptionApplication();
  const disableSubmitBtn = rejectInputValue.trim().length === 0;

  const { TextArea } = Input;
  return (
    <Modal
      title="Rejection Reason"
      open={open}
      onCancel={onCancel}
      confirmLoading={isLoading}
      onOk={() => rejectApplication(applicationData, rejectInputValue)}
      centered
      okText="Submit"
      okButtonProps={{
        className: "primary-btn",
        disabled: disableSubmitBtn,
      }}
    >
      <TextArea
        value={rejectInputValue}
        showCount
        maxLength={100}
        onChange={onInputChange}
        placeholder="Please write your rejection reason..."
        style={{ resize: "none", marginTop: "1rem", marginBottom: "1.3rem" }}
      />
    </Modal>
  );
};

export default RejectApplicationModal;
