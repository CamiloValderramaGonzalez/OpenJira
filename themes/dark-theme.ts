import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1A2027",
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
