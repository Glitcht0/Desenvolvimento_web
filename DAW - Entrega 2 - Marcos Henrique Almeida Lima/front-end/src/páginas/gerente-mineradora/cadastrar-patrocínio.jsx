// 🔄 alterado: todos os nomes ajustados conforme instrução
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora"; // 🔄 alterado
import { serviçoAlterarPatrocínio, serviçoCadastrarPatrocínio, serviçoRemoverPatrocínio,
 serviçoBuscarAplicaçõesPrevistasPatrocínios } from "../../serviços/serviços-gerente-mineradora"; // 🔄 alterado
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
 from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRemover, estilizarBotãoRetornar, estilizarCard,
 estilizarCheckbox, estilizarDivCampo, estilizarDivider, estilizarDropdown, estilizarFlex,
 estilizarInlineFlex, estilizarInputText, estilizarInputTextarea, estilizarLabel }
from "../../utilitários/estilos";

export default function CadastrarPatrocínio() { // 🔄 alterado
const referênciaToast = useRef(null);
const { usuárioLogado } = useContext(ContextoUsuário);
const { patrocínioConsultado } = useContext(ContextoGerenteMineradora); // 🔄 alterado

const [dados, setDados] = useState({
 nome_empresa: patrocínioConsultado?.nome_empresa || "",
 estilo_logo: patrocínioConsultado?.estilo_logo || "",
 aplicação_prevista: patrocínioConsultado?.aplicação_prevista || "",
 data_início: patrocínioConsultado?.data_início || "",
 descrição: patrocínioConsultado?.descrição || "",
 concorrendo_contrato: patrocínioConsultado?.concorrendo_contrato || "",
 status_projeto: patrocínioConsultado?.status_projeto || ""
});

const [listaAplicaçõesPrevistas, setListaAplicaçõesPrevistas] = useState([]);
const [erros, setErros] = useState({});
const navegar = useNavigate();

const opçõesEstiloLogo = [{ label: "minimalista", value: "minimalista" },
 { label: "tipográfico", value: "tipográfico" },
 { label: "vintage", value: "vintage" },
 { label: "abstrato", value: "abstrato" },
 { label: "corporativo", value: "corporativo" },
 { label: "futurista", value: "futurista" },
 { label: "orgânico", value: "orgânico" },
 { label: "mascote", value: "mascote" }];

const opçõesStatusProjeto = [{ label: "rascunho", value: "rascunho" },
 { label: "em andamento", value: "em andamento" },
 { label: "aprovado", value: "aprovado" },
 { label: "concluído", value: "concluído" },
 { label: "cancelado", value: "cancelado" },
 { label: "revisão", value: "revisão" }];

function alterarEstado(event) {
 const chave = event.target.name || event.value;
 let valor = event.target.value || event.checked;
 setDados({ ...dados, [chave]: valor });
};

function validarCampos() {
 const { nome_empresa, estilo_logo, aplicação_prevista, data_início, descrição } = dados;
 let errosCamposObrigatórios = validarCamposObrigatórios({ nome_empresa, estilo_logo, aplicação_prevista, data_início, descrição });
 setErros(errosCamposObrigatórios);
 return checarListaVazia(errosCamposObrigatórios);
};

function retornarAdministrarPatrocínios() { // 🔄 alterado
 navegar("../administrar-patrocínios"); // 🔄 alterado
};

async function cadastrarPatrocínio() { // 🔄 alterado
 if (validarCampos()) {
  try {
   await serviçoCadastrarPatrocínio({ ...dados, cpf: usuárioLogado.cpf });
   mostrarToast(referênciaToast, "Patrocínio cadastrado com sucesso!", "sucesso"); // 🔄 alterado
  } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
 }
};

async function alterarPatrocínio() { // 🔄 alterado
 if (validarCampos()) {
  try {
   await serviçoAlterarPatrocínio({ ...dados, id: patrocínioConsultado.id }); // 🔄 alterado
   mostrarToast(referênciaToast, "Proposta alterada com sucesso!", "sucesso");
  } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
 }
};

async function removerPatrocínio() { // 🔄 alterado
 try {
  await serviçoRemoverPatrocínio(patrocínioConsultado.id); // 🔄 alterado
  mostrarToast(referênciaToast, "Patrocínio excluído com sucesso!", "sucesso"); // 🔄 alterado
 } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
};

function BotõesAções() {
 if (patrocínioConsultado) { // 🔄 alterado
  return (
   <div className={estilizarInlineFlex()}>
    <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornarAdministrarPatrocínios}/>
    <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerPatrocínio}/>
    <Button className={estilizarBotão()} label="Alterar" onClick={alterarPatrocínio}/>
   </div>
  );
 } else {
  return (
   <div className={estilizarInlineFlex()}>
    <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornarAdministrarPatrocínios}/>
    <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarPatrocínio}/>
   </div>
  );
 }
};

function nomeEmpresaFormulário() {
 if (patrocínioConsultado) return "Alterar Patrocínio"; // 🔄 alterado
 else return "Cadastrar Patrocínio"; // 🔄 alterado
};

useEffect(() => {
 async function buscarAplicaçõesPrevistasPatrocínios() { // 🔄 alterado
  try {
   const response = await serviçoBuscarAplicaçõesPrevistasPatrocínios(); // 🔄 alterado
   if (response.data) setListaAplicaçõesPrevistas(response.data);
  } catch (error) {
   const erro = error.response.data.erro;
   if (erro) mostrarToast(referênciaToast, erro, "error");
  }
 }
 buscarAplicaçõesPrevistasPatrocínios(); // 🔄 alterado
}, [])












return (
<div className={estilizarFlex()}>
<Toast ref={referênciaToast} onHide={retornarAdministrarDesignsLogos} position="bottom-center"/>
<Card title={nomeEmpresaFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Nome da Empresa*:</label>
<InputText name="nome_empresa"
 className={estilizarInputText(erros.nome_empresa, 400, usuárioLogado.cor_tema)}
value={dados.nome_empresa} onChange={alterarEstado}/>
<MostrarMensagemErro mensagem={erros.nome_empresa}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Estilo de Logo*:</label>
<Dropdown name="estilo_logo"
 className={estilizarDropdown(erros.estilo_logo, usuárioLogado.cor_tema)}
value={dados.estilo_logo} options={opçõesEstiloLogo} onChange={alterarEstado}
 placeholder="-- Selecione --"/>
<MostrarMensagemErro mensagem={erros.estilo_logo}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>
 Aplicações Previstas Cadastradas:</label>
<Dropdown name="aplicação_prevista" placeholder="-- Selecione --" showClear
className={estilizarDropdown(erros.aplicação_prevista, usuárioLogado.cor_tema)} filter
options={listaAplicaçõesPrevistas} onChange={alterarEstado}
 emptyMessage={"Nenhuma aplicação prevista cadastrada."}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Aplicação Prevista*:</label>
<InputText name="aplicação_prevista"
 className={estilizarInputText(erros.aplicação_prevista, 200, usuárioLogado.cor_tema)}
value={dados.aplicação_prevista} onChange={alterarEstado}/>
<MostrarMensagemErro mensagem={erros.aplicação_prevista}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Início*:</label>
<InputText name="data_início" type="date" value={dados.data_início}
className={estilizarInputText(erros.data_início, usuárioLogado.cor_tema)}
onChange={alterarEstado}/>
<MostrarMensagemErro mensagem={erros.data_início}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
<InputTextarea name="descrição" value={dados.descrição}
className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)}
onChange={alterarEstado} autoResize cols={40}/>
<MostrarMensagemErro mensagem={erros.descrição}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Concorrendo ao Contrato*:</label>
<Checkbox name="concorrendo_contrato" checked={dados.concorrendo_contrato}
className={estilizarCheckbox()} onChange={alterarEstado} autoResize/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Status do Projeto*:</label>
<Dropdown name="status_projeto"
 className={estilizarDropdown(erros.status_projeto, usuárioLogado.cor_tema)}
value={dados.status_projeto} options={opçõesStatusProjeto} onChange={alterarEstado}
 placeholder="-- Selecione --"/>
<MostrarMensagemErro mensagem={erros.status_projeto}/>
</div>
<Divider className={estilizarDivider()}/>
<BotõesAções/>
</Card>
</div>
 );
}
