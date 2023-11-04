import { Button, Checkbox, Form, Input, Modal } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Key, useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import useUploadFileToDb from "../../hooks/useUploadFileToDb";
import { useAuthState } from "react-firebase-hooks/auth";

type AdoptPetFormModalProps = {
  openModal: boolean;
  onCancel: () => void;
  selectedId: string;
};

type FormInputs = {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  contactNumber: string;
};

const AdoptPetFormModal = ({
  openModal,
  onCancel,
  selectedId,
}: AdoptPetFormModalProps) => {
  const [imgFile, setImgFile] = useState<File | null | string>(null);
  const [isDataReviewed, setIsDataReviewed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImgToStorage } = useUploadFileToDb();
  const [user] = useAuthState(auth);
  const [form] = Form.useForm();

  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    setIsDataReviewed(e.target.checked);
  };

  const handleCloseModal = () => {
    onCancel();
    form.resetFields();
  };

  const onFinish = async (values: FormInputs) => {
    setIsLoading(true);
    try {
      const petAdoptionsRef = collection(db, "pet-adoptions");
      const imgUrl = await uploadImgToStorage(imgFile as File);

      if (imgUrl !== undefined) {
        addDoc(petAdoptionsRef, {
          userId: user?.uid,
          userEmail: user?.email,
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          address: values.address,
          contactNumber: values.contactNumber,
          petId: selectedId,
          dateCreated: serverTimestamp(),
          image: imgUrl,
        });
        setIsLoading(false);
        toast.success("Successfully sent application");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImgFile(files[0]);
    }
  };

  return (
    <Modal
      open={openModal}
      onCancel={handleCloseModal}
      title="Adopting Pet"
      width={500}
      footer={[
        <Button key="cancel" onClick={handleCloseModal} type="default">
          Cancel
        </Button>,
        <Button
          disabled={!isDataReviewed}
          key="submit"
          className="primary-btn"
          form="add-pet"
          type="primary"
          htmlType="submit"
        >
          {isLoading && "Submitting..."}
          {!isLoading && "Submit"}
        </Button>,
      ]}
    >
      <Form
        className="my-10"
        name="adopt-pet"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {/* First Name */}
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name.",
            },
          ]}
        >
          <Input placeholder="Enter your first name..." />
        </Form.Item>
        {/* Middle Name */}
        <Form.Item label="Middle Name" name="middleName">
          <Input placeholder="Enter your middle name..." />
        </Form.Item>
        {/* Last Name */}
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name.",
            },
          ]}
        >
          <Input placeholder="Enter your last name..." />
        </Form.Item>
        {/* Address */}
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address",
            },
          ]}
        >
          <Input placeholder="Enter your address..." />
        </Form.Item>
        {/* Contact Number */}
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Please input your contact number...",
            },
          ]}
        >
          <Input placeholder="Enter your contact number..." />
        </Form.Item>
        {/* Valid Id */}
        <Form.Item
          label="Valid Id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <label className="flex ml-2 border duration-150 hover:border-blue hover:text-blue border-gray-300 rounded-md p-2 cursor-pointer justify-start items-center gap-2">
            <input
              key={imgFile as Key}
              onChange={handleChangeImage}
              id="img-upload"
              accept="image/png, image/jpeg"
              className="absolute left-[-99999rem]"
              type="file"
            />
            <UploadOutlined />
            Click to Upload
          </label>
        </Form.Item>
        {imgFile !== null && (
          <div className="border rounded-md p-2 flex items-center justify-between">
            <img
              className="w-[50px] h-[50px] object-cover"
              src={
                typeof imgFile === "object"
                  ? URL.createObjectURL(imgFile as Blob)
                  : (imgFile as string)
              }
            />
            <DeleteOutlined className="pr-1 cursor-pointer hover:text-red-500" />
          </div>
        )}
        <Form.Item
          className="flex items-center justify-center font-bold"
          name="finalizePost"
          valuePropName="checked"
        >
          <Checkbox onChange={handleChangeCheckbox}>
            I confirm that I have reviewed and verified all entered data.
          </Checkbox>
        </Form.Item>
        <p className="text-xs italic text-center">
          Please ensure that all details are accurate to prevent any issue or
          delays. Thank you for your attention to detail.
        </p>
      </Form>
    </Modal>
  );
};

export default AdoptPetFormModal;
