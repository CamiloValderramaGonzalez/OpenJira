import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType = { type: "[Entry] - ADD-Entry"; payload: Entry };

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
        default:
            return state;
    }
};
