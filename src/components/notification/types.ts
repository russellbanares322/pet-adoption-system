export type NotificationDetailsModalProps = {
    open: boolean,
    onCancel: (e: React.MouseEvent) => void,
    notificationId: string | null
}

export type TNotificationInfoOptions = {
    openModal: boolean,
    notificationId: string | null
}