import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@avalabs/k2-components";

export function HomeCard({ title, body, to, isExternalLink = false }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea to={to} sx={{ height: "100%", py: 1 }}>
        <CardContent>
          <Typography variant="h5" color="secondary.light">
            {title}
          </Typography>
        </CardContent>
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
