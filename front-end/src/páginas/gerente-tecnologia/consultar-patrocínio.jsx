// ARQUIVO: consultar-patrocínio.jsx

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarCheckbox,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputTextarea,
  estilizarLabel
} from "../../utilitários/estilos";

export default function ConsultarPatrocínio() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { PatrocínioConsultada, setGerenteMineradoraProponente } = useContext(ContextoGerenteTecnologia);
  const navegar = useNavigate();
   console.log("🔍 Dados recebidos do backend (PatrocínioConsultada):", PatrocínioConsultada);
  const dados = {
    gerente: PatrocínioConsultada?.gerentemineradora?.usuário?.nome || "",
    justificativa: PatrocínioConsultada?.justificativa || "",
    necessidade_bolsa: PatrocínioConsultada?.necessidade_bolsa || false
  };

  function retornar() {
    navegar("../pesquisar-patrocinios");
  }
  
  function consultarGerenteMineradora() {
  if (PatrocínioConsultada) setGerenteMineradoraProponente(PatrocínioConsultada.gerentemineradora);
  navegar("../consultar-gerente-mineradora");
  };

  return (
    <div className={estilizarFlex()}>
      <Card
        title="Consultar Patrocínio"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        {/* Gerente */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Gerente Responsável:</label>
          <InputText name="gerente" value={dados.gerente} disabled />
        </div>

        {/* Justificativa */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Justificativa:</label>
          <InputTextarea name="justificativa" value={dados.justificativa} disabled />
        </div>

        {/* Necessidade de Bolsa */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Necessita Bolsa:</label>
          <Checkbox name="necessidade_bolsa" checked={dados.necessidade_bolsa} disabled />
        </div>

        <Divider className={estilizarDivider()} />

        <div className={estilizarInlineFlex()}>
          <Button
            label="Retornar"
            className={estilizarBotãoRetornar()}
            onClick={retornar}
          />
        </div>

        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotão()} label="Gerente Mineradora" onClick={consultarGerenteMineradora}/>
        </div>
      </Card>
    </div>
  );
}
