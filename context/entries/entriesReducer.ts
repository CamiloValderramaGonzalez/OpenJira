import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
    | { type: "[Entry] - ADD-Entry"; payload: Entry }
    | { type: "[Entry] - UPDATE-Entry"; payload: Entry };

export const entriesReducer = (
    state: EntriesState,
    action: EntriesActionType
): EntriesState => {
    switch (action.type) {
        case "[Entry] - ADD-Entry":
            return {
                ...state,
                entries: [...state.entries, action.payload],
            };
        case "[Entry] - UPDATE-Entry":
            return {
                ...state,
                entries: state.entries.map((entry) => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                }),
            };
        default:
            return state;
    }
};
