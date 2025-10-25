// Arquivo: src/rotas/rotas-gerente-mineradora.js

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário"; // Você precisa importar seu contexto de usuário aqui

export default function RotasGerenteMineradora() {
    const { usuarioLogado } = useContext(UsuárioContext); // Pega o usuário logado do contexto [cite: 922]

    // Verifica se o perfil é o correto [cite: 922]
    if (usuarioLogado.perfil === "gerente-mineradora") {
        return <Outlet />; // Se for, permite o acesso à rota filha (ex: AdministrarPatrocinios) [cite: 922]
    } else {
        return <Navigate to="/pagina-inicial" />; // Se não for, redireciona para a página inicial [cite: 922]
    }
}