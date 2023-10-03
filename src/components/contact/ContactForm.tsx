import { HiOutlineUser, HiOutlineMail, HiOutlinePencil } from "react-icons/hi";

const ContactForm = () => {
  return (
    <form className="mx-0 md:mx-20 order-1 md:order-2">
      <p className="text-center py-5 text-lg">
        Have any questions or comments?
      </p>
      <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
        <HiOutlineUser size={25} />
        <input
          className="appearance-none w-full outline-none"
          type="text"
          placeholder="Full Name"
        />
      </div>
      <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1 mt-4">
        <HiOutlineMail size={25} />
        <input
          className="appearance-none w-full outline-none"
          type="email"
          placeholder="Email Address"
        />
      </div>
      <div className="flex items-start gap-3 border-b-2 border-b-gray-800 w-full py-1 mt-4">
        <HiOutlinePencil size={25} />
        <textarea
          className="appearance-none w-full outline-none resize-none bg-transparent"
          placeholder="Message"
        />
      </div>
      <button className="button-filled w-full mt-4">Send</button>
    </form>
  );
};

export default ContactForm;
