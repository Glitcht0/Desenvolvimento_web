import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import {TAMANHOS, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider,
estilizarFlex, estilizarInlineFlex, estilizarInputMask, estilizarInputText, estilizarLabel }
from "../../utilitários/estilos";

export default function ConsultarGerenteTenologia() {
    const { usuárioLogado } = useContext(ContextoUsuário);
    // O gerente que interessa aqui é o gerente de tecnologia (vindo do contexto de gerente-mineradora)
    const { gerenteTecnologiaInteressado } = useContext(ContextoGerenteMineradora);
    
    // DEBUG COMPLETO
    console.log("🔵 Dados brutos recebidos em ConsultarGerenteTecnologia:", gerenteTecnologiaInteressado);
    console.log("🟢 gerenteTecnologiaInteressado?.usuário:", gerenteTecnologiaInteressado?.usuário);
    console.log("🟡 Tipo do objeto:", typeof gerenteTecnologiaInteressado);
    const dados = {
        nome: gerenteTecnologiaInteressado?.usuário?.nome,
        titulacao: gerenteTecnologiaInteressado?.titulacao,
        ano_ingresso: gerenteTecnologiaInteressado?.ano_ingresso,
        data_nascimento: gerenteTecnologiaInteressado?.data_nascimento,
        telefone: gerenteTecnologiaInteressado?.telefone,
        email: gerenteTecnologiaInteressado?.usuário?.email
    };
    const navegar = useNavigate();
    function retornarConsultarInteresse() { navegar("../consultar-participação-mineração"); };

return (
    <div className={estilizarFlex()}>
    <Card title="Consultar Gerente Tecnologia" className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
            <label className={estilizarLabel(usuárioLogado.cor_tema)}>Nome:</label>
            <InputText name="nome" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} value={dados.nome} disabled />
        </div>
        <div className={estilizarDivCampo()}>
            <label className={estilizarLabel(usuárioLogado.cor_tema)}>Titulação:</label>
            <InputText name="titulacao" className={estilizarInputText(null, 300, usuárioLogado.cor_tema)} value={dados.titulacao} disabled />
        </div>
        <div className={estilizarDivCampo()}>
            <label className={estilizarLabel(usuárioLogado.cor_tema)}>Ano de Ingresso:</label>
            <InputMask name="ano_ingresso" autoClear size={TAMANHOS.ANO} mask={ANO_MÁSCARA} value={dados.ano_ingresso} className={estilizarInputMask(null, usuárioLogado.cor_tema)} disabled />
        </div>
        <div className={estilizarDivCampo()}>
            <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Nascimento:</label>
            <InputText name="data_nascimento" type="date" value={dados.data_nascimento} className={estilizarInputText(null, usuárioLogado.cor_tema)} disabled />
        </div>
        <div className={estilizarDivCampo()}>
            <label className={estilizarLabel(usuárioLogado.cor_tema)}>Telefone:</label>
            <InputMask name="telefone" autoClear size={TAMANHOS.TELEFONE} mask={TELEFONE_MÁSCARA} className={estilizarInputMask(null, usuárioLogado.cor_tema)} value={dados.telefone} disabled />
        </div>
        <div className={estilizarDivCampo()}>
            <label className={estilizarLabel(usuárioLogado.cor_tema)}>Email:</label>
            <InputText name="email" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} value={dados.email} disabled />
        </div>
        <Divider className={estilizarDivider(usuárioLogado.cor_tema)} />
        <div className={estilizarInlineFlex()}>
            <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornarConsultarInteresse} />
        </div>
    </Card>
    </div>
);
};