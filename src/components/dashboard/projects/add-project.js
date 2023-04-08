import React, { useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";

export default function AddProject(props) {
  const { open, onClose, userId } = props;

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project name is required"),
      description: Yup.string().required("Description is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        const data = await projectsApi.createProject(values, userId)
        dispatch(fetchProjects(userId))
        onClose()
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="title" color={"white"}>
          Project Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "25px",
          }}
          onSubmit = {formik.handleSubmit}
        >
          <TextField
            fullWidth
            label="Project Name"
            name="projectName"
            error={Boolean(
              formik.touched.projectName && formik.errors.projectName
            )}
            helperText={formik.touched.projectName && formik.errors.projectName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.projectName}
          ></TextField>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows="3"
            name="description"
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            helperText={formik.touched.description && formik.errors.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
          ></TextField>
          <DialogActions>
            <Button variant="outlined" startIcon={<Cancel />} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<CheckCircle />} type='submit'>
              Start
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
