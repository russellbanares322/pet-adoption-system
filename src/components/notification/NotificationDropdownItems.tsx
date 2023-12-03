import { HiBell, HiTrash } from "react-icons/hi";
import { Badge, Empty, MenuProps } from "antd";
import useViewNotification from "../../hooks/useViewNotification";
import { useFetchPets } from "../../api/pets/pets";
import { useFetchNotifications } from "../../api/notifications/notifications";
import moment, { Moment } from "moment";
import MenuDropdown from "../dropdown/MenuDropdown";

const NotificationDropdownItems = () => {
  const { viewNotification } = useViewNotification();
  const { data: petsData } = useFetchPets();
  const { data: notificationsData } = useFetchNotifications();
  const unViewedNotificationsCount = notificationsData?.filter(
    (data) => !data.hasViewed
  )?.length;
  const emptyNotificationsData = notificationsData?.length === 0;

  const getPetImage = (petId: string) => {
    const petImage = petsData?.find((data) => data.id === petId)?.petImage;
    return petImage;
  };

  const renderNotificationDropdownItemsLabel = (
    petId: string,
    status: string,
    dateUpdated: Moment,
    hasViewed: boolean
  ) => {
    return (
      <div className="flex items-center justify-start gap-3 relative">
        <div className="relative">
          <img
            className="h-11 w-11 object-cover rounded-md"
            src={getPetImage(petId)}
          />
          {!hasViewed && (
            <div className="bg-green p-[6px] rounded-full absolute -top-1 -right-1" />
          )}
        </div>
        <div>
          <p className="text-sm">
            Your application for <span className="font-bold">{petId}</span> has
            been <span className="font-bold">{status}</span>
          </p>
          <p className="text-xs text-blue">{moment(dateUpdated)?.fromNow()}</p>
        </div>
        <HiTrash
          className="hover:text-red-600 duration-100 ease-out absolute bottom-0 -right-1"
          size={16}
        />
      </div>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <Empty
        className="cursor-default flex flex-col items-center"
        imageStyle={{ height: "30%", width: "30%", objectFit: "cover" }}
        description={
          <p className="text-md font-semibold">
            You don't have any notifications
          </p>
        }
      />
    );
  };

  const notificationsDropdownItemActions: MenuProps["onClick"] = ({ key }) => {
    if (!emptyNotificationsData) {
      viewNotification(key);
    }
  };

  const notificationDropdownItems: MenuProps["items"] = emptyNotificationsData
    ? Array.from({ length: 1 }).map((_) => ({
        label: renderEmptyComponent(),
        key: "x",
        disabled: true,
      }))
    : notificationsData?.map((data) => ({
        label: renderNotificationDropdownItemsLabel(
          data?.petId,
          data?.status,
          data?.dateUpdated,
          data?.hasViewed
        ),
        key: data?.notificationId,
      }));

  return (
    <MenuDropdown
      items={notificationDropdownItems}
      itemActions={notificationsDropdownItemActions}
      trigger="click"
    >
      <div className="cursor-pointer pt-1">
        <Badge
          color="#52C41A"
          className="mr-2"
          count={
            unViewedNotificationsCount === 0 ? null : unViewedNotificationsCount
          }
        >
          <HiBell className="cursor-pointer" size={21} />
        </Badge>
      </div>
    </MenuDropdown>
  );
};

export default NotificationDropdownItems;
