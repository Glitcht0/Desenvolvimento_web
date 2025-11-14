import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora";


import { estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarCheckbox,
estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText,
estilizarLabel } from "../../utilitários/estilos";
export default function ConsultarInteresse() {
const { usuárioLogado } = useContext(ContextoUsuário);
const { participaçãoMineraçãoConsultado } = useContext(ContextoGerenteMineradora);
const dados = { nome_gerente_tecnologia: participaçãoMineraçãoConsultado?.gerente_mineradora?.usuário?.nome,
necessidade_bolsa: participaçãoMineraçãoConsultado?.necessidade_bolsa,
justificativa: participaçãoMineraçãoConsultado?.justificativa,
título_proposta: participaçãoMineraçãoConsultado?.proposta.título };
const navegar = useNavigate();
function retornarPesquisarInteresses() { navegar("../pesquisar-interesses"); };
function consultarGerenteMineradoraInteressado() {
navegar("../consultar-gerente-mineradora-interessado");
};












return (
<div className={estilizarFlex()}>
<Card title="Consultar Interesse" className={estilizarCard(usuárioLogado.cor_tema)}>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Gerente Mineradora*:</label>
<InputText name="nome_gerente"
className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}

value={dados.nome_gerente_tecnologia} disabled/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Necessidade de Bolsa*:</label>
<Checkbox name="necessidade_bolsa" checked={dados.necessidade_bolsa}
className={estilizarCheckbox()} autoResize disabled/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Justificativa*:</label>
<InputTextarea name="justificativa"
className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}

value={dados.justificativa} disabled/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Proposta*</label>
<InputText name="título_proposta"
className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}

value={dados.título_proposta} disabled/>
</div>
<Divider className={estilizarDivider()}/>
<div className={estilizarInlineFlex()}>
<Button className={estilizarBotãoRetornar()} label="Retornar"
onClick={retornarPesquisarInteresses}/>
<Button className={estilizarBotão()} label="Gerente Mineradora" onClick={consultarGerenteMineradoraInteressado}/>
</div>
</Card>
</div>
);
}