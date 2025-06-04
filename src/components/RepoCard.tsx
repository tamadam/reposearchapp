import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import type { GitHubRepo } from "../types";

type RepoCardProps = {
  repo: GitHubRepo;
};

const RepoCard = ({ repo }: RepoCardProps) => {
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
    <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Repo Info */}
          <Grid>
            <Typography fontWeight="bold">{name}</Typography>
            <Typography
              component="a"
              href={`https://github.com/${full_name}`}
              target="_blank"
            >
              {full_name}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="body2" color="text.secondary">
              Stars: {stargazers_count} | Forks: {forks_count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Watchers: {watchers_count} | Issues: {open_issues_count}
            </Typography>
          </Grid>
          {/* Description & Tags */}
          <Grid>
            <Typography variant="body2" mb={1}>
              {description || "No description."}
            </Typography>
          </Grid>
          <Grid>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {language && <Chip label={language} size="small" />}
              {topics?.slice(0, 3).map((topic: string) => (
                <Chip
                  key={topic}
                  label={topic}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
          {/* Timestamps */}
          <Grid>
            <Typography variant="body2">
              Created at: {new Date(created_at).toISOString().split("T")[0]}
            </Typography>
            <Typography variant="body2">
              Updated at: {new Date(updated_at).toISOString().split("T")[0]}
            </Typography>
          </Grid>

          {/* Avatar */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" mt={1} fontWeight="bold">
              By: {owner?.login || "unknown"}
            </Typography>
            <Link
              href={owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar alt={owner.login} src={owner.avatar_url} />
            </Link>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RepoCard;
