import { Box, Paper, Typography, IconButton, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { projectsApi } from "@/api/Projects";
import { toast } from "react-toastify";
import { fetchProjects } from "@/slices/projects";
import EastIcon from "@mui/icons-material/East";
import NextLink from "next/link";

export default function ProjectList(props) {
  const { projects } = props;
  const { user } = useSelector(({ user }) => user.user);

  const dispatch = useDispatch();

  const handleDelete = async (projectId) => {
    const data = await projectsApi.deleteProject(user.userId, projectId);
    dispatch(fetchProjects(user.userId));
    toast.success(data);
  };

  return (
    <Grid container>
      {projects.map((project) => {
        if (!project?.deleted) {
          return (
            <Grid item sm={12} xs={12} md={6} lg={4}>
              <Paper
                elevation={24}
                key={project?.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                  borderRadius: "2ch",
                  alignItems: "center",
                  margin: "15px",
                }}
              >
                <Box sx={{}}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    {project?.projectName}
                  </Typography>
                  <Typography variant="subtitle2">{"6 months"}</Typography>
                </Box>
                <NextLink href={`/dashboard/projects/${project?.id}`}>
                  <IconButton>
                    <EastIcon></EastIcon>
                  </IconButton>
                </NextLink>
                {/* <IconButton onClick={() => handleDelete(project.id)}>
                  <Delete></Delete>
                </IconButton> */}
              </Paper>
            </Grid>
          );
        }
        return <></>;
      })}
      {/* <img src={user?.firstName} alt="" />
            <p>{user.firstName}</p> */}
    </Grid>
  );
}
