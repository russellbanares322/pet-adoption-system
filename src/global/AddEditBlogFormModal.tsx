import { Form, Input, Modal, Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import useUploadFileToDb from "../hooks/useUploadFileToDb";
import { toast } from "react-toastify";
import useUserInfo from "../hooks/useUserInfo";

type AddEditBlogFormModalProps = {
  open: boolean;
  onCancel: () => void;
};

type BlogsFormInputFieldsType = {
  title: string;
  story: string;
  images: {
    file: File;
    fileList: {
      originFileObj: File;
    }[];
  };
};

const { Dragger } = Upload;
const AddEditBlogFormModal = ({
  open,
  onCancel,
}: AddEditBlogFormModalProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImgsToStorage } = useUploadFileToDb();
  const { displayName } = useUserInfo();

  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: () => false,
  };

  const clearInputFields = () => {
    form.resetFields();
  };

  const onFinish = async (values: BlogsFormInputFieldsType) => {
    setIsLoading(true);
    const extractedImages = values?.images.fileList.map(
      (image) => image.originFileObj
    );

    try {
      const blogsRef = collection(db, "blogs");
      const imgURLs = await uploadImgsToStorage(extractedImages);
      const isUploadCompleted = imgURLs.length === extractedImages.length;

      if (isUploadCompleted) {
        await addDoc(blogsRef, {
          createdBy: displayName,
          title: values.title,
          story: values.story,
          images: imgURLs,
          dateCreated: serverTimestamp(),
        });
        setIsLoading(false);
        toast.success("Successfully published blog");
        clearInputFields();
        onCancel();
      }
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Modal
      okButtonProps={{
        className: "primary-btn",
        htmlType: "submit",
        form: "add-blog",
      }}
      confirmLoading={isLoading}
      open={open}
      onCancel={onCancel}
      okText="Publish"
      title="Add Blog"
    >
      <Form
        onFinish={onFinish}
        form={form}
        className="mt-7"
        name="add-blog"
        initialValues={{ remember: true }}
      >
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
            accept="image/png, image/jpeg"
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
