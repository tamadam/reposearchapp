import { Button, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NotFoundPage = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        minHeight: "100svh",
        gap: 2,
        py: 10,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          textTransform: "uppercase",
        }}
      >
        <SentimentDissatisfiedIcon fontSize="inherit" />
        Page not found
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" color="info">
        Go back to Home page
      </Button>
    </Grid>
  );
};

export default NotFoundPage;
