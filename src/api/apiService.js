import {
  fetchUserData,
  getAccountTransactions,
  getAccountsData,
} from "./api.js";

// Fonction pour se connecter et stocker le token
export const login = async (email, password) => {
  try {
    // Effacer les anciennes données
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const response = await fetchUserData("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const { token } = response.body;

    if (token) {
      localStorage.setItem("token", token);
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Relance l'erreur pour la gestion en amont
  }
};

// Fonction pour s'inscrire
export const signup = async (email, password, firstName, lastName) => {
  const response = await fetchUserData("/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });

  return response;
};

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found, please log in");
  }

  const response = await fetchUserData("/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found, please log in");
  }

  const response = await fetchUserData("/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  return response;
};

// Fonction pour récupérer les données des comptes
export async function fetchAccountsData() {
  const response = await getAccountsData();

  return response; // Retourne les données des comptes
}

// Fonction pour récupérer les transactions des comptes
export async function fetchAccountTransactions() {
  const response = await getAccountTransactions();

  return response; // Retourne les données des transactions
}
