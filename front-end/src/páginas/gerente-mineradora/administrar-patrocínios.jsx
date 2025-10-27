import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora";

// 🔸 Contextos

import ContextoUsuário from "../../contextos/contexto-usuário";

// 🔸 Serviços e utilitários
import { serviçoBuscarPatrocínioGerenteMineradora } from "../../serviços/serviços-gerente-mineradora";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  TAMANHOS,
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarColunaConsultar,
  estilizarColumnHeader,
  estilizarDataTable,
  estilizarDataTablePaginator,
  estilizarDivider,
  estilizarFilterMenu,
  estilizarFlex,
  estilizarTriStateCheckbox
} from "../../utilitários/estilos";

// 🔹 Componente principal
export default function AdministrarPatrocínios() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  console.log(ContextoGerenteMineradora);
  const { patrocínioConsultada, setPatrocínioConsultada } = useContext(ContextoGerenteMineradora);
  const [listaPatrocínios, setListaPatrocínios] = useState([]);
  const navegar = useNavigate();















  // 🔸 Opções de estilos de logo para o filtro
  const opçõesEstiloLogo = [
    { label: "minimalista", value: "minimalista" },
    { label: "tipográfico", value: "tipográfico" },
    { label: "vintage", value: "vintage" },
    { label: "abstrato", value: "abstrato" },
    { label: "corporativo", value: "corporativo" },
    { label: "futurista", value: "futurista" },
    { label: "orgânico", value: "orgânico" },
    { label: "mascote", value: "mascote" }
  ];

  // 🔸 Retorna à página inicial
  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }

  // 🔸 Adiciona novo design de logo
  function adicionarPatrocínio() {
    setPatrocínioConsultada(null);
    navegar("../cadastrar-patrocinio");
  }

  // 🔸 Template para botão de consulta na tabela
  function ConsultarTemplate(patrocínio) {
    function consultar() {
      setPatrocínioConsultada(patrocínio);
      navegar("../cadastrar-patrocinio");
    }

    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          patrocínioConsultada?.id === patrocínio.id
        )}
        tooltip="Consultar DesignLogo"
        tooltipOptions={{ position: "top" }}
        onClick={consultar}
      />
    );
  }

  // 🔸 Template para filtro Dropdown (estilo da logo)
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event) {
      return opções.filterCallback(event.value, opções.index);
    }

    return (
      <Dropdown
        value={opções.value}
        options={opçõesEstiloLogo}
        placeholder="Selecione"
        onChange={alterarFiltroDropdown}
        showClear
      />
    );
  }

// 🔸 Exibe “Sim” ou “Não” na tabela conforme booleano
  function BooleanBodyTemplate(patrocínio) {
    return patrocínio.necessidade_bolsa ? "Sim" : "Não"; // <-- Mude para "necessidade_bolsa"
  }
  // 🔸 Template para filtro booleano (tri-state)
  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) {
      return opções.filterCallback(event.value);
    }

    return (
      <div>
        <label>Concorrendo ao contrato:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)}
          value={opções.value}
          onChange={alterarFiltroTriState}
        />
      </div>
    );
  }

  // 🔸 Busca os designs de logos do empresário
  useEffect(() => {
    let desmontado = false;

    async function buscarPatrocíniosEmpresário() {
      try {
        const response = await serviçoBuscarPatrocínioGerenteMineradora(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setListaPatrocínios(response.data);
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "error");
      }
    }

    buscarPatrocíniosEmpresário();
    return () => (desmontado = true);
  }, [usuárioLogado.cpf]);

  // 🔸 Renderização
  return (
    <div className={estilizarFlex()}>
      <Card
        title="Administrar Patrocínios"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum patrocínio encontrado."
          value={listaPatrocínios}
          responsiveLayout="scroll"
          breakpoint="490px"
          removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}
        >
          {/* Botão de consulta */}
          <Column
            bodyClassName={estilizarColunaConsultar()}
            body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
          />

          {/* Coluna: Nome do Gerente */}
          <Column
            field="gerentemineradora.usuário.nome" // <-- Caminho para o nome
            header="Nome do Gerente"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          
            {/* Coluna: Justificativa */}
          <Column
            field="justificativa"
            header="Justificativa"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          

          {/* Coluna: Concorrendo ao contrato */}
          <Column
            field="necessidade_bolsa" // <-- CORRETO
            header="Necessidade de Bolsa" // <-- (Opcional) Mude o título para ficar igual
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
            filterMatchMode="equals"
            filterElement={BooleanFilterTemplate}
            body={BooleanBodyTemplate}
            showClearButton={false}
            showAddButton={false}
            filterMenuClassName={estilizarFilterMenu()}
            dataType="boolean"
          />
        </DataTable>

        <Divider className={estilizarDivider()} />

        {/* Botões de ação */}
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarPáginaInicial}
        />
        <Button
          className={estilizarBotão()}
          label="Adicionar"
          onClick={adicionarPatrocínio}
        />
      </Card>
    </div>
  );
}
