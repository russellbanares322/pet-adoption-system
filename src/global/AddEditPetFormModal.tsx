import { Button, Form, Input, Modal, Select, Switch } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { deleteObject, ref } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase/firebase-config";
import { petColors, petGender, petTypes } from "../data/pet-filter-options";
import useUploadFileToDb from "../hooks/useUploadFileToDb";
import { useFetchPet } from "../api/pets/pets";

type FormInputs = {
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petType: string;
  petLocation: string;
  showAdoptButton: boolean;
  petDescription: string;
};

type AddEditPetFormModalProps = {
  selectedId: string | null;
  openEditModal: boolean;
  openModal: boolean;
  handleCloseAddPetModal: () => void;
  handleCloseEditPetModal: () => void;
  dbName: string;
};

const AddEditPetFormModal = ({
  selectedId,
  openEditModal,
  openModal,
  handleCloseAddPetModal,
  handleCloseEditPetModal,
  dbName,
}: AddEditPetFormModalProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState<File | null | string>(null);
  const [removedImg, setRemovedImg] = useState<File | null | string>("");
  const { data: petDataForUpdate } = useFetchPet(selectedId as string);
  const isDataForUpdate = selectedId;
  const isUserPosted = user?.email !== import.meta.env.VITE_APP_ADMIN_ACCOUNT;
  const { uploadImgToStorage } = useUploadFileToDb();

  useEffect(() => {
    if (isDataForUpdate) {
      form.setFieldsValue({
        petName: petDataForUpdate?.petName,
        petAge: petDataForUpdate?.petAge,
        petGender: petDataForUpdate?.petGender,
        petColor: petDataForUpdate?.petColor,
        petType: petDataForUpdate?.petType,
        petLocation: petDataForUpdate?.petLocation,
        showAdoptButton: petDataForUpdate?.showAdoptButton,
        petDescription: petDataForUpdate?.petDescription,
      });
      setImgFile(petDataForUpdate?.petImage as string);
    }
  }, [selectedId, petDataForUpdate]);

  const handleCloseModal = () => {
    form.resetFields();
    setImgFile(null);
    handleCloseEditPetModal();
    handleCloseAddPetModal();
  };

  const removeImg = () => {
    setRemovedImg(imgFile);
    setImgFile(null);
  };

  const deletePrevSelectedImgInStorage = async () => {
    if (typeof removedImg === "string") {
      const imgUrl = ref(storage, removedImg);
      await deleteObject(imgUrl);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImgFile(files[0]);
    }
  };

  const onFinish = async (values: FormInputs) => {
    setIsLoading(true);
    try {
      const listedPetsRef = collection(db, dbName);
      const imgUrl = await uploadImgToStorage(imgFile as File);

      if (!isDataForUpdate) {
        if (imgUrl !== undefined) {
          await addDoc(listedPetsRef, {
            userId: user?.uid,
            petName: values.petName,
            petAge: values.petAge,
            petGender: values.petGender,
            petColor: values.petColor,
            petType: values.petType,
            petLocation: values.petLocation,
            showAdoptButton: true,
            petDescription: values.petDescription,
            petImage: typeof imgFile === "object" ? imgUrl : imgFile,
            status: isUserPosted ? "Pending" : "Approved",
            createdBy: user?.displayName,
            dateCreated: serverTimestamp(),
            likes: [],
            comments: [],
          });
          setIsLoading(false);
          handleCloseModal();
          toast.success("Successfully created post");
        }
      } else {
        await updateDoc(doc(db, "listed-pets", selectedId), {
          userId: user?.uid,
          petName: values.petName,
          petAge: values.petAge,
          petGender: values.petGender,
          petColor: values.petColor,
          petType: values.petType,
          petLocation: values.petLocation,
          showAdoptButton: values.showAdoptButton ? true : false,
          petDescription: values.petDescription,
          petImage: typeof imgFile === "object" ? imgUrl : imgFile,
          status: isUserPosted ? "Pending" : "Approved",
          createdBy: user?.displayName,
          dateCreated: serverTimestamp(),
          likes: petDataForUpdate?.likes,
          comments: petDataForUpdate?.comments,
        });
        await deletePrevSelectedImgInStorage();
        setIsLoading(false);
        handleCloseModal();
        toast.success("Successfully updated post");
      }
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
      title={isDataForUpdate ? "EDIT PET" : "ADD PET"}
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
          {isLoading && !isDataForUpdate && "Creating post..."}
          {isLoading && isDataForUpdate && "Updating post..."}
          {!isLoading && isDataForUpdate && "Save"}
          {!isLoading && !isDataForUpdate && "Submit"}
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
            {petGender.map((gender) => (
              <Option key={gender} value={gender}>
                {gender}
              </Option>
            ))}
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
        {/* Pet Type */}
        <Form.Item
          label="Type"
          name="petType"
          rules={[
            { required: true, message: "Please specify your pet's type." },
          ]}
        >
          <Select placeholder="Enter your pet's type..." allowClear>
            {petTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* Pet's Location */}
        <Form.Item label="Location" name="petLocation">
          <Input placeholder="Enter where your pet is located..." />
        </Form.Item>
        {/*For showing adopt pet button*/}
        {isDataForUpdate && (
          <Form.Item
            label="Is this pet still available to be adopted?"
            name="showAdoptButton"
            valuePropName="checked"
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          </Form.Item>
        )}
        {/* Pet's Description */}
        <Form.Item name="petDescription" label="Description">
          <TextArea placeholder="Enter your pet's description..." rows={4} />
        </Form.Item>
        {/* Pet's Thumbnail */}
        <Form.Item
          label="Thumbnail Image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <label className="flex ml-2 border duration-150 hover:border-blue hover:text-blue border-gray-300 rounded-md p-2 cursor-pointer justify-start items-center gap-2">
            <input
              key={imgFile as Key}
              id="img-upload"
              accept="image/png, image/jpeg"
              onChange={handleChangeImage}
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
            <DeleteOutlined
              onClick={removeImg}
              className="pr-1 cursor-pointer hover:text-red-500"
            />
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default AddEditPetFormModal;
