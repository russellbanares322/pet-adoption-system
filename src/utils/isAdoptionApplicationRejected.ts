
export const isAdoptionApplicationRejected = (applicationStatus: string) => {
    const lowerCasedApplicationStatus = applicationStatus.toLowerCase();
    const isStatusRejected = lowerCasedApplicationStatus === "rejected";

    if(isStatusRejected){
        return true
    }
    return false
}