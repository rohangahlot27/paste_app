import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const getInitialPastes = () => {
  try {
    const saved = localStorage.getItem("pastes");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    localStorage.removeItem("pastes"); // Clear invalid data
    return [];
  }
};

const initialState = {
  pastes: getInitialPastes()
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(p => p._id === updatedPaste._id);
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully");
      } else {
        toast.error("Paste not found");
      }
    },

    removeFromPastes: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter(p => p._id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Deleted Successfully");
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All Pastes Cleared");
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
