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
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia";
import { serviçoBuscarPatrocínios } from "../../serviços/serviços-gerente-tecnologia";
import mostrarToast from "../../utilitários/mostrar-toast";
import { TAMANHOS, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
    estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator,
    estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
 from "../../utilitários/estilos";

export default function PesquisarPatrocínios() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { patrocínioConsultado, setPatrocínioConsultado, setPatrocínioSelecionado }
        = useContext(ContextoGerenteTecnologia);
    const [listaPatrocínios, setListaPatrocínios] = useState([]);
    const navegar = useNavigate();
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

    function retornarCadastrarParticipaçãoMineração() {
        setPatrocínioSelecionado(patrocínioConsultado);
        setPatrocínioConsultado(null);
        navegar("../cadastrar-participação-mineração");
    }

    function ConsultarTemplate(patrocínio) {
        return (
            <Button icon="pi pi-search"
                className={estilizarBotãoTabela(usuárioLogado.cor_tema,
                    patrocínioConsultado?.id === patrocínio.id)}
                tooltip="Consultar Patrocínio" tooltipOptions={{ position: 'top' }}
                onClick={() => {
                    setPatrocínioConsultado(patrocínio);
                    navegar("../consultar-patrocínio");
                }}/>
        );
    }

    function DropdownÁreaTemplate(opções) {
        function alterarFiltroDropdown(event) {
            return opções.filterCallback(event.value, opções.index);
        }
        return <Dropdown value={opções.value} options={opçõesEstiloLogo} placeholder="Selecione"
            onChange={alterarFiltroDropdown} showClear />;
    }

    function BooleanBodyTemplate(patrocínio) {
        return patrocínio.concorrendo_contrato ? "Sim" : "Não";
    }

    function BooleanFilterTemplate(opções) {
        function alterarFiltroTriState(event) { return opções.filterCallback(event.value); }
        return (
            <div>
                <label>Concorrendo ao Contrato:</label>
                <TriStateCheckbox
                    className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)}
                    value={opções.value}
                    onChange={alterarFiltroTriState}/>
            </div>
        );
    }

    useEffect(() => {
        let desmontado = false;
        async function buscarPatrocínios() {
            try {
                const response = await serviçoBuscarPatrocínios();
                if (!desmontado && response.data) setListaPatrocínios(response.data);
            } catch (error) {
                mostrarToast(referênciaToast, error.response.data.erro, "error");
            }
        }
        buscarPatrocínios();
        return () => desmontado = true;
    }, [usuárioLogado.cpf]);

    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} position="bottom-center"/>
            <Card title="Pesquisar Patrocínios" className={estilizarCard(usuárioLogado.cor_tema)}>
                <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
                    emptyMessage="Nenhum Patrocínio encontrado." value={listaPatrocínios}
                    responsiveLayout="scroll" breakpoint="490px" removableSort
                    className={estilizarDataTable()}
                    paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>

                    <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
                    <Column field="gerenteTecnologia.usuário.nome" header="Nome do GerenteTecnologia" filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                    <Column field="nome_empresa" header="Nome da Empresa" filter showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                    <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        field="estilo_logo" header="Estilo da Logo" filter filterMatchMode="equals"
                        filterElement={DropdownÁreaTemplate} showClearButton={false}
                        showFilterOperator={false} showFilterMatchModes={false}
                        filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
                    <Column field="aplicação_prevista" header="Aplicação Prevista" filter showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                    <Column field="concorrendo_contrato" header="Concorrendo ao contrato" dataType="boolean" filter
                        showFilterOperator={false}
                        body={BooleanBodyTemplate} filterElement={BooleanFilterTemplate}
                        filterMatchMode="equals" showClearButton={false} showAddButton={false}
                        filterMenuClassName={estilizarFilterMenu()}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                </DataTable>
                <Divider className={estilizarDivider()}/>
                <Button className={estilizarBotãoRetornar()} label="Retornar"
                    onClick={retornarCadastrarParticipaçãoMineração}/>
            </Card>
        </div>
    );
}
