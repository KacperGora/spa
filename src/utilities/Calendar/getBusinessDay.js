import { getDay } from "date-fns";

export const getBusinessDay = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6;
};
