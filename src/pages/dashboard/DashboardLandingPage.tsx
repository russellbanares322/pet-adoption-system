import CountUp from "react-countup";
import { useFetchApplicationsByRecipientId } from "../../api/adoptions/adoptions";
import { useFetchPendingPets, useFetchPets } from "../../api/pets/pets";
import { useFetchUsers } from "../../api/users/users";
import { IoPawOutline } from "react-icons/io5";
import { LuFileClock } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoMdPaper } from "react-icons/io";

type TDashboardLandingPageDatas = {
  id: number;
  title: string;
  count: number;
  icon: React.ReactNode;
};

const DashboardLandingPage = () => {
  const { data: listedPetsData } = useFetchPets();
  const { data: pendingPetsData } = useFetchPendingPets();
  const { data: registeredUsersData } = useFetchUsers();
  const { data: applicationsData } = useFetchApplicationsByRecipientId();
  const listedPetsCount = listedPetsData?.length;
  const pendingPetsCount = pendingPetsData?.length;
  const registeredUsersCount = registeredUsersData?.length;
  const adoptionApplicationsCount = applicationsData?.length;

  const dashboardLandingPageDatas: TDashboardLandingPageDatas[] = [
    {
      id: 1,
      title: "Listed Pets",
      count: listedPetsCount,
      icon: <IoPawOutline size={25} />,
    },
    {
      id: 2,
      title: "Pending Post",
      count: pendingPetsCount,
      icon: <LuFileClock size={25} />,
    },
    {
      id: 3,
      title: "Registered Users",
      count: registeredUsersCount,
      icon: <FiUsers size={25} />,
    },
    {
      id: 4,
      title: "Adoption Applications",
      count: adoptionApplicationsCount,
      icon: <IoMdPaper size={25} />,
    },
  ];
  return (
    <div>
      <h1 className="text-center mt-2 mb-10 text-2xl font-medium">
        Welcome to Admin Dashboard
      </h1>
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
        {dashboardLandingPageDatas.map((data) => (
          <div
            key={data.id}
            className="border-l border-l-dark-blue border-b border-b-dark-blue bg-gradient-to-l from-orange/40 to-blue text-white rounded-md mb-2 p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">
                {data.title.toUpperCase()}
              </p>
              <div className="bg-orange rounded-full p-2">{data.icon}</div>
            </div>
            <CountUp
              className="text-5xl font-bold mb-2"
              end={data.count}
              duration={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLandingPage;
