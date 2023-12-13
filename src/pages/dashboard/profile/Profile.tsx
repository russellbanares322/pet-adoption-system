import ProfileForm from "./ProfileForm";

const Profile = () => {
  return (
    <div>
      <h1 className="text-center text-2xl my-3 font-bold">Update Profile</h1>
      <div className="flex flex-col items-center justify-start">
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
