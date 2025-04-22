import "./dashboard.scss";
import EditNameForm from "../../components/EditNameForm";
import AccountCard from "../../components/AccountCard";
import { selectUser } from "../../state/selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts } from "../../state/accountSlice";
import { useEffect } from "react";

function Dashboard() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser); // Récupère l'ID de l'utilisateur connecté
  const accounts = useSelector((state) => state.accounts.accounts); // Récupère les comptes depuis Redux
  const loading = useSelector((state) => state.accounts.loading); // Vérifie si les comptes sont en cours de chargement
  const error = useSelector((state) => state.accounts.error); // Récupère les erreurs éventuelles

  // Charger les comptes au montage du composant
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  // Filtrer tous les comptes où l'`id` est présent dans le tableau `userId`
  const userAccounts =
    accounts.filter((account) => account.userId.includes(id)) || [];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="bodyPage">
        <main className="main bg-dark">
          <div className="header">
            <h1>Welcome back</h1>
            <EditNameForm />
          </div>
          <AccountCard accounts={userAccounts} />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
