import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { appBarTheme } from "../../themes/themes";

export default function EventsViewDialog({
  toggleOpenEventView,
  openEventView,
  eventName,
}) {
  return (
    <Dialog fullScreen open={openEventView} onClose={toggleOpenEventView}>
      <AppBar sx={{ ...appBarTheme, position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleOpenEventView}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            View event
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <img
          width={150}
          src={`https://api.qrserver.com/v1/create-qr-code/?data=https://glc-events.vercel.app?eventName=${eventName}`}
        />
      </div>

      <div style={{ textAlign: "center", margin: "1rem" }}>
        <a
          href={`https://glc-events.vercel.app?eventName=${eventName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h6" component="div">
            {`https://glc-events.vercel.app?eventName=${eventName}`}
          </Typography>
        </a>
      </div>
    </Dialog>
  );
}
