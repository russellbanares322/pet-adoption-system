import { HiBell, HiTrash } from "react-icons/hi";
import { Badge, Empty, MenuProps, Tooltip } from "antd";
import useViewNotification from "../../hooks/useViewNotification";
import { useFetchNotifications } from "../../api/notifications/notifications";
import moment, { Moment } from "moment";
import MenuDropdown from "../dropdown/MenuDropdown";
import React, { useState } from "react";
import AdoptionApplicationNotificationDetailsModal from "../../global/AdoptionApplicationNotificationDetailsModal";

type TNotificationDetailsData = {
  petId: string;
  dateOfAdoption: string;
  petImage: string;
  status: string;
  dateUpdated: Moment;
  hasViewed: boolean;
  notificationId: string;
};

const NotificationDropdownItems = () => {
  const { viewNotification, deleteNotification } = useViewNotification();
  const [openNotificationDetailsModal, setOpenNotificationDetailsModal] =
    useState(false);
  const [notificationDetailsData, setNotificationDetailsData] =
    useState<TNotificationDetailsData | null>(null);
  const { data: notificationsData } = useFetchNotifications();
  const unViewedNotificationsCount = notificationsData?.filter(
    (data) => !data.hasViewed
  )?.length;
  const emptyNotificationsData = notificationsData?.length === 0;

  const handleOpenNotificationDetailsModal = (
    data: TNotificationDetailsData
  ) => {
    setOpenNotificationDetailsModal(true);
    setNotificationDetailsData(data);
  };

  const handleCloseNotificationDetailsModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenNotificationDetailsModal(false);
    setNotificationDetailsData(null);
  };

  const renderNotificationDropdownItemsLabel = (
    petId: string,
    dateOfAdoption: string,
    petImage: string,
    status: string,
    dateUpdated: Moment,
    hasViewed: boolean,
    notificationId: string
  ) => {
    const details = {
      petId,
      dateOfAdoption,
      petImage,
      status,
      dateUpdated,
      hasViewed,
      notificationId,
    };
    return (
      <div className="flex items-center justify-start gap-3 relative">
        <div
          onClick={() => handleOpenNotificationDetailsModal(details)}
          className="flex gap-3"
        >
          <div className="relative">
            <img className="h-11 w-11 object-cover rounded-md" src={petImage} />
            {!hasViewed && (
              <div className="bg-green p-[6px] rounded-full absolute -top-1 -right-1" />
            )}
          </div>
          <div>
            <p className="text-sm">
              Your application for <span className="font-bold">{petId}</span>{" "}
              has been <span className="font-bold">{status}</span>
            </p>
            <p className="text-xs text-blue">
              {moment(dateUpdated)?.fromNow()}
            </p>
          </div>
        </div>
        <Tooltip placement="bottom" title="Remove notification">
          <HiTrash
            onClick={(e) => {
              deleteNotification(notificationId);
              e.stopPropagation();
            }}
            className="hover:text-red-600 duration-100 ease-out absolute bottom-0 -right-1"
            size={16}
          />
        </Tooltip>
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
          data?.dateOfAdoption,
          data?.petImage,
          data?.status,
          data?.dateUpdated,
          data?.hasViewed,
          data?.notificationId
        ),
        key: data?.notificationId,
      }));

  return (
    <>
      <div className="hidden md:block">
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
                unViewedNotificationsCount === 0
                  ? null
                  : unViewedNotificationsCount
              }
            >
              <HiBell className="cursor-pointer" size={21} />
            </Badge>
          </div>
        </MenuDropdown>
      </div>
      <div className="block md:hidden">
        <MenuDropdown
          items={notificationDropdownItems}
          itemActions={notificationsDropdownItemActions}
          trigger="click"
        >
          <div className="cursor-pointer pt-1 flex items-center justify-start gap-1">
            Notifications
            <Badge
              color="#52C41A"
              className="mr-2"
              count={
                unViewedNotificationsCount === 0
                  ? null
                  : unViewedNotificationsCount
              }
            >
              <HiBell className="cursor-pointer" size={21} />
            </Badge>
          </div>
        </MenuDropdown>
      </div>
      <AdoptionApplicationNotificationDetailsModal
        notificationDetailsData={notificationDetailsData}
        open={openNotificationDetailsModal}
        onCancel={handleCloseNotificationDetailsModal}
      />
    </>
  );
};

export default NotificationDropdownItems;
