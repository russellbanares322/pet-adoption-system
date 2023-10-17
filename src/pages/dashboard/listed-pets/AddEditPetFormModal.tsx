import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { petColors } from "../../../data/pet-filter-options";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchPet } from "../../../api/pets/pets";

type FormInputs = {
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petDescription: string;
  petImage: {
    file: {
      uid: string;
      name: string;
      originFileObj: File;
    };
  };
};

type AddEditPetFormModalProps = {
  selectedId: string | null;
  openEditModal: boolean;
  openModal: boolean;
  handleCloseAddPetModal: () => void;
  handleCloseEditPetModal: () => void;
};

const AddEditPetFormModal = ({
  selectedId,
  openEditModal,
  openModal,
  handleCloseAddPetModal,
  handleCloseEditPetModal,
}: AddEditPetFormModalProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const { data: petDataForUpdate } = useFetchPet(selectedId as string);
  const isDataForUpdate = selectedId !== null;

  useEffect(() => {
    if (isDataForUpdate) {
      form.setFieldsValue({
        petName: petDataForUpdate?.petName,
        petAge: petDataForUpdate?.petAge,
        petGender: petDataForUpdate?.petGender,
        petColor: petDataForUpdate?.petColor,
        petDescription: petDataForUpdate?.petDescription,
        petImage: petDataForUpdate?.petImage,
      });
    }
  }, [selectedId, petDataForUpdate]);

  const handleCloseModal = () => {
    form.resetFields();
    handleCloseEditPetModal();
    handleCloseAddPetModal();
  };

  const onFinish = async (values: FormInputs) => {
    setIsLoading(true);
    try {
      const listedPetsRef = collection(db, "listed-pets");
      const imageRef = ref(
        storage,
        `/images/${values.petImage.file.uid}/${values.petImage.file.name}`
      );
      await uploadBytes(imageRef, values.petImage.file.originFileObj).then(
        (res) => {
          getDownloadURL(res.ref).then((url) => {
            if (!selectedId && url) {
              addDoc(listedPetsRef, {
                userId: user?.uid,
                petName: values.petName,
                petAge: values.petAge,
                petGender: values.petGender,
                petColor: values.petColor,
                petDescription: values.petDescription,
                petImage: url,
              });
              setIsLoading(false);
              handleCloseModal();
              toast.success("Successfully created post");
            }
          });
        }
      );
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      okButtonProps={{
        className: "primary-btn",
      }}
      width={500}
      title={selectedId ? "EDIT PET" : "ADD PET"}
      open={openModal || openEditModal}
      onCancel={handleCloseModal}
      footer={[
        <Button
          key="cancel"
          disabled={isLoading}
          onClick={handleCloseModal}
          type="default"
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          disabled={isLoading}
          className="primary-btn"
          form="add-pet"
          type="primary"
          htmlType="submit"
        >
          {isLoading ? "Creating post..." : selectedId ? "Save" : "Submit"}
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
        {/* Pet's Age */}
        <Form.Item label="Age" name="petAge">
          <Input placeholder="Enter your pet's age..." />
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
        {/* Pet's Description */}
        <Form.Item name="petDescription" label="Description">
          <TextArea placeholder="Enter your pet's description..." rows={4} />
        </Form.Item>
        {/* Pet's Thumbnail */}
        <Form.Item
          name="petImage"
          label="Thumbnail Image"
          rules={[
            { required: true, message: "Please upload your pet's image..." },
          ]}
        >
          <Upload
            maxCount={1}
            name="petImage"
            listType="picture"
            customRequest={({ onSuccess }) => {
              if (!onSuccess) return;
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        {isDataForUpdate && (
          <div className="ml-28 border rounded-md p-2 flex items-center">
            <img
              className="w-[50px] h-[50px] object-cover"
              src={form.getFieldValue("petImage")}
            />
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default AddEditPetFormModal;