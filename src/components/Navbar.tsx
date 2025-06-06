import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
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

const WhiteNavLink = styled(NavLink)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.8)",
  textDecoration: "none",
  margin: "0 0.5rem",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  "&:hover": {
    color: theme.palette.common.white,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-2px)",
  },
  "&.active": {
    color: theme.palette.common.white,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
}));

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
    <AppBar
      position="sticky"
      color="info"
      sx={{
        background: "linear-gradient(135deg, #0288d1 0%, #01579b 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mr: 4,
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "1px",
            background: "linear-gradient(to right, #ffffff, #e0f7fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Repo Search App
        </Typography>
        <Box>
          {navbarItems.map((navbarItem) => (
            <WhiteNavLink key={navbarItem.id} to={navbarItem.href}>
              {({ isActive }) => (
                <Typography
                  variant="button"
                  sx={{
                    padding: "1rem",
                    borderBottom: isActive ? "2px solid" : "none",
                    fontWeight: isActive ? "700" : "",
                  }}
                >
                  {navbarItem.label}
                </Typography>
              )}
            </WhiteNavLink>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="medium"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.1)",
            },
          }}
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
