export const formatDate = (date: string): string => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

export const checkDate = (date: string): boolean => {
    const useBar = date.includes("/");
  
    if (useBar) {
      return true;
    } else {
      return false;
    }
  };

export const stringDateToDate = (dateString: string) => {
    const arrDateString = dateString.split("/");
    return new Date(Number(arrDateString[2]), Number(arrDateString[1])-1, Number(arrDateString[0]));
  };