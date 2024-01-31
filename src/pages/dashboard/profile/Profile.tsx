import ProfileForm from "../../../global/ProfileForm";

const Profile = () => {
  return (
    <div>
      <h1 className="text-center text-2xl my-3 font-bold">Update Profile</h1>
      <div className="flex flex-col items-center justify-start max-w-full w-96 mx-auto">
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
