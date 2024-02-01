import { Form, Input, Modal, Upload, UploadProps } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import useUploadFileToDb from "../hooks/useUploadFileToDb";
import { toast } from "react-toastify";
import useUserInfo from "../hooks/useUserInfo";
import { useFetchBlog } from "../api/blogs/blogs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase/firebase-config";

type AddEditBlogFormModalProps = {
  open: boolean;
  onCancel: () => void;
  idForUpdate?: string | null;
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
  idForUpdate = null,
  open,
  onCancel,
}: AddEditBlogFormModalProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImgsToStorage } = useUploadFileToDb();
  const [removedImgs, setRemovedImgs] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[] | undefined>([]);
  const { data } = useFetchBlog(idForUpdate);
  const { displayName, uid } = useUserInfo();
  const isBlogForUpdate = idForUpdate !== null;
  const unRequireImageUpload =
    isBlogForUpdate && imgUrls && imgUrls?.length > 0;

  useEffect(() => {
    if (isBlogForUpdate) {
      form.setFieldsValue({
        title: data?.title,
        story: data?.story,
      });
      setImgUrls(data?.images);
    }
  }, [idForUpdate, data, open]);

  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: () => false,
  };

  const savedImgsToBeRemoved = (imgUrl: string) => {
    setRemovedImgs([...removedImgs, imgUrl]);
    const filteredImgUrls = imgUrls?.filter((img) => img !== imgUrl);
    setImgUrls(filteredImgUrls);
  };

  const clearInputFields = () => {
    form.setFieldsValue({
      title: "",
      story: "",
      images: {},
    });
  };

  const closeModal = () => {
    clearInputFields();
    onCancel();
  };

  const deletePrevSelectedImgInStorage = async () => {
    if (removedImgs.length > 0) {
      await removedImgs.map(async (img) => {
        const imgUrl = ref(storage, img);
        await deleteObject(imgUrl);
      });
    }
  };

  const onFinish = async (values: BlogsFormInputFieldsType) => {
    setIsLoading(true);
    const hasPreviousImages = imgUrls && imgUrls?.length > 0;
    const noNewImagesAdded = !values.images;
    const avoidImageUpload = isBlogForUpdate && noNewImagesAdded;

    const extractedImages =
      !avoidImageUpload &&
      values?.images.fileList.map((image) => image.originFileObj);

    try {
      const blogsRef = collection(db, "blogs");
      const imgURLs =
        !avoidImageUpload && (await uploadImgsToStorage(extractedImages));
      const isUploadCompleted = imgURLs.length === extractedImages.length;

      if (isUploadCompleted) {
        if (!isBlogForUpdate) {
          await addDoc(blogsRef, {
            userId: uid,
            createdBy: displayName,
            title: values.title,
            story: values.story,
            images: imgURLs,
            dateCreated: serverTimestamp(),
          });
          setIsLoading(false);
          toast.success("Successfully published blog");
          closeModal();
        }
      }

      if (isBlogForUpdate) {
        let imagesToBeSaved;

        if (hasPreviousImages) {
          if (noNewImagesAdded) {
            imagesToBeSaved = imgUrls;
          } else {
            imagesToBeSaved = Array(...imgURLs, ...(imgUrls as string[]));
          }
        } else {
          imagesToBeSaved = imgURLs;
        }

        await updateDoc(doc(db, "blogs", idForUpdate), {
          userId: uid,
          createdBy: displayName,
          title: values.title,
          story: values.story,
          images: imagesToBeSaved,
          dateCreated: data?.dateCreated,
        });
        await deletePrevSelectedImgInStorage();
        setIsLoading(false);
        toast.success("Successfully updated blog");
        closeModal();
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
      onCancel={closeModal}
      okText={isBlogForUpdate ? "Save" : "Publish"}
      title={isBlogForUpdate ? "Edit Blog" : "Add Blog"}
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
          rules={[
            {
              required: !unRequireImageUpload,
              message: "Please insert atleast 1 image",
            },
          ]}
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
        <div className="flex flex-col gap-2 mt-2">
          {isBlogForUpdate &&
            imgUrls?.map((img, index) => (
              <div
                key={index}
                className="border rounded-md p-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-1">
                  <img
                    alt={`Image ${index + 1}`}
                    className="w-[50px] h-[50px] object-cover"
                    src={img}
                  />
                  <p className="text-xs italic text-green">
                    Default Added Image
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <DeleteOutlined
                    onClick={() => savedImgsToBeRemoved(img)}
                    className="pr-1 cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-black duration-150 ease-in-out p-1 rounded-md"
                  />
                </div>
              </div>
            ))}
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditBlogFormModal;
