import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: grey[300],
        },
        error: {
            main: red.A400,
        },
    },
    components: {},
});
