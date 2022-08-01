import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function CustomBreadcrumbs(props) {
  const { breadcrumbs } = props;
  return (
    <>
      <Box>
        <Container>
          {/* breadcrumbs */}
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href={`${breadcrumbs[0]?.href}`} passHref>
                <a>{breadcrumbs[0]?.name}</a>
              </Link>
              <Typography color="text.primary">{breadcrumbs[1]?.name}</Typography>
            </Breadcrumbs>
          </div>
        </Container>
      </Box>
    </>
  );
}