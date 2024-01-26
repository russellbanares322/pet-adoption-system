import moment from "moment";
import { BlogsData } from "../../api/blogs/blogs";
import useUserInfo from "../../hooks/useUserInfo";
import { EllipsisOutlined } from "@ant-design/icons";

const BlogsCard = ({
  dateCreated,
  id,
  title,
  story,
  images,
  createdBy,
  userId,
}: BlogsData) => {
  const { uid } = useUserInfo();
  const isPostOwnedByLoggedUser = userId === uid;

  const renderCreatedByName = () => {
    if (isPostOwnedByLoggedUser) {
      return "You";
    }
    return createdBy;
  };

  return (
    <div className="border-l rounded-md pb-5 border-l-dark-blue shadow-lg bg-slate-200 hover:-translate-y-2 duration-300 ease-in-out relative">
      <img
        className="rounded-md object-cover h-60 w-full bg-center"
        src={images[0]}
      />
      {isPostOwnedByLoggedUser && (
        <button className="absolute top-1 right-2 hover:bg-black/20 hover:text-white text-black rounded-full">
          <EllipsisOutlined className="text-4xl" />
        </button>
      )}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-sm">
          Posted by:{" "}
          <span className="font-medium text-base">{renderCreatedByName()}</span>
        </p>
        <p className="mt-2 font-semibold">{title}</p>
        <p className="text-lg">
          {story.substring(0, 7)}...{" "}
          <span className="text-blue italic text-sm cursor-pointer hover:underline">
            Read more
          </span>
        </p>
      </div>
      <p className="text-center mt-3 italic text-sm">
        {moment(dateCreated.toDate()).fromNow()}
      </p>
    </div>
  );
};

export default BlogsCard;
