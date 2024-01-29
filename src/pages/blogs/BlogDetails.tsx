import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchBlog } from "../../api/blogs/blogs";
import LoadingSpinner from "../../global/LoadingSpinner";
import { HiArrowNarrowLeft, HiOutlineLink } from "react-icons/hi";
import ImageSlider from "../../global/ImageSlider";
import { CopyOutlined } from "@ant-design/icons";
import { Input, Popover } from "antd";
import { useState } from "react";
import Button from "../../global/Button";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchBlog(id as string);
  const [openLinkInput, setOpenLinkInput] = useState(false);
  const isDataLoaded = !isLoading && data;
  const navigate = useNavigate();
  const linkToBeCopied = window.location.hostname.includes("localhost")
    ? `http://localhost:5174/blogs/${id}`
    : `https://adoptapetportal-muntinlupa.onrender.com/blogs/${id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(linkToBeCopied);
      toast.success("Successfully copied link!");
    } catch (err) {
      toast.error("Failed to copy link, please try again.");
    }
  };

  const handleOpenPopoverChange = (open: boolean) => {
    setOpenLinkInput(open);
  };

  const renderPopoverCopyLinkContent = () => {
    return (
      <div className="w-full flex items-center gap-1">
        <Input
          className="w-full"
          disabled
          value={linkToBeCopied}
          defaultValue={linkToBeCopied}
        />
        <Button
          onClick={copyLink}
          icon={<CopyOutlined />}
          type="primary"
          styleClass="primary-btn"
          size="middle"
        />
      </div>
    );
  };
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
                  <Popover
                    content={renderPopoverCopyLinkContent()}
                    title=""
                    trigger="click"
                    open={openLinkInput}
                    onOpenChange={handleOpenPopoverChange}
                    placement="left"
                  >
                    <button className="flex items-center text-sm gap-2 hover:text-blue">
                      Copy link <HiOutlineLink />
                    </button>
                  </Popover>
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
