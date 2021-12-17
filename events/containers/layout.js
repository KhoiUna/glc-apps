import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { appBarTheme } from "../themes/themes";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#46166b" />
        <meta name="description" content="GLC Events app" />
        <link rel="apple-touch-icon" href="/images/192x192.png" />
        <link rel="manifest" href="/manifest.json" />

        <title>GLC Events | Submit</title>
      </Head>

      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={appBarTheme}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                GLC Event Submission
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </header>

      <main>{children}</main>
    </>
  );
}
