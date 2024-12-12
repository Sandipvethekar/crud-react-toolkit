import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'; // Import axios

// Create Action: createUser
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://67580e7060576a194d0e96ec.mockapi.io/crud-operation", data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Read Action: showuser
export const showuser = createAsyncThunk("showuser", async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://67580e7060576a194d0e96ec.mockapi.io/crud-operation");
        return response.data; // Return the data from the response
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Delete Action: deleteUser
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`https://67580e7060576a194d0e96ec.mockapi.io/crud-operation/${id}`);
        return response.data; // Return the deleted user's data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Update Action: updateUser
export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.put(`https://67580e7060576a194d0e96ec.mockapi.io/crud-operation/${data.id}`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data; // Return the updated data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Slice
export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: []
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;  // Update search state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(showuser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showuser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.users = state.users.filter((ele) => ele.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Updated user data:", action.payload);  // Log the payload received from the API
                if (action.payload && action.payload.id) {
                    // Map through users and update the user object if the ID matches
                    state.users = state.users.map((user) =>
                        user.id === action.payload.id ? action.payload : user
                    );
                } else {
                    console.error('User data or ID is missing:', action.payload);  // Handle missing data
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
