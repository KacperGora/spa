import { createSlice } from "@reduxjs/toolkit";


const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        meeting: {},
        meetings: [],
        addMeeting: '',
        removeMeeting: ''
    },
    reducers: {
        setMeeting(state, action) {
          state.meeting = {title: action.payload.title, date: action.payload.date}
        }, 
        addMeeting(state, payload){
            state.meetings.push(state.meeting)
        },
        removeMeeting(){
          
        }
    }
})

export const calendarActions = calendarSlice.actions
export default calendarSlice.reducer