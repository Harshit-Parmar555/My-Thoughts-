import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Global-State/store";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

  return (
    <div className="Drawer-Container">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon
              style={{ color: "white", height: "40px", width: "40px" }}
            />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <ul className="Drawer">
              <li
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </li>
              <li
                onClick={() => {
                  navigate("/create");
                }}
              >
                Create Thought
              </li>
              <li
                onClick={() => {
                  navigate("/mythoughts");
                }}
              >
                My Thoughts
              </li>
              <li
                className="red"
                onClick={() => {
                  localStorage.removeItem("id");
                  dispatch(authActions.logout());
                  navigate("/login");
                }}
              >
                Logout
              </li>
            </ul>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
