import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function ProjectList(props) {
  const { projects } = props;
  const {user} = useSelector(({user}) => user.user)

  return (
    <>
      {projects.map((project) => (
        <Paper elevation={24} key={project.id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>{project.projectName}</Typography>
          </Box>
        </Paper>
      ))}
            <img src={user?.firstName} alt="" />
            <p>{user.firstName}</p>

    </>
  );
}
