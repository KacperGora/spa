import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    meeting: {},
    meetings: [{ title: "Justyna Góra", date: "2022-06-10T15:00" }],
    addMeeting: "",
    removeMeeting: "",
    pickedDate: '',
    dateForAppointment: '',
    service: '45'
  },
  reducers: {
    setTypeOfService(state, action) {
      state.service = action.payload
    },
    setNewAppointment(state, action){
        state.dateForAppointment = action.payload
    },
    setDate(state, action) {
        state.pickedDate = action.payload
    },
    fetchMeetings(state, action) {
      state.meetings = action.payload;
    },
    setMeeting(state, action) {
      state.meeting = {
        title: action.payload.title,
        date: action.payload.date,
        end: action.payload.end
      };
      state.meetings = [...state.meetings, action.payload];
    },
    addMeeting(state, payload) {
      state.meetings.push(payload);
      state.service = '45'
    },
    removeMeeting() {},
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
