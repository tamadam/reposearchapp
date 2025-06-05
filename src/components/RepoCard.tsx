import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { GitHubRepo } from "../types";
import {
  BugReport,
  Code,
  Event,
  Update,
  ForkRight,
  Star,
  Visibility,
} from "@mui/icons-material";

type RepoCardProps = {
  repo: GitHubRepo;
};

const RepoCard = ({ repo }: RepoCardProps) => {
  const theme = useTheme();

  const {
    name,
    full_name,
    description,
    stargazers_count,
    forks_count,
    watchers_count,
    open_issues_count,
    created_at,
    updated_at,
    owner,
    language,
    topics,
  } = repo;

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Header with name and avatar */}
          <Grid size={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Link
                    href={`https://github.com/${full_name}`}
                    target="_blank"
                    underline="hover"
                    color="inherit"
                  >
                    {full_name}
                  </Link>
                </Typography>
              </Box>
              <Link href={owner.html_url} target="_blank" rel="noopener">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">{owner.login}</Typography>
                  <Avatar
                    alt={owner.login}
                    src={owner.avatar_url}
                    sx={{ width: 32, height: 32 }}
                  />
                </Stack>
              </Link>
            </Stack>
          </Grid>

          {/* Description */}
          <Grid size={12}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {description || "No description provided."}
            </Typography>
          </Grid>

          {/* Stats row */}
          <Grid size={12}>
            <Stack
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
              sx={{ color: theme.palette.text.secondary }}
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Star fontSize="small" />
                <Typography variant="body2">{stargazers_count}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <ForkRight fontSize="small" />
                <Typography variant="body2">{forks_count}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Visibility fontSize="small" />
                <Typography variant="body2">{watchers_count}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <BugReport fontSize="small" />
                <Typography variant="body2">{open_issues_count}</Typography>
              </Stack>
              {language && (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Code fontSize="small" />
                  <Typography variant="body2">{language}</Typography>
                </Stack>
              )}
            </Stack>
          </Grid>

          {/* Topics */}
          {topics && topics.length > 0 && (
            <Grid size={12}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {topics.map((topic: string) => (
                  <Chip
                    key={topic}
                    label={topic}
                    size="small"
                    variant="outlined"
                    component="a"
                    href={`https://github.com/topics/${topic}`}
                    target="_blank"
                    clickable
                  />
                ))}
              </Stack>
            </Grid>
          )}

          {/* Dates */}
          <Grid size={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ color: theme.palette.text.secondary }}
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Event fontSize="small" />
                <Typography variant="caption">
                  Created: {new Date(created_at).toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Update fontSize="small" />
                <Typography variant="caption">
                  Updated: {new Date(updated_at).toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RepoCard;
