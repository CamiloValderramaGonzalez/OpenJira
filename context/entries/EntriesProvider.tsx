import { useSnackbar } from "notistack";
import { FC, useEffect, useReducer } from "react";
import { entriesApi } from "../../apis";

import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

interface Props {
    children: JSX.Element;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>("/entries", {
                description,
            });

            dispatch({ type: "[Entry] - ADD-Entry", payload: data });
        } catch (error) {
            console.log(error);
        }
    };

    const updateEntry = async (
        { _id, description, status }: Entry,
        showSnackbar: boolean = false
    ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });

            dispatch({ type: "[Entry] - UPDATE-Entry", payload: data });

            if (showSnackbar)
                enqueueSnackbar("Entrada Actualizada", {
                    variant: "success",
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    },
                });
        } catch (error) {
            console.log("updateEntry", error);
        }
    };

    const getEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>("/entries");
        dispatch({ type: "[Entry] - GET-Entries", payload: data });
    };

    useEffect(() => {
        getEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
            {children}
        </EntriesContext.Provider>
    );
};
