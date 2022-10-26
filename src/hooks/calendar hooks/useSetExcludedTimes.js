import { parseISO, subHours } from "date-fns";

import { useSelector } from "react-redux";

function useSetExcludedTimes(pickedDate) {
  const excludedEventsTimes = useSelector(
    (state) => state.calendar.excludedTimes
  );
  const formattedDate = new Date(pickedDate).toDateString();

  const excludedAtThisDay = excludedEventsTimes.filter(
    (date) => new Date(date).toDateString() === formattedDate
  );
  const arrExcludedTimes = [];

  excludedAtThisDay.forEach((time) =>
    arrExcludedTimes.push(subHours(parseISO(time), 2))
  );
  return arrExcludedTimes;
}

export default useSetExcludedTimes;
