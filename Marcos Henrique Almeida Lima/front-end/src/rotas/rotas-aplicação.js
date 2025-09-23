import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarGerenteMineradora from "../páginas/gerente-mineradora/cadastrar-gerente-mineradora";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarGerenteTecnologia from "../páginas/aluno/cadastrar-gerente-tecnologia";






export default function RotasAplicação() {
return (
<BrowserRouter>
<Routes>
<Route element={<LogarUsuário/>} path="/"/>
<Route element={<CadastrarUsuário/>} path="criar-usuario"/>
<Route element={<RecuperarAcesso/>} path="recuperar-acesso"/>
<Route element={<CadastrarGerenteTecnologia/>} path="cadastrar-gerente-tecnologia"/>

<Route element={<RotasUsuárioLogado/>}>
<Route element={<PáginaInicial/>} path="pagina-inicial"/>
<Route element={<CadastrarUsuário/>} path="atualizar-usuario"/>
<Route element={<CadastrarGerenteMineradora/>} path="cadastrar-gerente-mineradora"/>

</Route>
</Routes>
</BrowserRouter>
);
};