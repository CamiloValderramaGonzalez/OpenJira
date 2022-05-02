import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1A2027",
        },
        error: {
            main: red[600],
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    backgroundColor: "#1E1E1E",
                },
            },
        },
    },
});
