import { DatePicker, Form, Modal } from "antd";
import moment from "moment";
import { AdoptionsData } from "../api/adoptions/adoptions";
import useApproveAdoptionApplication from "../hooks/useApproveAdoptionApplication";

type TAdoptionDateSelector = {
  applicationData: AdoptionsData;
  open: boolean;
  onCancel: () => void;
};

const AdoptionDateSelector = ({
  open,
  onCancel,
  applicationData,
}: TAdoptionDateSelector) => {
  const [form] = Form.useForm();
  const { approveApplication, isLoading } = useApproveAdoptionApplication();

  const onFinish = (values: { dateOfAdoption: string }) => {
    approveApplication(
      applicationData,
      moment(values.dateOfAdoption).format("LL")
    );
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
      >
        <Form.Item
          label="Receiving of pet schedule"
          name="dateOfAdoption"
          rules={[
            { required: true, message: "Please select date of adoption" },
          ]}
        >
          <DatePicker format="MM/DD/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdoptionDateSelector;
