import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora";


import { estilizarBotão, estilizarBotãoRetornar, estilizarCard,
estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText,
estilizarLabel } from "../../utilitários/estilos";
export default function ConsultarInteresse() {
const { usuárioLogado } = useContext(ContextoUsuário);
const { participaçãoMineraçãoConsultado, setGerenteTecnologiaInteressado } = useContext(ContextoGerenteMineradora);
// Mapar os campos corretos da participação para o objeto "dados" usado pela UI.
const dados = {
    título: participaçãoMineraçãoConsultado?.título,
    categoria: participaçãoMineraçãoConsultado?.categoria,
    área_atuação: participaçãoMineraçãoConsultado?.área_atuação,
    data_início: participaçãoMineraçãoConsultado?.data_início,
    descrição: participaçãoMineraçãoConsultado?.descrição,
    resultado: participaçãoMineraçãoConsultado?.resultado,
    nome_gerente_mineradora: participaçãoMineraçãoConsultado?.gerente_mineradora?.usuário?.nome
};
const navegar = useNavigate();
function retornarPesquisarInteresses() { navegar("../pesquisar-participacao-mineracao"); };

// --- LOG ADICIONADO AQUI ---
function consultarGerenteTecnologiaInteressado() {
  
  // 1. LOG PARA VERIFICAR O QUE ESTÁ SENDO ENVIADO
  console.log(
    "🟢 Enviando para o contexto (setGerenteTecnologiaInteressado):", 
    participaçãoMineraçãoConsultado.gerente_tecnologia
  );

  // 2. PASSE O OBJETO DO GERENTE PARA O CONTEXTO
  setGerenteTecnologiaInteressado(participaçãoMineraçãoConsultado.gerente_tecnologia);

  // 3. NAVEGUE
  navegar("../consultar-gerente-tecnologia");
};
// --- FIM DA ADIÇÃO ---

return (
<div className={estilizarFlex()}>
<Card title="Consultar Interesse" className={estilizarCard(usuárioLogado.cor_tema)}>
<div className={estilizarDivCampo()}>
    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Título:</label>
    <InputText name="título" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} value={dados.título} disabled />
</div>
<div className={estilizarDivCampo()}>
    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Categoria:</label>
    <InputText name="categoria" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} value={dados.categoria} disabled />
</div>
<div className={estilizarDivCampo()}>
    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Área de Atuação:</label>
    <InputText name="área_atuação" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} value={dados.área_atuação} disabled />
</div>
<div className={estilizarDivCampo()}>
    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data Início:</label>
    <InputText name="data_início" className={estilizarInputText(null, 200, usuárioLogado.cor_tema)} value={dados.data_início} disabled />
</div>
<div className={estilizarDivCampo()}>
    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição:</label>
    <InputTextarea name="descrição" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} value={dados.descrição} disabled />
</div>
<div className={estilizarDivCampo()}>
    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Resultado:</label>
    <InputText name="resultado" className={estilizarInputText(null, 200, usuárioLogado.cor_tema)} value={dados.resultado} disabled />
</div>
<div className={estilizarDivCampo()}>
    <label className={estilizarLabel(usuárioLogado.cor_tema)}>Gerente Mineradora:</label>
    <InputText name="gerente_mineradora" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} value={dados.nome_gerente_mineradora} disabled />
</div>
<Divider className={estilizarDivider()}/>
<div className={estilizarInlineFlex()}>
    <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornarPesquisarInteresses} />
    <Button className={estilizarBotão()} label="Gerente Tecnologia" onClick={consultarGerenteTecnologiaInteressado} />
</div>
</Card>
</div>
);
}