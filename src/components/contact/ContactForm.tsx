import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { HiOutlineUser, HiOutlineMail, HiOutlinePencil } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";

type FormDataTypes = {
  fullName: string;
  email: string;
  message: string;
};

const messageTextLimitLength = 100;

const ContactForm = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataTypes>({
    fullName: "",
    email: "",
    message: "",
  });
  const suggestionsRef = collection(db, "user-suggestions");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const someFormDataInputsAreEmpty = Object.values(formData).some(
      (data) => data.trim().length === 0
    );

    if (someFormDataInputsAreEmpty) {
      setIsFormDirty(true);
    } else {
      try {
        await addDoc(suggestionsRef, formData);
        setIsLoading(false);
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
        toast.success("Message sent successfully");
      } catch (err: any) {
        toast.error(err.message);
        setIsLoading(false);
      }
      setIsFormDirty(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "message" ? value.slice(0, messageTextLimitLength) : value,
    });
  };

  const renderInputWarningMessage = (
    inputName: string,
    displayName: string
  ) => {
    if (!inputName && isFormDirty) {
      return <p className="text-red-600 text-sm">{displayName} is required</p>;
    }
  };

  const invalidInput = (text: string) => {
    const isTextInvalid = text.trim().length === 0;
    if (isTextInvalid) {
      return true;
    }
    return false;
  };

  return (
    <form onSubmit={onSubmit} className="mx-0 md:mx-20 order-1 md:order-2">
      <p className="text-center py-5 text-lg">
        Have any questions or comments?
      </p>
      <div>
        <div
          className={`flex items-center gap-3 border-b-2  w-full py-1 ${
            isFormDirty && invalidInput(formData.fullName)
              ? "border-b-red-600"
              : "border-b-gray-800"
          }`}
        >
          <HiOutlineUser size={25} />
          <input
            value={formData.fullName}
            onChange={handleInputChange}
            name="fullName"
            className="appearance-none w-full outline-none"
            type="text"
            placeholder="Full Name*"
          />
        </div>
        {renderInputWarningMessage(formData.fullName, "Full Name")}
      </div>
      <div>
        <div
          className={`flex items-center gap-3 border-b-2  w-full py-1 ${
            isFormDirty && invalidInput(formData.email)
              ? "border-b-red-600"
              : "border-b-gray-800"
          } mt-4`}
        >
          <HiOutlineMail size={25} />
          <input
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            className="appearance-none w-full outline-none"
            type="email"
            placeholder="Email Address*"
          />
        </div>
        {renderInputWarningMessage(formData.email, "Email Address")}
      </div>
      <div>
        <div
          className={`flex items-start gap-3 border-b-2 w-full py-1 mt-4 ${
            isFormDirty && invalidInput(formData.message)
              ? "border-b-red-600"
              : "border-b-gray-800"
          }`}
        >
          <HiOutlinePencil size={25} />
          <textarea
            value={formData.message}
            onChange={handleInputChange}
            name="message"
            className="appearance-none w-full outline-none resize-none bg-transparent"
            placeholder="Message*"
          />
        </div>
        {renderInputWarningMessage(formData.message, "Message")}
        <div className="flex items-center justify-end">
          <p className="text-sm text-gray-400">
            {formData.message.length}/{messageTextLimitLength}
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="button-filled w-full mt-4 flex items-center justify-center"
      >
        {isLoading ? "Sending..." : "Send"}
        {isLoading && <ClipLoader color="white" size={18} />}
      </button>
    </form>
  );
};

export default ContactForm;
