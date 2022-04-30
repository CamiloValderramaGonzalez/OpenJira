import React, { DragEvent, FC, useMemo, useContext } from "react";
import { List, Paper } from "@mui/material";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";

import styles from "./EntryList.module.css";

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { isDragging, endDragging } = useContext(UIContext);

    const { entries, updateEntry } = useContext(EntriesContext);

    const entriesByStatus = useMemo(
        () => entries.filter((entry) => entry.status === status),
        [entries, status]
    );

    const allowDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData("entryId");

        const entry = entries.find((ent) => ent._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    };

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ""}
        >
            <Paper
                sx={{
                    height: "calc(100vh - 150px)",
                    overflow: "scroll",
                    backgroundColor: "transparent",
                    "&::-webkit-scrollbar": { display: "none" },
                    padding: "0px 7px",
                }}
            >
                <List
                    sx={{
                        opacity: isDragging ? 0.2 : 1,
                        transition: "all .3s",
                    }}
                >
                    {entriesByStatus.map((entry) => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
