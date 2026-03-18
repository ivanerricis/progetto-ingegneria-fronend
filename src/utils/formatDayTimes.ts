export const formatDaysTimes = (date: string) => {

    return new Date(date).toLocaleString("it-IT", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}