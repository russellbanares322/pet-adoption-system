import { Input, Form, Modal } from "antd";
import { AdoptionsData } from "../api/adoptions/adoptions";
import useApproveAdoptionApplication from "../hooks/useApproveAdoptionApplication";

type TAdoptionDateSelector = {
  applicationData: AdoptionsData;
  open: boolean;
  onCancel: () => void;
};

const { TextArea } = Input;

const AdoptionDateSelector = ({
  open,
  onCancel,
  applicationData,
}: TAdoptionDateSelector) => {
  const [form] = Form.useForm();
  const { approveApplication, isLoading } = useApproveAdoptionApplication();

  const onFinish = (values: { approvalNote: string }) => {
    const checkedApprovalNote =
      values.approvalNote === "" || values.approvalNote === undefined
        ? null
        : values.approvalNote;

    approveApplication(applicationData, checkedApprovalNote);
    if (!isLoading) {
      setTimeout(() => {
        onCancel();
        form.resetFields();
      }, 300);
    }
  };
  return (
    <Modal
      okButtonProps={{
        className: "primary-btn",
        htmlType: "submit",
        form: "approve-application",
      }}
      confirmLoading={isLoading}
      open={open}
      onCancel={onCancel}
      title="Approve Application"
      okText="Submit"
      width={400}
    >
      <Form
        form={form}
        className="mt-7 w-full"
        name="approve-application"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item label="Approval Note" name="approvalNote">
          <TextArea
            placeholder="Please specify if the provided date and time of retrieval is good..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdoptionDateSelector;
