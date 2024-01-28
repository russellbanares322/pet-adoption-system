import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchBlog } from "../../api/blogs/blogs";
import LoadingSpinner from "../../global/LoadingSpinner";
import { HiArrowNarrowLeft, HiOutlineLink } from "react-icons/hi";
import ImageSlider from "../../global/ImageSlider";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchBlog(id as string);
  const isDataLoaded = !isLoading && data;
  const navigate = useNavigate();

  return (
    <div className="py-24 w-full bg-whitesmoke min-h-screen h-full">
      <div className="container">
        {isLoading && (
          <LoadingSpinner title="Fetching blog details..." size="large" />
        )}
        {isDataLoaded && (
          <div>
            <p
              onClick={() => navigate(-1)}
              className="mb-5 font-medium cursor-pointer w-max flex items-center gap-1"
            >
              <HiArrowNarrowLeft />
              Return
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <ImageSlider images={data?.images} />
              </div>
              <div className="mt-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm">
                      Posted {moment(data?.dateCreated?.toDate()).format("LLL")}
                    </p>
                    <h1 className="text-xl font-bold">{data?.title}</h1>
                  </div>
                  <button className="flex items-center text-sm gap-2 hover:text-blue">
                    Copy link <HiOutlineLink />
                  </button>
                </div>
                <p className="mt-6">{data?.story}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
