import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description:
                "Pendiente lorem dasfhjasdk dlsk sdlksa aslk31dmdps sdksl ",
            status: "pending",
            createAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description:
                "Terminada lorem dasfhjasdk dlsk sdlksa aslk31dmdps sdksl ",
            status: "finished",
            createAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description:
                "En progreso lorem dasfhjasdk dlsk sdlksa aslk31dmdps sdksl ",
            status: "in-progres",
            createAt: Date.now() - 2000000,
        },
    ],
};

interface Props {
    children: JSX.Element;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createAt: Date.now(),
            status: "pending",
        };

        dispatch({ type: "[Entry] - ADD-Entry", payload: newEntry });
    };

    const updateEntry = (entry: Entry) => {
        dispatch({ type: "[Entry] - UPDATE-Entry", payload: entry });
    };

    return (
        <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
            {children}
        </EntriesContext.Provider>
    );
};
