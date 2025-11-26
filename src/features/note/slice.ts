import {getSessionStorage, setSessionStorage} from "../../../utils/helper.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {ToasterMessage} from "@/components/Toast";

interface Note {
    id: string;
    note: string;
}

interface NoteState {
    notes: Note[]
}

const storedNote = JSON.parse(getSessionStorage('note') || '[]');


const initialState: NoteState = {
    notes: storedNote,
};


const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        updateNote: (state, action: PayloadAction<Note>) => {
            const existingNote = state.notes.find(c => c.id === action.payload.id);
            if (existingNote) {
                existingNote.note = action.payload.note;
            } else {
                state.notes.push(action.payload);
            }
            ToasterMessage({
                type: "success",
                message: "Successfully Added!",
                description: "Note Added Successfully.",
            });
            setSessionStorage("note", state.notes);
        },
        deleteNote: (state, action: PayloadAction<{ id: string }>) => {
         state.notes = state.notes.filter(c => c.id != action.payload.id);
                ToasterMessage({
                    type: "success",
                    message: "Successfully Deleted!",
                    description: "Note Deleted Successfully.",
                });
                setSessionStorage("note", state.notes);
        }
    }

})

export const {updateNote, deleteNote} = noteSlice.actions;
export default noteSlice;