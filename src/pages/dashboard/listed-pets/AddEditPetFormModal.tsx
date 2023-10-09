import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { petColors } from "../../../data/pet-filter-options";
import { UploadOutlined } from "@ant-design/icons";

type AddEditPetFormModalProps = {
  openModal: boolean;
  onCancel: () => void;
};

const AddEditPetFormModal = ({
  openModal,
  onCancel,
}: AddEditPetFormModalProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: Record<string, string>) => {
    console.log(values);
  };

  return (
    <Modal
      okButtonProps={{
        className: "primary-btn",
      }}
      width={500}
      title="ADD PET"
      open={openModal}
      onCancel={onCancel}
      footer={[
        <Button onClick={onCancel} type="default">
          Cancel
        </Button>,
        <Button
          className="primary-btn"
          form="add-pet"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>,
      ]}
      okText="Submit"
    >
      <Form
        name="add-pet"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        className="my-10"
      >
        {/* Pet's Name */}
        <Form.Item
          label="Name"
          name="petName"
          rules={[
            {
              required: true,
              message: "Please input your pet's name.",
            },
          ]}
        >
          <Input placeholder="Enter your pet's name..." />
        </Form.Item>
        {/* Pet's Gender */}
        <Form.Item
          label="Gender"
          name="petGender"
          rules={[
            { required: true, message: "Please specify your pet's gender." },
          ]}
        >
          <Select placeholder="Enter your pet's gender..." allowClear>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        {/* Pet's Color */}
        <Form.Item
          label="Color"
          name="petColor"
          rules={[
            { required: true, message: "Please specify your pet's color." },
          ]}
        >
          <Select placeholder="Enter your pet's color..." allowClear>
            {petColors.map((color) => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* Pet's Thumbnail */}
        <Form.Item
          name="petImage"
          label="Thumbnail Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Please upload your pet's image..." },
          ]}
        >
          <Upload name="petImage" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditPetFormModal;
