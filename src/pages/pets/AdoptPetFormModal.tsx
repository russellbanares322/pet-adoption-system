import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  TimePicker,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Key, useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase-config";
import useUploadFileToDb from "../../hooks/useUploadFileToDb";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchAdoptionApplication } from "../../api/adoptions/adoptions";
import { deleteObject, ref } from "firebase/storage";
import moment from "moment";
import { formItemLayout } from "../../utils/formItemLayout";

type AdoptPetFormModalProps = {
  openModal: boolean;
  onCancel: () => void;
  selectedId: string;
  recipientId: string;
  isDataForUpdate: boolean;
  petImage: string;
};

type FormInputs = {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  contactNumber: string;
  reasonForAdopting: string;
  livingSituation: string;
  petExperience: string;
  dateOfReceivingPet: string;
  timeOfReceivingPet: string;
};
const { TextArea } = Input;

const AdoptPetFormModal = ({
  openModal,
  onCancel,
  selectedId,
  recipientId,
  isDataForUpdate,
  petImage,
}: AdoptPetFormModalProps) => {
  const [imgFile, setImgFile] = useState<File | null | string>(null);
  const [removedImg, setRemovedImg] = useState<File | null | string>("");
  const [isDataReviewed, setIsDataReviewed] = useState(false);
  const { data: adoptionApplicationForUpdate } =
    useFetchAdoptionApplication(selectedId);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImgToStorage } = useUploadFileToDb();
  const [user] = useAuthState(auth);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isDataForUpdate) {
      form.setFieldsValue({
        firstName: adoptionApplicationForUpdate?.firstName,
        middleName: adoptionApplicationForUpdate?.middleName,
        lastName: adoptionApplicationForUpdate?.lastName,
        address: adoptionApplicationForUpdate?.address,
        contactNumber: adoptionApplicationForUpdate?.contactNumber,
        reasonForAdopting: adoptionApplicationForUpdate?.reasonForAdopting,
        livingSituation: adoptionApplicationForUpdate?.livingSituation,
        petExperience: adoptionApplicationForUpdate?.petExperience,
      });
      setImgFile(adoptionApplicationForUpdate?.validIdImg);
    }
  }, [adoptionApplicationForUpdate, isDataForUpdate, openModal, selectedId]);

  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    setIsDataReviewed(e.target.checked);
  };

  const resetFormInputFields = () => {
    form.resetFields();
    setImgFile(null);
  };

  const handleCloseModal = () => {
    onCancel();
    resetFormInputFields();
  };

  const deletePrevSelectedImgInStorage = async () => {
    const convertedRemovedImg = removedImg as string;
    const isRemovedImgFilled = convertedRemovedImg.trim().length > 0;

    if (typeof removedImg === "string" && isRemovedImgFilled) {
      const imgUrl = ref(storage, removedImg);
      await deleteObject(imgUrl);
    }
  };

  const removeImg = () => {
    setRemovedImg(imgFile);
    setImgFile(null);
  };

  const onFinish = async (values: FormInputs) => {
    setIsLoading(true);
    try {
      const petAdoptionsRef = collection(db, "adoption-applications");
      const imgUrl = await uploadImgToStorage(imgFile as File);

      if (!isDataForUpdate) {
        if (imgUrl !== undefined) {
          await addDoc(petAdoptionsRef, {
            userId: user?.uid,
            userEmail: user?.email,
            firstName: values.firstName,
            middleName: values.middleName,
            lastName: values.lastName,
            address: values.address,
            contactNumber: values.contactNumber,
            reasonForAdopting: values.reasonForAdopting,
            status: "To be reviewed",
            rejectionReason: "",
            recipientId: recipientId,
            petId: selectedId,
            dateCreated: serverTimestamp(),
            validIdImg: typeof imgFile === "object" ? imgUrl : imgFile,
            livingSituation: values.livingSituation,
            petExperience: values.petExperience,
            dateOfReceivingPet: moment(values.dateOfReceivingPet).format("LL"),
            timeOfReceivingPet: moment(
              values.timeOfReceivingPet,
              "HH:mm"
            ).format("hh:mm A"),
            petImage: petImage,
          });
          setIsLoading(false);
          toast.success(
            "Successfully sent application, we'll just inform you if your application has been approved."
          );
          handleCloseModal();
        }
      } else {
        await updateDoc(doc(db, "adoption-applications", selectedId), {
          userId: user?.uid,
          userEmail: user?.email,
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          address: values.address,
          contactNumber: values.contactNumber,
          reasonForAdopting: values.reasonForAdopting,
          status: adoptionApplicationForUpdate?.status,
          rejectionReason: "",
          recipientId: recipientId,
          petId: adoptionApplicationForUpdate?.petId,
          dateCreated: serverTimestamp(),
          validIdImg: typeof imgFile === "object" ? imgUrl : imgFile,
          livingSituation: values.livingSituation,
          petExperience: values.petExperience,
          dateOfReceivingPet: moment(values.dateOfReceivingPet).format("LL"),
          timeOfReceivingPet: moment(values.timeOfReceivingPet, "HH:mm").format(
            "hh:mm A"
          ),
          petImage: petImage,
        });
        await deletePrevSelectedImgInStorage();
        setIsLoading(false);
        toast.success("Successfully updated application");
        handleCloseModal();
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
      title={isDataForUpdate ? "Edit Application" : "Adopt Pet"}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleCloseModal} type="default">
          Cancel
        </Button>,
        <Button
          disabled={!isDataReviewed || isLoading}
          key="submit"
          className="primary-btn"
          form="adopt-pet"
          type="primary"
          htmlType="submit"
        >
          {isLoading && "Submitting..."}
          {!isLoading && "Submit"}
        </Button>,
      ]}
    >
      <Form
        className="my-10 h-96 px-2 overflow-y-scroll w-full"
        name="adopt-pet"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        {...formItemLayout}
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
        {/* Reason for Adopting */}
        <Form.Item
          label="Reason for Adopting"
          name="reasonForAdopting"
          rules={[
            {
              required: true,
              message: "Please input your reason...",
            },
          ]}
        >
          <TextArea
            placeholder="Enter your reason..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        {/* Living Situation */}
        <Form.Item
          label="Living Situation"
          name="livingSituation"
          rules={[
            {
              required: true,
              message: "Please input your living situation...",
            },
          ]}
        >
          <TextArea
            placeholder="Enter your living situation..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        {/* Pet Experience */}
        <Form.Item
          label="Pet Experience"
          name="petExperience"
          rules={[
            {
              required: true,
              message: "Please input your experience in pets...",
            },
          ]}
        >
          <TextArea
            placeholder="Enter your experience in pets..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        {/* Receiving of pet date */}
        <Form.Item
          label="Receiving of pet date"
          name="dateOfReceivingPet"
          rules={[
            { required: true, message: "Please select retrieval date of pet" },
          ]}
        >
          <DatePicker format="MM/DD/YYYY" />
        </Form.Item>
        {/* Receiving of pet time */}
        <Form.Item
          label="Receiving of pet time"
          name="timeOfReceivingPet"
          rules={[
            { required: true, message: "Please select retrieval time of pet" },
          ]}
        >
          <TimePicker use12Hours format="h:mm a" />
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
            <DeleteOutlined
              onClick={removeImg}
              className="pr-1 cursor-pointer hover:text-red-500"
            />
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
