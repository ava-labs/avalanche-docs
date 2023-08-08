import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  ExternalLinkIcon,
  Stack,
  Typography,
  useTheme,
} from "@avalabs/k2-components";

export function HomeCard({ title, body, to, isExternalLink = false }) {
  const theme = useTheme();

  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea to={to} sx={{ height: "100%", py: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" color="secondary.light">
              {title}
            </Typography>
            {isExternalLink && (
              <ExternalLinkIcon
                color={theme.palette.secondary.light}
                size={20}
              />
            )}
          </Stack>
        </CardContent>
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
