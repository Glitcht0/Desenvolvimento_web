import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-designer-gráfico"; // 🔄 alterado
import { estilizarBotãoRetornar, estilizarCard, estilizarCheckbox, estilizarDivCampo,
 estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText, estilizarLabel }
 from "../../utilitários/estilos";

export default function ConsultarParticipaçãoMineração() { // 🔄 alterado
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { participaçãoMineraçãoConsultada, participaçãoMineração } = useContext(ContextoGerenteTecnologia); // 🔄 alterado
  const dados = {
    nome_gerente: participaçãoMineraçãoConsultada?.patrocínio?.gerenteMineradora?.usuário?.nome // 🔄 alterado
      || participaçãoMineração?.patrocínio?.gerenteMineradora?.usuário?.nome, // 🔄 alterado
    patrocínio: participaçãoMineraçãoConsultada?.nome_empresa || participaçãoMineração?.nome_empresa, // 🔄 alterado
    estilo_logo: participaçãoMineraçãoConsultada?.estilo_logo || participaçãoMineração?.estilo_logo, // 🔄 alterado
    aplicação_prevista: participaçãoMineraçãoConsultada?.aplicação_prevista || participaçãoMineração?.aplicação_prevista, // 🔄 alterado
    data_início: participaçãoMineraçãoConsultada?.data_início || participaçãoMineração?.data_início, // 🔄 alterado
    descrição: participaçãoMineraçãoConsultada?.descrição || participaçãoMineração?.descrição, // 🔄 alterado
    concorrendo_contrato: participaçãoMineraçãoConsultada?.concorrendo_contrato
      || participaçãoMineração?.concorrendo_contrato, // 🔄 alterado
    status_projeto: participaçãoMineraçãoConsultada?.status_projeto || participaçãoMineração?.status_projeto // 🔄 alterado
  };
  const navegar = useNavigate();

  function retornar() {
    if (participaçãoMineraçãoConsultada) navegar("../pesquisar-patrocínio"); // 🔄 alterado
    else if (participaçãoMineração) navegar("../cadastrar-participação-mineração"); // 🔄 alterado
  };

  return (
    <div className={estilizarFlex()}>
      <Card title="Consultar Participação Mineração" className={estilizarCard(usuárioLogado.cor_tema)}> // 🔄 alterado
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Gerente Mineradora*:</label> // 🔄 alterado
          <InputText name="nome_gerente"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_gerente} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Patrocínio*:</label> // 🔄 alterado
          <InputText name="patrocínio" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.patrocínio} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Estilo de Logo*:</label>
          <InputText name="estilo_logo"
            className={estilizarInputText(null, 200, usuárioLogado.cor_tema)}
            value={dados.estilo_logo} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Aplicação Prevista*:</label>
          <InputText name="aplicação_prevista"
            className={estilizarInputText(null, 350, usuárioLogado.cor_tema)}
            value={dados.aplicação_prevista} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Início*:</label>
          <InputText name="data_início" type="date" value={dados.data_início}
            className={estilizarInputText(null, usuárioLogado.cor_tema)} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
          <InputTextarea name="descrição" value={dados.descrição}
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Concorrendo ao Contrato*:</label>
          <Checkbox name="concorrendo_contrato" checked={dados.concorrendo_contrato}
            className={estilizarCheckbox(null)} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Status do Projeto*:</label>
          <InputText name="status_projeto"
            className={estilizarInputText(null, 100, usuárioLogado.cor_tema)}
            value={dados.status_projeto} autoResize disabled/>
        </div>
        <Divider className={estilizarDivider()}/>
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornar}/>
        </div>
      </Card>
    </div>
  );
}
