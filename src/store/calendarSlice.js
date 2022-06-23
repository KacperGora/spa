import { createSlice } from "@reduxjs/toolkit";


const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    meeting: {},
    meetings: [{ title: "Justyna Góra", date: "2022-06-10T15:00" }],
    addMeeting: "",
    removeMeeting: "",
    pickedDate: "",
    dateForAppointment: "",
    service: "45",
    excludedTimes: [],
  },
  reducers: {
    setTypeOfService(state, action) {
      state.service = action.payload;
    },
    setExcludedTimes(state, action) {
      state.excludedTimes = [...state.excludedTimes, action.payload];
    },
    setDate(state, action) {
      state.pickedDate = action.payload;
    },
    fetchMeetings(state, action) {
      state.meetings = action.payload;
      for (let i = 0; i < action.payload.length; i++) {
        state.excludedTimes = [
          ...state.excludedTimes,
          ...action.payload[i].times,
        ];
      }
    },
    setMeeting(state, action) {
      state.meeting = {
        title: action.payload.title,
        date: action.payload.date,
        end: action.payload.end,
        times: action.payload.times,
        serviceName: action.payload.serviceName
      };
      state.meetings = [...state.meetings, action.payload];
      state.excludedTimes = [...state.excludedTimes, ...action.payload.times];
    },
    addMeeting(state, payload) {
      // state.meetings.push(payload);
      // state.service = '45'
    },
    removeMeeting() {},
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
