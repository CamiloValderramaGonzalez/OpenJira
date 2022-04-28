import { EntriesState } from "./";

type EntriesActionType = { type: "[Entries] - Action" };

export const entriesReducer = (
    state: EntriesState,
    action: EntriesActionType
): EntriesState => {
    switch (action.type) {
        case "[Entries] - Action":
            return {
                ...state,
            };
        default:
            return state;
    }
};
