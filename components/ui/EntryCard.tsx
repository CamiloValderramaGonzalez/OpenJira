import React, { DragEvent, FC } from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { Entry } from "../../interfaces";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext);

    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("entryId", entry._id);
        startDragging();
    };

    const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
        endDragging();
    };

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: "pre-line" }}>
                        {entry.description}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        paddingRight: 2,
                    }}
                >
                    <Typography variant="body2">{entry.description}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
