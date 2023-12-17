export type NotificationDetailsModalProps = {
    open: boolean,
    onCancel: (e: React.MouseEvent) => void,
    petId: string | null
}

export type TNotificationInfoOptions = {
    openModal: boolean,
    petId: string | null
}