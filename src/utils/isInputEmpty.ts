export const isInputEmpty = (input: string) => {
    const emptyInput = input.trim().length === 0;

    if(emptyInput){
        return true
    }

    return false
}