import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia"; // 🔄 alterado
import { serviçoCadastrarParticipaçãoMineração, serviçoRemoverParticipaçãoMineração } from "../../serviços/serviços-gerente-tecnologia"; // 🔄 alterado
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios } from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRetornar, estilizarBotãoRemover, estilizarCard,
    estilizarCheckbox, estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex,
    estilizarInputText, estilizarInputTextarea, estilizarLabel } from "../../utilitários/estilos";

export default function CadastrarParticipaçãoMineração() { // 🔄 alterado
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { participaçãoMineraçãoConsultada, patrocínioSelecionado } = useContext(ContextoGerenteTecnologia); // 🔄 alterado
    const [dadosParticipação, setDadosParticipação] = useState({ // 🔄 alterado
        id_patrocínio: patrocínioSelecionado?.id || "",
        necessidade_contrato: participaçãoMineraçãoConsultada?.necessidade_contrato || "",
        justificativa: participaçãoMineraçãoConsultada?.justificativa || ""
    });
    const [errosParticipação, setErrosParticipação] = useState({});
    const navegar = useNavigate();

    function alterarEstado(event) { 
        const chave = event.target.name || event.value;
        let valor = event.target.value || event.checked;
        setDadosParticipação({ ...dadosParticipação, [chave]: valor });
    }

    function validarCampos() { 
        const { justificativa } = dadosParticipação;
        let erros = validarCamposObrigatórios({ justificativa });
        setErrosParticipação(erros);
        return checarListaVazia(erros);
    }

    function patrocínioLabel() { 
        if (participaçãoMineraçãoConsultada?.nome_empresa_patrocínio || patrocínioSelecionado)
            return "Patrocínio Selecionado*:";
        else return "Selecione um Patrocínio*:";
    }

    function irPesquisarPatrocínio() { navegar("../pesquisar-patrocínios"); } // 🔄 alterado
    function retonarAdministrarParticipaçõesMineração() { navegar("../administrar-participações-mineração"); } // 🔄 alterado

    async function cadastrarParticipaçãoMineração() { // 🔄 alterado
        if (validarCampos()) {
            try {
                await serviçoCadastrarParticipaçãoMineração({ ...dadosParticipação, cpf: usuárioLogado.cpf });
                mostrarToast(referênciaToast, "Participação Mineração cadastrada com sucesso!", "sucesso");
            } catch (error) {
                mostrarToast(referênciaToast, error.response.data.erro, "erro");
            }
        }
    }

    async function removerParticipaçãoMineração() { // 🔄 alterado
        try {
            await serviçoRemoverParticipaçãoMineração(participaçãoMineraçãoConsultada.id);
            mostrarToast(referênciaToast, "Participação Mineração removida com sucesso!", "sucesso");
        } catch (error) {
            mostrarToast(referênciaToast, error.response.data.erro, "erro");
        }
    }

    function BotõesAções() { 
        if (participaçãoMineraçãoConsultada) {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retonarAdministrarParticipaçõesMineração} />
                    <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerParticipaçãoMineração} />
                </div>
            );
        } else {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retonarAdministrarParticipaçõesMineração} />
                    <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarParticipaçãoMineração} />
                </div>
            );
        }
    }

    function tituloForm() { return participaçãoMineraçãoConsultada ? "Remover Participação Mineração" : "Cadastrar Participação Mineração"; } // 🔄 alterado

    function PatrocínioInputText() { // 🔄 alterado
        if (patrocínioSelecionado?.nome_empresa) {
            return <InputText name="nome_empresa_patrocínio"
                className={estilizarInputText(errosParticipação.nome_empresa_patrocínio, 400, usuárioLogado.cor_tema)}
                value={patrocínioSelecionado?.nome_empresa} disabled />
        } else if (participaçãoMineraçãoConsultada?.patrocínio?.nome_empresa) {
            return <InputText name="nome_empresa_patrocínio"
                className={estilizarInputText(errosParticipação.nome_empresa_patrocínio, 400, usuárioLogado.cor_tema)}
                value={participaçãoMineraçãoConsultada?.patrocínio?.nome_empresa} disabled />
        } else return null;
    }

    function BotaoSelecionar() { // 🔄 alterado
        if (!patrocínioSelecionado && !participaçãoMineraçãoConsultada) {
            return <Button className={estilizarBotão()} label="Selecionar" onClick={irPesquisarPatrocínio} />
        } else if (patrocínioSelecionado) {
            return <Button className={estilizarBotão()} label="Substituir" onClick={irPesquisarPatrocínio} />;
        } else return null;
    }

    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} onHide={retonarAdministrarParticipaçõesMineração} position="bottom-center" />
            <Card title={tituloForm()} className={estilizarCard(usuárioLogado.cor_tema)}>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>{patrocínioLabel()}</label>
                    <BotaoSelecionar />
                    <PatrocínioInputText />
                    <MostrarMensagemErro mensagem={errosParticipação.id} />
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Necessidade de Contrato*:</label>
                    <Checkbox name="necessidade_contrato" checked={dadosParticipação.necessidade_contrato}
                        className={estilizarCheckbox()} onChange={alterarEstado} autoResize />
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Justificativa*:</label>
                    <InputTextarea name="justificativa" value={dadosParticipação.justificativa}
                        className={estilizarInputTextarea(errosParticipação.descrição, usuárioLogado.cor_tema)}
                        onChange={alterarEstado} autoResize cols={40} />
                    <MostrarMensagemErro mensagem={errosParticipação.justificativa} />
                </div>
                <Divider className={estilizarDivider()} />
                <BotõesAções />
            </Card>
        </div>
    );
}
