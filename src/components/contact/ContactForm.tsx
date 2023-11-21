import { useState } from "react";
import { HiOutlineUser, HiOutlineMail, HiOutlinePencil } from "react-icons/hi";
import { toast } from "react-toastify";

type FormDataTypes = {
  fullName: string;
  email: string;
  message: string;
};

const messageTextLimitLength = 100;

const ContactForm = () => {
  const [isFormDataDirty, setIsFormDataDirty] = useState(false);
  const [formData, setFormData] = useState<FormDataTypes>({
    fullName: "",
    email: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const someFormDataInputsAreEmpty = Object.values(formData).some(
      (data) => data === ""
    );

    if (someFormDataInputsAreEmpty) {
      setIsFormDataDirty(true);
      toast.error("Failed");
    } else {
      toast.success("Success");
      setIsFormDataDirty(false);
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

  return (
    <form onSubmit={onSubmit} className="mx-0 md:mx-20 order-1 md:order-2">
      <p className="text-center py-5 text-lg">
        Have any questions or comments?
      </p>
      <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
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
      <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1 mt-4">
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
      <div className="flex items-start gap-3 border-b-2 border-b-gray-800 w-full py-1 mt-4">
        <HiOutlinePencil size={25} />
        <textarea
          value={formData.message}
          onChange={handleInputChange}
          name="message"
          className="appearance-none w-full outline-none resize-none bg-transparent"
          placeholder="Message*"
        />
      </div>
      <div className="flex items-center justify-end">
        <p className="text-sm text-gray-400">
          {formData.message.length}/{messageTextLimitLength}
        </p>
      </div>
      <button className="button-filled w-full mt-4">Send</button>
    </form>
  );
};

export default ContactForm;
