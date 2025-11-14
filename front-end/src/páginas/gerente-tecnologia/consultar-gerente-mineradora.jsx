import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia";



import { estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider, estilizarFlex,
estilizarInlineFlex, estilizarInputText, estilizarLabel } from "../../utilitários/estilos";


export default function ConsultarGerenteMineradora() {
const { usuárioLogado } = useContext(ContextoUsuário);
const { gerenteMineradoraProponente } = useContext(ContextoGerenteTecnologia);
const dados = { nome_professor: gerenteMineradoraProponente?.usuário?.nome,
titulação: gerenteMineradoraProponente?.titulação,
anos_experiência_empresarial: gerenteMineradoraProponente?.anos_experiência_empresarial };
const navegar = useNavigate();
function retornarConsultarProposta() { navegar("/consultar-patrocinio"); };


return (
<div className={estilizarFlex()}>
<Card title="Consultar Gerente Mineradora" className={estilizarCard(usuárioLogado.cor_tema)}>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Gerente Mineradora*:</label>
<InputText name="nome_professor"
className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}

value={dados.nome_professor} disabled/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>Titulação*:</label>
<InputText name="titulação"
className={estilizarInputText(null, 150, usuárioLogado.cor_tema)}

value={dados.titulação} autoResize disabled/>
</div>
<div className={estilizarDivCampo()}>
<label className={estilizarLabel(usuárioLogado.cor_tema)}>
Anos de Experiência Empresarial*:</label>
<InputNumber name="anos_experiência_empresarial" size={5}
value={dados.anos_experiência_empresarial}

inputClassName={estilizarInputText(null, usuárioLogado.cor_tema)}
mode="decimal" min={1} disabled/>
</div>
<Divider className={estilizarDivider(dados.cor_tema)}/>
<div className={estilizarInlineFlex()}>
<Button className={estilizarBotãoRetornar()} label="Retornar"
onClick={retornarConsultarProposta}/>
</div>
</Card>
</div>
);
};