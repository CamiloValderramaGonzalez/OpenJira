import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useContext } from "react";
import { EntriesContext } from "../../context/entries/EntriesContext";
export const NewEntry = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext(EntriesContext);

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);

        setIsAdding(false);
        setTouched(false);
        setInputValue("");
    };

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            {isAdding ? (
                <>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        autoFocus
                        multiline
                        label="Nueva Entrada"
                        helperText={
                            inputValue.length <= 0 &&
                            touched &&
                            "Ingrese un valor"
                        }
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextChange}
                        onBlur={() => setTouched(true)}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Button onClick={() => setIsAdding(false)}>
                            Cancelar
                        </Button>
                        <Button
                            variant="outlined"
                            endIcon={<SaveOutlinedIcon />}
                            onClick={onSave}
                        >
                            Guardar
                        </Button>
                    </Box>{" "}
                </>
            ) : (
                <Button
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    fullWidth
                    variant="outlined"
                    onClick={() => setIsAdding(true)}
                >
                    Agregar Tarea
                </Button>
            )}
        </Box>
    );
};
