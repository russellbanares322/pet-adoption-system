import { Table } from "antd";
import moment from "moment";
import { useFetchUsers } from "../../../api/users/users";

const RegisteredUsers = () => {
  const { data: registeredUsersData, isLoading } = useFetchUsers();

  const dataSource = registeredUsersData?.map((user, index) => ({
    id: index + 1,
    email: user?.email,
    dateCreated: moment(user?.dateCreated.toDate()).format("LLL"),
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
  ];
  return (
    <div>
      <Table loading={isLoading} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default RegisteredUsers;
