// ARQUIVO: consultar-patrocínio.jsx

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import ContextoUsuario from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia";
import {
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

// 1. CORRIGIDO: Nome do componente
export default function ConsultarPatrocínio() {
  const { usuarioLogado } = useContext(ContextoUsuario);
  
  // 2. CORRIGIDO: Obter o 'patrocínioConsultado' do contexto
  const { patrocínioConsultado } = useContext(ContextoGerenteTecnologia); // <-- Mudou
  const navegar = useNavigate();

  // 3. CORRIGIDO: Mapear os dados do PATROCÍNIO consultado
  const dados = {
    gerente: patrocínioConsultado?.gerente_mineradora?.usuario?.nome || "", // <-- Mudou
    justificativa: patrocínioConsultado?.justificativa || "", // <-- Mudou
    necessidade_bolsa: patrocínioConsultado?.necessidade_bolsa || false, // <-- Mudou
    data_manifestacao: patrocínioConsultado?.data_manifestacao || "", // <-- Mudou
    observacoes: patrocínioConsultado?.observacoes || "", // <-- Mudou (se existir no seu patrocínio)
    status: patrocínioConsultado?.status || "" // <-- Mudou (se existir no seu patrocínio)
  };

  function retornar() {
    // 4. CORRIGIDO: Retornar para a tela de PESQUISA DE PATROCÍNIOS
    navegar("../pesquisar-patrocinios"); // <-- Mudou
  }

  return (
    <div className={estilizarFlex()}>
      {/* 5. CORRIGIDO: Título do Card */}
      <Card
        title="Consultar Patrocínio" // <-- Mudou
        className={estilizarCard(usuarioLogado.cor_tema)}
      >
        {/* Gerente */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Gerente Responsável:</label>
          <InputText name="gerente" value={dados.gerente} disabled /* ... */ />
        </div>

        {/* Justificativa */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Justificativa:</label>
          <InputTextarea name="justificativa" value={dados.justificativa} disabled /* ... */ />
        </div>

        {/* Necessidade de Bolsa */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Necessita Bolsa:</label>
          <Checkbox name="necessidade_bolsa" checked={dados.necessidade_bolsa} disabled /* ... */ />
        </div>

        {/* Data */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Data da Manifestação:</label>
          <InputText name="data_manifestacao" type="date" value={dados.data_manifestacao} disabled /* ... */ />
        </div>

        {/* Observações (MANTIDO, mas verifique sua entidade 'Patrocínio') */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Observações:</label>
          <InputTextarea name="observacoes" value={dados.observacoes} disabled /* ... */ />
        </div>

        {/* Status (MANTIDO, mas verifique sua entidade 'Patrocínio') */}
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Status:</label>
          <InputText name="status" value={dados.status} disabled /* ... */ />
        </div>

        <Divider className={estilizarDivider()} />

        <div className={estilizarInlineFlex()}>
          <Button
            label="Retornar"
            className={estilizarBotãoRetornar()}
            onClick={retornar}
          />
        </div>
      </Card>
    </div>
  );
}