import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import { serviçoCadastrarGerenteTecnologia, serviçoAtualizarGerenteTecnologia, serviçoBuscarGerenteTecnologia  }
from "../../serviços/serviços-gerente-tecnologia";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
from "../../utilitários/validações";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo,
estilizarDivider, estilizarDropdown, estilizarFlex, estilizarInlineFlex, estilizarInputMask,
estilizarInputText, estilizarLabel } from "../../utilitários/estilos";

export default function CadastrarGerenteTecnologia()  {
const referênciaToast = useRef(null);
const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
const [dados, setDados] = useState({ curso: "", ano_ingresso: "", data_nascimento: "",
telefone: "" });
const [erros, setErros] = useState({});
const [cpfExistente, setCpfExistente] = useState(false);
const navegar = useNavigate();
const opçõesCurso = [{ label: "Engenharia de Computação", value: "Engenharia de Computação" },
{ label: "Sistemas de Informação", value: "Sistemas de Informação" }];

function alterarEstado(event) {
const chave = event.target.name || event.value;
const valor = event.target.value;
setDados({ ...dados, [chave]: valor });
};

// Adicione a função 'validarCampos' que estava faltando
function validarCampos() {
let errosCamposObrigatórios;
errosCamposObrigatórios = validarCamposObrigatórios(dados);
setErros(errosCamposObrigatórios);
return checarListaVazia(errosCamposObrigatórios);
};

function títuloFormulário() {
if (usuárioLogado?.cadastrado) return "Alterar Gerente Tecnologia";
else return "Cadastrar Gerente Tecnologia";
};
async function cadastrarGerenteTecnologia() {
if (validarCampos()) {
try {
const response = await serviçoCadastrarGerenteTecnologia({ ...dados, usuário_info: usuárioLogado,
curso: dados.curso, ano_ingresso: dados.ano_ingresso,
data_nascimento: dados.data_nascimento, telefone: dados.telefone });
if (response.data)
setUsuárioLogado(usuário => ({ ...usuário, status: response.data.status,
token: response.data.token }));
// Atualize a mensagem do toast
mostrarToast(referênciaToast, "Gerente de Tecnologia cadastrado com sucesso!", "sucesso");
} catch (error) {
setCpfExistente(true);
mostrarToast(referênciaToast, error.response.data.erro, "erro");
}
}
};

async function atualizarGerenteTecnologia() {
if (validarCampos()) {
try {
const response = await serviçoAtualizarGerenteTecnologia({ ...dados, cpf: usuárioLogado.cpf });
if (response) mostrarToast(referênciaToast, "Gerente de Tecnologia atualizado com sucesso!", "sucesso");
} catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
}
};

function labelBotãoSalvar() {
if (usuárioLogado?.cadastrado) return "Alterar";
else return "Cadastrar";
};
function açãoBotãoSalvar() {
if (usuárioLogado?.cadastrado) atualizarGerenteTecnologia();
else cadastrarGerenteTecnologia();
};

function redirecionar() {
if (cpfExistente) {
setUsuárioLogado(null);
navegar("/criar-usuario");
} else {
setUsuárioLogado(usuárioLogado => ({ ...usuárioLogado, cadastrado: true }));
navegar("/pagina-inicial");
}
};

useEffect(() => {
let desmontado = false;
async function buscarDadosGerenteTecnologia() { // Corrigido o nome da função
try {
const response = await serviçoBuscarGerenteTecnologia(usuárioLogado.cpf); // Corrigida a chamada de serviço
if (!desmontado && response.data) {
setDados(dados => ({ ...dados, curso: response.data.curso,
ano_ingresso: response.data.ano_ingresso,
data_nascimento: response.data.data_nascimento, telefone: response.data.telefone }));
}
} catch (error) {
const erro = error.response.data.erro;
if (erro) mostrarToast(referênciaToast, erro, "erro");
}
}
if (usuárioLogado?.cadastrado) buscarDadosGerenteTecnologia(); // Corrigida a chamada de função
return () => desmontado = true;
}, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);

return (
<div className={estilizarFlex()}>
<Toast ref={referênciaToast} onHide={redirecionar} position="bottom-center"/>
<Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Curso*:</label>
<Dropdown name="curso" className={estilizarDropdown(erros.curso, usuárioLogado.cor_tema)}
value={dados.curso} options={opçõesCurso} onChange={alterarEstado}
placeholder="-- Selecione --"/>
<MostrarMensagemErro mensagem={erros.curso}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Ano de Ingresso*:</label>
<InputMask name="ano_ingresso" autoClear size={TAMANHOS.ANO} onChange={alterarEstado}
className={estilizarInputMask(erros.ano_ingresso, usuárioLogado.cor_tema)}
mask={ANO_MÁSCARA} value={dados.ano_ingresso}/>
<MostrarMensagemErro mensagem={erros.ano_ingresso}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Nascimento*:</label>
<InputText name="data_nascimento" type="date" value={dados.data_nascimento}
className={estilizarInputText(erros.data_nascimento, usuárioLogado.cor_tema)}
onChange={alterarEstado}/>
<MostrarMensagemErro mensagem={erros.data_nascimento}/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Telefone*:</label>
<InputMask name="telefone" autoClear size={TAMANHOS.TELEFONE} onChange={alterarEstado}
className={estilizarInputMask(erros.telefone, usuárioLogado.cor_tema)}
mask={TELEFONE_MÁSCARA} value={dados.telefone}/>
<MostrarMensagemErro mensagem={erros.telefone}/>
</div>
<Divider className={estilizarDivider(dados.cor_tema)}/>
<div className={estilizarInlineFlex()}>
<Button className={estilizarBotãoRetornar()} label="Retornar" onClick={redirecionar} />
<Button className={estilizarBotão()} label={labelBotãoSalvar()} onClick={açãoBotãoSalvar}/>
</div>
</Card>
</div>
);
};