import { Box, Typography, Stack, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

type ErrorMessageProps = {
  onRetry?: () => void;
};

const ErrorMessage = ({ onRetry }: ErrorMessageProps) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Stack spacing={2} alignItems="center">
        <Typography color="error" variant="h6">
          Something went wrong. Please try again.
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            color="error"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Retry
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ErrorMessage;
