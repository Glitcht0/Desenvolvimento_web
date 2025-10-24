import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora"; // 🔄 alterado
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarDesignsLogosEmpresário as serviçoBuscarPatrocínioGerenteMineradora } from "../../serviços/serviços-gerente-mineradora"; // 🔄 alterado

import mostrarToast from "../../utilitários/mostrar-toast";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
 estilizarColunaConsultar, estilizarColumnHeader, estilizarDataTable, estilizarDataTablePaginator,
 estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
 from "../../utilitários/estilos";

export default function AdministrarPatrocínio() { // 🔄 alterado
 const referênciaToast = useRef(null);
 const { usuárioLogado } = useContext(ContextoUsuário);
 const { patrocínioConsultada, setPatrocínioConsultada } = useContext(ContextoGerenteMineradora); // 🔄 alterado
 const [listaPatrocínios, setListaPatrocínios] = useState([]); // 🔄 alterado
 const navegar = useNavigate();

 const opçõesPatrocínios = [
  { label: "minimalista", value: "minimalista" },
  { label: "tipográfico", value: "tipográfico" },
  { label: "vintage", value: "vintage" },
  { label: "abstrato", value: "abstrato" },
  { label: "corporativo", value: "corporativo" },
  { label: "futurista", value: "futurista" },
  { label: "orgânico", value: "orgânico" },
  { label: "mascote", value: "mascote" }
 ];

 function retornarPáginaInicial() { navegar("/pagina-inicial"); };

 function adicionarPatrocínio() { // 🔄 alterado
  setPatrocínioConsultada(null); // 🔄 alterado
  navegar("../cadastrar-patrocínio"); // 🔄 alterado
 };

 function ConsultarTemplate(patrocínio) { // 🔄 alterado
  function consultar() {
   setPatrocínioConsultada(patrocínio); // 🔄 alterado
   navegar("../cadastrar-patrocínio"); // 🔄 alterado
  };
  return (
   <Button
    icon="pi pi-search"
    className={estilizarBotãoTabela(usuárioLogado.cor_tema,
     patrocínioConsultada?.id === patrocínio.id)} // 🔄 alterado
    tooltip="Consultar Patrocínio" tooltipOptions={{ position: 'top' }}
    onClick={consultar}
   />
  );
 };

 function DropdownÁreaTemplate(opções) {
  function alterarFiltroDropdown(event) { return opções.filterCallback(event.value, opções.index); };
  return <Dropdown value={opções.value} options={opçõesPatrocínios} placeholder="Selecione"
   onChange={alterarFiltroDropdown} showClear />;
 };

 function BooleanBodyTemplate(patrocínio) { // 🔄 alterado
  if (patrocínio.concorrendo_contrato) return "Sim";
  else return "Não";
 };

 function BooleanFilterTemplate(opções) {
  function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
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
 };

 useEffect(() => {
  let desmontado = false;
  async function buscarPatrocíniosGerenteMineradora() { // 🔄 alterado
   try {
    const response = await serviçoBuscarPatrocínioGerenteMineradora(usuárioLogado.cpf); // 🔄 alterado
    if (!desmontado && response.data) { setListaPatrocínios(response.data); } // 🔄 alterado
   } catch (error) {
    const erro = error.response.data.erro;
    if (erro) mostrarToast(referênciaToast, erro, "error");
   }
  };
  buscarPatrocíniosGerenteMineradora(); // 🔄 alterado
  return () => desmontado = true;
 }, [usuárioLogado.cpf]);

 return (
  <div className={estilizarFlex()}>
   <Card title="Administrar Patrocínios" className={estilizarCard(usuárioLogado.cor_tema)}>
    <DataTable
     dataKey="id"
     size="small"
     paginator
     rows={TAMANHOS.MAX_LINHAS_TABELA}
     emptyMessage="Nenhum Patrocínio encontrado." // 🔄 alterado
     value={listaPatrocínios} // 🔄 alterado
     responsiveLayout="scroll"
     breakpoint="490px"
     removableSort
     className={estilizarDataTable()}
     paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}
    >
     <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
      headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} />

     <Column field="nome_empresa" header="Nome da Empresa" filter showFilterOperator={false}
      headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable />

     <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
      field="estilo_logo" header="Estilo da Logo" filter filterMatchMode="equals"
      filterElement={DropdownÁreaTemplate} showClearButton={false}
      showFilterOperator={false} showFilterMatchModes={false}
      filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />

     <Column field="aplicação_prevista" header="Aplicação Prevista" filter showFilterOperator={false}
      headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable />

     <Column field="concorrendo_contrato" header="Concorrendo ao contrato" filter
      showFilterOperator={false}
      headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable
      filterMatchMode="equals" filterElement={BooleanFilterTemplate}
      body={BooleanBodyTemplate} showClearButton={false} showAddButton={false}
      filterMenuClassName={estilizarFilterMenu()} dataType="boolean" />

    </DataTable>
    <Divider className={estilizarDivider()} />
    <Button className={estilizarBotãoRetornar()} label="Retornar"
     onClick={retornarPáginaInicial} />
    <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarPatrocínio} /> {/* 🔄 alterado */}
   </Card>
  </div>
 );
}
