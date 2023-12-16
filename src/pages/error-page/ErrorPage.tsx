import { useNavigate } from "react-router-dom";
import errorImg from "../../assets/error-page.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const ErrorPage = () => {
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen min-h-1/2 w-1/2 mx-auto">
      <img className="h-96 w-96" src={errorImg} alt="error-page" />
      <h1 className="text-2xl font-bold">Oops! Page not found</h1>
      <p className="mt-2">
        The page you're trying to access doesn't exist, or you are not
        authorized.
      </p>
      <button
        onClick={returnToHome}
        className="button-filled mt-5 flex items-center gap-2"
      >
        <HiOutlineArrowNarrowLeft />
        Back To Home
      </button>
    </div>
  );
};

export default ErrorPage;
