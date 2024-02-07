import { Switch, Table, TableProps } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";
import { useFetchUsers } from "../../../api/users/users";
import { db } from "../../../firebase/firebase-config";

type UsersTableData = {
  id: number;
  email: string;
  dateCreated: string;
  isActive: boolean;
};
const RegisteredUsers = () => {
  const { data: registeredUsersData, isLoading } = useFetchUsers();
  const totalRegisteredUsersCount = registeredUsersData?.length;
  const dataSource = registeredUsersData?.map((user, index) => ({
    id: index + 1,
    email: user?.email,
    dateCreated: moment(user?.dateCreated.toDate()).format("LLL"),
    isActive: user?.isActive,
  }));

  const updateUserStatus = async (isChecked: boolean, email: string) => {
    const userDataRef = doc(db, "users", email);

    await updateDoc(userDataRef, {
      isActive: isChecked,
    });

    toast.success("Successfully changed user status");
  };

  const columns: TableProps<UsersTableData>["columns"] = [
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
    {
      title: "Account Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, { isActive, email }) => (
        <Switch
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
          checked={isActive}
          onChange={(isChecked) => updateUserStatus(isChecked, email)}
        />
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center text-2xl my-3 font-bold">
        Total Registered Users: {totalRegisteredUsersCount}
      </h1>

      <Table loading={isLoading} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default RegisteredUsers;
