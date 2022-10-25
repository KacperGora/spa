import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    meeting: {},
    meetings: [{ title: "Justyna Góra", date: new Date().toString() }],
    addMeeting: "",
    removeMeeting: "",
    pickedDate: "",
    service: "45",
    excludedTimes: [],
    changeEvent: false,
    key: "",
  },
  reducers: {
    setIsChangingEvent(state, action) {
      state.changeEvent = action.payload;
    },
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
      state.excludedTimes = [];
      for (let i = 0; i < action.payload.length; i++) {
        state.excludedTimes = [
          ...state.excludedTimes,
          ...action.payload[i].times,
        ];
      }
    },
    findKey(state, action) {
      state.key = action.payload;
    },
    setMeeting(state, action) {
      state.meeting = {
        title: action.payload.title,
        date: action.payload.date,
        end: action.payload.end,
        times: action.payload.times,
        serviceName: action.payload.serviceName,
        email: action.payload.email,
      };
      state.meetings = [...state.meetings, action.payload];
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
