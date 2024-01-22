import { Form, Input, Modal, Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";

type AddEditBlogFormModalProps = {
  open: boolean;
  onCancel: () => void;
};
type BlogsFormInputFieldsType = {
  title: string;
  story: string;
  images: string[];
};

const { Dragger } = Upload;
const AddEditBlogFormModal = ({
  open,
  onCancel,
}: AddEditBlogFormModalProps) => {
  const uploadProps: UploadProps = {
    multiple: true,
  };

  return (
    <Modal
      okButtonProps={{
        className: "primary-btn",
      }}
      open={open}
      onCancel={onCancel}
      okText="Publish"
      title="Add Blog"
    >
      <Form className="mt-7" name="add-blog" initialValues={{ remember: true }}>
        <Form.Item<BlogsFormInputFieldsType>
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input the title of your blog" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<BlogsFormInputFieldsType>
          label="Story"
          name="story"
          rules={[{ required: true, message: "Please write your story" }]}
        >
          <Input.TextArea autoSize={{ minRows: 7, maxRows: 8 }} />
        </Form.Item>
        <Form.Item<BlogsFormInputFieldsType>
          label="Images"
          name="images"
          rules={[{ required: true, message: "Please insert atleast 1 image" }]}
        >
          <Dragger
            {...uploadProps}
            maxCount={5}
            name="pet-pictures"
            listType="picture"
            accept=".png,.jpeg"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="text-sm">
              Click or drag image to this area to upload.
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditBlogFormModal;
