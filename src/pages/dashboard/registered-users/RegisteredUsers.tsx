import { Table } from "antd";
import moment from "moment";
import { useFetchUsers } from "../../../api/users/users";

const RegisteredUsers = () => {
  const { data: registeredUsersData, isLoading } = useFetchUsers();
  const totalRegisteredUsersCount = registeredUsersData?.length;

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
      <h1 className="text-center text-lg">
        Total Registered Users:{" "}
        <span className="font-bold">{totalRegisteredUsersCount}</span>
      </h1>
      <Table loading={isLoading} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default RegisteredUsers;
