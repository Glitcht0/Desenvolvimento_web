import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";


export default function RotasGerenteTecnologia() {
const { usuárioLogado } = useContext(UsuárioContext);
if (usuárioLogado.perfil === "gerente-tecnologia") return <Outlet/>
else return <Navigate to="/"/>;
}
