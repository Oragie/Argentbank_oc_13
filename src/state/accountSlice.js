import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountsData, fetchAccountTransactions } from "../api/apiService";

// Thunk pour récupérer les données des comptes
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const accounts = await fetchAccountsData();
      return accounts; // Retourne les données des comptes
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk pour récupérer les transactions des comptes
export const fetchTransactions = createAsyncThunk(
  "accounts/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await fetchAccountTransactions();
      return transactions; // Retourne les données des transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Slice Redux pour gérer les comptes et les transactions
const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: [], // Tableau pour stocker les comptes
    transactions: [], // Tableau pour stocker les transactions
    loading: false, // Indicateur de chargement
    error: null, // Message d'erreur
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion des comptes
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Gestion des transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
