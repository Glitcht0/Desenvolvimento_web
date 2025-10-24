import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";
export default function RotasGerenteMineradora() {
const { usuárioLogado } = useContext(UsuárioContext);
if (usuárioLogado.perfil === "gerente-mineradora") return <Outlet/>
else return <Navigate to="/"/>;
}
