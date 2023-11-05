import { useNavigate } from "react-router-dom";

const MyAdoptions = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 bg-whitesmoke min-h-screen h-full">
      <div className="container pt-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-lg">You currently have no adopted pet yet...</h1>
          <button onClick={() => navigate("/pets")} className="button-filled">
            Adopt Pet
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAdoptions;
