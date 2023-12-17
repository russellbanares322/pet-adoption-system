import { HiBell, HiTrash } from "react-icons/hi";
import { Badge, Empty, MenuProps, Tooltip } from "antd";
import useViewNotification from "../../hooks/useViewNotification";
import { Comments, useFetchPet, useFetchPets } from "../../api/pets/pets";
import { useFetchNotifications } from "../../api/notifications/notifications";
import moment, { Moment } from "moment";
import MenuDropdown from "../dropdown/MenuDropdown";
import { TNotificationInfoOptions } from "./types";
import React, { useState } from "react";
import PetDetailsModal from "../../global/PetDetailsModal";
import { Timestamp } from "firebase/firestore";

const NotificationDropdownItems = () => {
  const { viewNotification, deleteNotification } = useViewNotification();
  const [notificationInfoOptions, setNotifcationInfoOptions] =
    useState<TNotificationInfoOptions>({
      openModal: false,
      petId: null,
    });
  const { data: petData } = useFetchPet(
    notificationInfoOptions.petId as string
  );
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

  const handleOpenNotificationDetailsModal = (selectedPetId: string) => {
    setNotifcationInfoOptions({
      openModal: true,
      petId: selectedPetId,
    });
  };

  const handleCloseNotificationDetailsModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifcationInfoOptions({
      openModal: false,
      petId: null,
    });
  };

  const renderNotificationDropdownItemsLabel = (
    petId: string,
    status: string,
    dateUpdated: Moment,
    hasViewed: boolean,
    notificationId: string
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
      const splittedKey = key.split(",");
      const selectedNotificationId = splittedKey[0];
      const selectedPetId = splittedKey[1];
      viewNotification(selectedNotificationId);
      handleOpenNotificationDetailsModal(selectedPetId);
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
          data?.hasViewed,
          data?.notificationId
        ),
        key: `${data?.notificationId},${data?.petId}`,
      }));

  return (
    <>
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
      <PetDetailsModal
        open={notificationInfoOptions.openModal}
        onCancel={handleCloseNotificationDetailsModal}
        id={notificationInfoOptions.petId as string}
        petName={petData?.petName as string}
        petAge={petData?.petAge as string}
        petGender={petData?.petGender as string}
        petColor={petData?.petColor as string}
        petLocation={petData?.petLocation as string}
        petDescription={petData?.petDescription as string}
        likes={petData?.likes as string[]}
        comments={petData?.comments as Comments[]}
        petImage={petData?.petImage as string}
        createdBy={petData?.createdBy as string}
        dateCreated={petData?.dateCreated as Timestamp}
      />
    </>
  );
};

export default NotificationDropdownItems;
