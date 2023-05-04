import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";;
import { useState } from "react";
import userSlice from "../../zustand/userSlice";
import Drawer from '../Drawer'
import useAuthentication from "../../hooks/useAuthentication";
import "./index.css";
import { Link } from "react-router-dom";

function index() {
  const stateUsers = userSlice((state) => state.userState);
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const {logOut} = useAuthentication()

  const openDrawer = () => {
    setDrawerVisibility(true)
  };

  return (
    <div className="nav-bar">
      <div className="navigateBTN">
        <Link to='/chart'>
        <Button>Chart</Button>
        </Link>
        <Link to='/map'>
        <Button>Map</Button>
        </Link>
      </div>
      <p>{stateUsers?.displayName}</p>
      <div className="avatar">
        <Menu>
          <MenuButton>
            <Avatar
              style={{ width: "40px", height: "40px" }}
              name={`${stateUsers?.email}`}
              src={`${stateUsers?.photoURL}`}
            />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem onClick={openDrawer}>My Account</MenuItem>
              <MenuItem onClick={logOut}>Sing out</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        <Drawer visibility={drawerVisibility} setDrawerVisibility={setDrawerVisibility}/>
      </div>
    </div>
  );
}

export default index;
