import CountUp from "react-countup";
import { useFetchApplicationsByRecipientId } from "../../api/adoptions/adoptions";
import { useFetchPendingPets, useFetchPets } from "../../api/pets/pets";
import { useFetchUsers } from "../../api/users/users";

type TDashboardLandingPageDatas = {
  id: number;
  title: string;
  count: number;
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
      title: "Total Number of Listed Pets",
      count: listedPetsCount,
    },
    {
      id: 2,
      title: "Total Number of Pending Post",
      count: pendingPetsCount,
    },
    {
      id: 3,
      title: "Total Number of Registered Users",
      count: registeredUsersCount,
    },
    {
      id: 4,
      title: "Total Number of Adoption Applications",
      count: adoptionApplicationsCount,
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
            className="bg-blue text-white rounded-md p-4 flex flex-col items-center justify-center gap-4 border border-l-2 border-l-dark-blue  border-b-2 border-b-dark-blue"
          >
            <p className="text-lg text-center">{data.title}</p>
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
