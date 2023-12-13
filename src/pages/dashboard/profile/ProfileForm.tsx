import { Alert } from "antd";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { auth } from "../../../firebase/firebase-config";

const ProfileForm = () => {
  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    newPassword: "",
  });

  console.log(user?.uid);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="max-w-full w-96">
      <Alert
        className="mt-5"
        message="Successfully updated profile"
        type="success"
        showIcon
        closable={true}
      />
      <div className="mt-3 flex flex-col gap-5">
        <div
          className={`flex items-center gap-3 border-b-2  border-b-gray-800 w-full py-1`}
        >
          <HiOutlineUser size={25} />
          <input
            onChange={onChange}
            name="fullName"
            className="appearance-none w-full outline-none"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
          />
        </div>
        <div
          className={`flex items-center gap-3 border-b-2  border-b-gray-800 w-full py-1`}
        >
          <HiOutlineMail size={25} />
          <input
            onChange={onChange}
            name="email"
            className="appearance-none w-full outline-none"
            type="email"
            placeholder="Email Address"
            value={formData.email}
          />
        </div>
        <div
          className={`flex items-center gap-3 border-b-2  border-b-gray-800 w-full py-1`}
        >
          <MdOutlinePassword size={25} />
          <input
            onChange={onChange}
            name="newPassword"
            className="appearance-none w-full outline-none"
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
          />
        </div>
        <button
          type="submit"
          className="button-filled w-full mb-2 flex items-center gap-1 justify-center"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
