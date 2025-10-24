import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarGerenteMineradora from "../páginas/gerente-mineradora/cadastrar-gerente-mineradora";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarGerenteTecnologia from "../páginas/gerente-tecnologia/cadastrar-gerente-tecnologia";



import { ProvedorGerenteMineradora } from "../contextos/contexto-gerente-mineradora";
import { ProvedorGerenteTecnologia } from "../contextos/contexto-gerente-tecnologia";
import RotasGerenteMineradora from "./rotas-gerente-mineradora"
import RotasGerenteTecnologia from "./rotas-gerente-tecnologia"
import AdministrarPatrocínios from "../páginas/empresário/administrar-patrocínios";
import CadastrarPatrocínio from "../páginas/empresário/cadastrar-patrocínio";
import AdministrarParticipaçõesMineração from "../páginas/designer-gráfico/administrar-participações-mineração";
import CadastrarParticipaçãoMineração from "../páginas/designer-gráfico/cadastrar-participação-mineração";
import PesquisarPatrocínios from "../páginas/designer-gráfico/pesquisar-patrocínios";
import ConsultarPatrocínio from "../páginas/designer-gráfico/consultar-patrocínio";



export default function RotasAplicação() {
return (
    <BrowserRouter>
    <Routes>
    <Route element={<LogarUsuário/>} path="/"/>
    <Route element={<CadastrarUsuário/>} path="criar-usuario"/>
    <Route element={<RecuperarAcesso/>} path="recuperar-acesso"/>
    <Route element={<RotasUsuárioLogado/>}>
    <Route element={<PáginaInicial/>} path="pagina-inicial"/>
    <Route element={<CadastrarUsuário/>} path="atualizar-usuario"/>

    
    <Route element={<ProvedorGerenteMineradora><RotasGerenteMineradora/></ProvedorGerenteMineradora>}>
        <Route element={<CadastrarGerenteMineradora/>} path="cadastrar-gerente-mineradora"/>
        <Route element={<AdministrarPatrocínios/>} path="administrar-patrocinios"/>
        <Route element={<CadastrarPatrocínio/>} path="cadastrar-patrocinio"/>
    </Route>

    <Route element={<ProvedorGerenteTecnologia><RotasGerenteTecnologia/></ProvedorGerenteTecnologia>}>
        <Route element={<CadastrarGerenteTecnologia/>} path="cadastrar-gerente-tecnologia"/>
        <Route element={<AdministrarParticipaçõesMineração/>} path="administrar-participacoes-mineracao"/>
        <Route element={<CadastrarParticipaçãoMineração/>} path="cadastrar-participacao-mineracao"/>
        <Route element={<PesquisarPatrocínios/>} path="pesquisar-patrocinios"/>
        <Route element={<ConsultarPatrocínio/>} path="consultar-patrocinio"/>
    </Route>



</Route>
</Routes>
</BrowserRouter>
);
};