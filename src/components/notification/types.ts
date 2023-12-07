export type NotificationDetailsModalProps = {
    open: boolean,
    onCancel: () => void,
    notificationId: string | null
}

export type TNotificationInfoOptions = {
    openModal: boolean,
    notificationId: string | null
}