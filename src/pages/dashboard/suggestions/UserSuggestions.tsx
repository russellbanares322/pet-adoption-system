import { Popconfirm, Space, Table, Tooltip } from "antd";
import moment from "moment";
import {
  SuggestionsData,
  useFetchSuggestions,
} from "../../../api/suggestions/suggestions";
import Button from "../../../global/Button";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { toast } from "react-toastify";

const UserSuggestions = () => {
  const { data: userSuggestionsData, isLoading: isFetchSuggestionsPending } =
    useFetchSuggestions();
  const totalSuggestionsCount = userSuggestionsData?.length;
  const dataSource = userSuggestionsData?.map((user, index) => ({
    id: index + 1,
    fullName: user?.fullName,
    email: user?.email,
    message: user?.message,
    dateCreated: moment(user?.dateCreated.toDate()).format("LLL"),
  }));

  const handleReplyUser = (userEmail: string) => {
    return (window.location.href = `mailto:${userEmail}?subject=Subject&body=message%20goes%20here`);
  };

  const handleDeleteSuggestion = async (suggestionId: string) => {
    try {
      await deleteDoc(doc(db, "user-suggestions", suggestionId));
      toast.success("Successfully deleted data");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const columns = [
    {
      width: 40,
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      width: 120,
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      width: 200,
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      width: 160,
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      width: 100,
      title: "Actions",
      key: "actions",
      render: (rec: SuggestionsData) => {
        return (
          <Space size={10}>
            <Tooltip title="Reply">
              <div>
                <Button
                  size="small"
                  onClick={() => handleReplyUser(rec.email)}
                  styleClass="primary-btn"
                  type="primary"
                  icon={<FormOutlined />}
                />
              </div>
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                placement="left"
                onConfirm={() => handleDeleteSuggestion(rec.id)}
                title="Delete data"
                description="Are you sure to delete this suggestion/comment?"
                okButtonProps={{
                  className: "primary-btn",
                }}
              >
                <Button
                  size="small"
                  type="primary"
                  danger={true}
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <h1 className="text-center text-lg my-3">
        Total Suggestions/Feedbacks:{" "}
        <span className="font-bold">{totalSuggestionsCount}</span>
      </h1>
      <Table
        loading={isFetchSuggestionsPending}
        dataSource={dataSource}
        columns={columns}
        scroll={{
          x: 1000,
          y: 800,
        }}
      />
    </div>
  );
};

export default UserSuggestions;
