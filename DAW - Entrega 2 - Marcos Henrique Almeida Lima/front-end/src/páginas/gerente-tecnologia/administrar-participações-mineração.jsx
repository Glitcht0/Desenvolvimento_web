import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia"; // 🔄 alterado
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarParticipaçõesMineraçãoGerenteTecnologia as serviçoBuscarParticipaçõesMineraçãoGerenteTecnologia } from "../../serviços/serviços-designer-gráfico"; // 🔄 alterado
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
 estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator,
 estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
 from "../../utilitários/estilos";

export default function AdministrarParticipaçõesMineração() { // 🔄 alterado
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { participaçãoMineraçãoConsultada, setParticipaçãoMineraçãoConsultada, setPatrocínioSelecionado } = useContext(ContextoGerenteTecnologia); // 🔄 alterado
  const [listaParticipaçõesMineração, setListaParticipaçõesMineração] = useState([]); // 🔄 alterado
  const navegar = useNavigate();

  const opçõesEstiloLogo = [{ label: "minimalista", value: "minimalista" },
   { label: "tipográfico", value: "tipográfico" },
   { label: "vintage", value: "vintage" },
   { label: "abstrato", value: "abstrato" },
   { label: "corporativo", value: "corporativo" },
   { label: "futurista", value: "futurista" },
   { label: "orgânico", value: "orgânico" },
   { label: "mascote", value: "mascote" }];

  function retornarPáginaInicial() { navegar("/pagina-inicial"); };

  function adicionarParticipaçãoMineração() { // 🔄 alterado
    setParticipaçãoMineraçãoConsultada(null);
    setPatrocínioSelecionado(null);
    navegar("../cadastrar-participação-mineração"); // 🔄 alterado
  };

  function ConsultarTemplate(participaçãoMineração) { // 🔄 alterado
    function consultar() {
      setParticipaçãoMineraçãoConsultada(participaçãoMineração); // 🔄 alterado
      setPatrocínioSelecionado(null);
      navegar("../cadastrar-participação-mineração"); // 🔄 alterado
    };
    return (
      <Button icon="pi pi-search"
        className={estilizarBotãoTabela(usuárioLogado.cor_tema,
        participaçãoMineraçãoConsultada?.id === participaçãoMineração.id)} // 🔄 alterado
        tooltip="Consultar Participação Mineração" tooltipOptions={{ position: 'top' }} onClick={consultar}/> // 🔄 alterado
    );
  };

  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event) {
      return opções.filterCallback(event.value, opções.index);
    };
    return <Dropdown value={opções.value} options={opçõesEstiloLogo} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };

  function BooleanBodyTemplate(participaçãoMineração) { // 🔄 alterado
    if (participaçãoMineração.necessidade_contrato) return "Sim"; // 🔄 alterado
    else return "Não";
  };

  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
    return (
      <div>
        <label>Necessidade de Contrato:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
          onChange={alterarFiltroTriState}/>
      </div>
    );
  };

  useEffect(() => {
    let desmontado = false;
    async function buscarParticipaçõesMineraçãoGerenteTecnologia() { // 🔄 alterado
      try {
        const response = await serviçoBuscarParticipaçõesMineraçãoGerenteTecnologia(usuárioLogado.cpf); // 🔄 alterado
        if (!desmontado && response.data) setListaParticipaçõesMineração(response.data); // 🔄 alterado
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    };
    buscarParticipaçõesMineraçãoGerenteTecnologia(); // 🔄 alterado
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center"/>
      <Card title="Administrar Participações Mineração" className={estilizarCard(usuárioLogado.cor_tema)}> // 🔄 alterado
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma Participação Mineração encontrada." value={listaParticipaçõesMineração} // 🔄 alterado
          responsiveLayout="scroll" breakpoint="490px" removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>

          <Column field="patrocínio.gerenteMineradora.usuário.nome" header="Gerente Mineradora" filter // 🔄 alterado
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>

          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="patrocínio.estilo_logo" header="EstiloLogo" filter filterMatchMode="equals" // 🔄 alterado
            filterElement={DropdownÁreaTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable/>

          <Column field="patrocínio.nome_empresa" header="Patrocínio" filter showFilterOperator={false} // 🔄 alterado
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>

          <Column field="necessidade_contrato" header="Necessidade de Contrato" dataType="boolean" filter
            showFilterOperator={false} body={BooleanBodyTemplate}
            filterElement={BooleanFilterTemplate} filterMatchMode="equals" showClearButton={false}
            showAddButton={false} filterMenuClassName={estilizarFilterMenu()}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar"
          onClick={retornarPáginaInicial}/>
        <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarParticipaçãoMineração}/> // 🔄 alterado
      </Card>
    </div>
  );
}
