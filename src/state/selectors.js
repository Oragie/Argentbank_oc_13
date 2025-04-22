// Sélecteurs pour accéder aux données de l'utilisateur dans le store

export const selectUser = (state) => state.user; // Récupère l'objet complet de l'utilisateur
export const selectFirstName = (state) => state.user.firstName; // Récupère le firstName de l'utilisateur
export const selectLastName = (state) => state.user.lastName; // Récupère le lastName de l'utilisateur
export const selectToken = (state) => state.login.token;
export const selectLoadingSession = (state) => state.login.loading;

// Sélecteurs pour accéder aux données des comptes et des transactions
export const selectAccounts = (state) => state.accounts.accounts; // Récupère les comptes
export const selectTransactions = (state) => state.accounts.transactions; // Récupère les transactions
export const selectAccountsLoading = (state) => state.accounts.loading; // Récupère l'état de chargement
export const selectAccountsError = (state) => state.accounts.error; // Récupère les erreurs
