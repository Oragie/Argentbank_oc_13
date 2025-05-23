// Récupérer l'URL de la base de données depuis les variables d'environnement
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

// Fonction pour récupérer les données depuis un endpoint
export async function fetchUserData(endpoint, options = {}) {
  try {
    console.log("Fetching:", `${DATABASE_URL}${endpoint}`, options);
    const response = await fetch(`${DATABASE_URL}${endpoint}`, options); // Construit l'URL complète
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json(); // Conversion de la réponse en JSON
    return data; // Retourne les données
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error; // Relance l'erreur pour la gestion en amont
  }
}

export async function getAccountsData() {
  try {
    const response = await fetch("/account-data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return [];
  }
}

export async function getAccountTransactions() {
  try {
    const response = await fetch("/account-transaction-data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return [];
  }
}
