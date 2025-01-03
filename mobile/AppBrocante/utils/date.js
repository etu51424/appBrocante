export const adaptedDateFormat = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const isBefore = (filterDate, fleaMarketDate) => {
    const inputDate = new Date(filterDate);

    const comparisonDate = new Date(fleaMarketDate);

    console.log(inputDate.getTime() >= comparisonDate.getTime())
    return inputDate.getTime() >= comparisonDate.getTime();
}
