import { Alert } from "antd";
import React, { useState } from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import useLocalStorage from "../../../hooks/useLocalStorage";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import useUserInfo from "../../../hooks/useUserInfo";

const ProfileForm = () => {
  const { displayName, email, uid } = useUserInfo();
  const { saveItemInLocalStorage } = useLocalStorage();
  const {
    updateUserProfile,
    isLoading,
    showSuccessAlertMessage,
    showErrorAlertMessage,
  } = useUpdateProfile();

  const [formData, setFormData] = useState({
    fullName: displayName || "",
    email: email || "",
    newPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateUserInfoInLocalStorage = () => {
    const defaultFullName = formData.fullName === displayName;
    const defaultEmail = formData.email === email;

    const updatedUserData = {
      displayName: !defaultFullName ? formData.fullName : displayName,
      email: !defaultEmail ? formData.email : email,
      uid: uid,
    };
    saveItemInLocalStorage("user-info", updatedUserData);
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserProfile(
      formData.fullName,
      formData.email,
      formData.newPassword
    );
    updateUserInfoInLocalStorage();
  };

  return (
    <form onSubmit={onSubmit} className="max-w-full w-96">
      {showSuccessAlertMessage && (
        <Alert
          className="mt-5"
          message="Successfully updated profile"
          type="success"
          showIcon
          closable={true}
        />
      )}
      {showErrorAlertMessage && (
        <Alert
          className="mt-5"
          message="Failed to update profile"
          type="error"
          showIcon
          closable={true}
        />
      )}
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
          disabled={isLoading}
          type="submit"
          className="button-filled w-full mb-2 flex items-center gap-1 justify-center"
        >
          {isLoading ? "Updating Profile..." : "Update Profile"}
          {isLoading && <ClipLoader color="white" size={18} />}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
