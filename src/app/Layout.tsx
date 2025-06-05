import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ my: 8 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
