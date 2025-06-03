import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";

type NavMenuItem = {
  id: string;
  label: string;
  href: string;
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const navbarItems: NavMenuItem[] = [
    { id: "searchid", label: "Search", href: "/" },
    { id: "historyid", label: "History", href: "/history" },
  ];

  const dropdownItems: NavMenuItem[] = [
    { id: "page1id", label: "Page 1", href: "/page1" },
    { id: "page2id", label: "Page 2", href: "/page2" },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="info">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ mr: 2, textTransform: "uppercase" }}
        >
          Repo Search App
        </Typography>

        {navbarItems.map((navbarItem) => (
          <NavLink
            key={navbarItem.id}
            to={navbarItem.href}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Typography
                variant="button"
                sx={{
                  fontStyle: "italic",
                  padding: "1rem",
                  borderBottom: isActive ? "2px solid" : "none",
                }}
              >
                {navbarItem.label}
              </Typography>
            )}
          </NavLink>
        ))}

        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="medium"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseNavMenu}
        >
          {dropdownItems.map((dropdownItem) => (
            <MenuItem
              key={dropdownItem.id}
              component={NavLink}
              to={dropdownItem.href}
              onClick={handleCloseNavMenu}
            >
              {dropdownItem.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
