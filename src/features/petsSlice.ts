import { createPet, deleatePet, getPet, getPets, updatePet } from "@/api/pets";
import type { PetCreate, PetRead, PetUpdate } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface PetsState {
  pets: PetRead[];
  selectedPet: PetRead | null;

  loading: {
    fetchAll: boolean;
    fetchOne: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };

  error: string | null;
}

const initialState: PetsState = {
  pets: [],
  selectedPet: null,
  loading: {
    fetchAll: false,
    fetchOne: false,
    create: false,
    update: false,
    delete: false,
  },

  error: null,
};

export const getPetsThunk = createAsyncThunk(
  "pets/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getPets();
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to load pets");
    }
  },
);

export const getPetThunk = createAsyncThunk(
  "pets/getone",
  async (id: number, { rejectWithValue }) => {
    try {
      return await getPet(id);
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to load pet");
    }
  },
);

export const createPetThunk = createAsyncThunk(
  "pets/create",
  async (data: PetCreate, { rejectWithValue }) => {
    try {
      return await createPet(data);
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to create pet");
    }
  },
);

export const updatePetThunk = createAsyncThunk(
  "pets/update",
  async (
    { id, data }: { id: number; data: PetUpdate },
    { rejectWithValue },
  ) => {
    try {
      return await updatePet(id, data);
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to update pet");
    }
  },
);

export const deletePetThunk = createAsyncThunk(
  "pets/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      return deleatePet(id);
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to deleate pet");
    }
  },
);

export const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    clearSelectedPet: (state) => {
      state.selectedPet = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getPetsThunk.pending, (state) => {
        state.loading.fetchAll = true;
      })
      .addCase(getPetsThunk.fulfilled, (state, action) => {
        state.loading.fetchAll = false;
        state.pets = action.payload;
      })
      .addCase(getPetsThunk.rejected, (state, action) => {
        state.loading.fetchAll = false;
        state.error = action.error.message ?? "Error loading pets";
      })
      .addCase(getPetThunk.pending, (state) => {
        state.loading.fetchOne = true;
      })
      .addCase(getPetThunk.fulfilled, (state, action) => {
        state.loading.fetchOne = false;
        state.selectedPet = action.payload;
      })
      .addCase(getPetThunk.rejected, (state, action) => {
        state.loading.fetchOne = false;
        state.error = action.error as string;
      })
      .addCase(createPetThunk.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createPetThunk.fulfilled, (state, action) => {
        state.loading.create = false;
        state.pets.push(action.payload);
      })
      .addCase(createPetThunk.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload as string;
      })
      .addCase(updatePetThunk.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updatePetThunk.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.pets.findIndex((p) => p.id === action.payload.id);

        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      .addCase(updatePetThunk.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload as string;
      })
      .addCase(deletePetThunk.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deletePetThunk.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.pets = state.pets.filter((p) => p.id !== action.meta.arg);

        if (state.selectedPet?.id === action.meta.arg) {
          state.selectedPet = null;
        }
      })
      .addCase(deletePetThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedPet } = petSlice.actions;
export default petSlice.reducer;
