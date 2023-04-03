import { createSlice } from '@reduxjs/toolkit';
import { projectsApi } from '@/api/Projects';


const slice = createSlice({
    name: 'projects',
    initialState: {
        projects: []
    },
    reducers: {
        fetchProjects(state, action) {
            state.projects = action.payload;
        },

    }
});


//user actions
export const fetchProjects = (userId) => async (dispatch) => {
    const data = await projectsApi.getProjects(userId)
    dispatch(slice.actions.fetchProjects(data));
};

export const { reducer } = slice;
