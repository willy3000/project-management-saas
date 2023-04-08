import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { Typography, Button, Box, Grid, IconButton } from "@mui/material";
import AddProject from "@/components/dashboard/projects/add-project";
// import { FormatColorReset } from "@mui/icons-material";
import Empty from "@/components/hocs/empty";
import AuthGuard from "@/components/hocs/auth-guard";
import { useDispatch, useSelector } from "react-redux";
import ProjectList from "@/components/dashboard/projects/project-list";
import { fetchProjects } from "@/slices/projects";
import { West } from "@mui/icons-material";
import NextLink from 'next/link'


export default function MyProjects() {
  const [open, setOpen] = useState(false);
  const { projects } = useSelector(({ projects }) => projects);
  const { user } = useSelector(({ user }) => user.user);

  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(false);
  };

  const getProjects = async () => {
    try {
      dispatch(fetchProjects(user?.userId));
      console.log("projects", projects);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  console.log(projects);

  return (
    <DashboardNavbar>
      {/* <AuthGuard> */}
      <Box sx={{ paddingX: "15px" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <NextLink href={'/dashboard/projects'}>
                    <IconButton>
                    <West sx={{cursor: 'pointer'}}/>
                    </IconButton>
                </NextLink>
              <Typography variant="subtitle1">Project Details</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>{"Project Details"}</Box>

      <AddProject {...{ open, onClose, userId: user.userId }}></AddProject>
      {/* </AuthGuard> */}
    </DashboardNavbar>
  );
}
