import React, { useState } from "react";
import { Link } from "react-router-dom";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

import "react-pro-sidebar/dist/css/styles.css";
import "../Header.css";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  const location = useLocation();

  const { auth } = useAuth();

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarContent>
            <Menu iconShape="square">
              {/* menu items authorized by role */}
              {auth?.roles == "1" ? (
                <>
                  <MenuItem active={location.pathname == "/hlist"} icon={<FiHome />}>
                    Home
                    <Link to="/hlist" />
                  </MenuItem>
                  <MenuItem
                    active={location.pathname == "/UList"}
                    icon={<FaList />}
                  >
                    Users
                    <Link to="/UList" />
                  </MenuItem>
                </>
              ) : auth?.roles == "2" ? (
                <>
                  <MenuItem
                    active={location.pathname == "/plist"}
                    icon={<FaList />}
                  >
                    Home
                    <Link to="/plist" />
                  </MenuItem>
                </>
              ) : auth?.roles == "3" ? (
                <>
                  <MenuItem
                    active={location.pathname == "/plst"}
                    icon={<FaList />}
                  >
                    Home
                    <Link to="/plst" />
                  </MenuItem>
                </>
              ): auth?.roles == "4" ? (
                <>
                  <MenuItem
                    active={location.pathname == "/Insurance"}
                    icon={<FaList />}
                  >
                    Home
                    <Link to="/Insurance" />
                  </MenuItem>
                </>) :(
                <></>
              )}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square"></Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
