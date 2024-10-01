export const handleError = (error: () => void) => {
    if (process.env.ENV === "DEV") {
        error();
    }
}