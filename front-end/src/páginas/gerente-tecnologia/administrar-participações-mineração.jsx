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
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarParticipaçõesMineraçãoGerenteTecnologia } from "../../serviços/serviços-gerente-tecnologia";

import {
    TAMANHOS,
    estilizarBotão,
    estilizarBotãoRetornar,
    estilizarBotãoTabela,
    estilizarCard,
    estilizarColumnHeader,
    estilizarColunaConsultar,
    estilizarDataTable,
    estilizarDataTablePaginator,
    estilizarDivider,
    estilizarFilterMenu,
    estilizarFlex,
    estilizarTriStateCheckbox
} from "../../utilitários/estilos";








export default function AdministrarParticipaçõesMineração() {
    const referênciaToast = useRef(null);
    const navegar = useNavigate();

    const { usuárioLogado } = useContext(ContextoUsuário);
    const {  participaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado, setPatrocínioSelecionada } =
        useContext(ContextoGerenteTecnologia);

    const [listaParticipaçõesMineração, setListaParticipaçõesMineração] = useState([]);

    // Código novo e CORRETO
    const opçõesCategoria = [
        { label: "Extração", value: "Extração" },
        { label: "Exploração", value: "Exploração" },
        { label: "Consultoria", value: "Consultoria" },
        { label: "Pesquisa Mineral", value: "Pesquisa Mineral" }
    ];

    // Navegar para a página inicial
    function retornarPáginaInicial() {
        navegar("/pagina-inicial");
    }

    // Navegar para adicionar novo interesse
    function adicionarParticipaçãoMineração() {
        setParticipaçãoMineraçãoConsultado(null);
        setPatrocínioSelecionada(null);
        navegar("../cadastrar-participacao-mineracao");
    }

    // Botão de consulta de interesse
    function ConsultarTemplate(participação) {
        function consultar() {
            setParticipaçãoMineraçãoConsultado(participação);
            setPatrocínioSelecionada(null);
            navegar("../cadastrar-participacao-mineracao");
        }

        return (
            <Button
                icon="pi pi-search"
                className={estilizarBotãoTabela(
                    usuárioLogado.cor_tema,
                    participaçãoMineraçãoConsultado?.id === participação.id
                )}
                tooltip="Consultar Participação Mineração"
                tooltipOptions={{ position: 'top' }}
                onClick={consultar}
            />
        );
    }

    // Dropdown de categorias
    function DropdownÁreaTemplate(opções) {
        function alterarFiltroDropdown(event) {
            return opções.filterCallback(event.value, opções.index);
        }

        return (
            <Dropdown
                value={opções.value}
                options={opçõesCategoria}
                placeholder="Selecione"
                onChange={alterarFiltroDropdown}
                showClear
            />
        );
    }

    
  

    // Buscar interesses do gerente tecnologia ao carregar o componente
    useEffect(() => {
        let desmontado = false;

        async function buscarParticipaçõesMineração() {
            try {
                console.log("[CLIENTE] 📡 Buscando participações do CPF:", usuárioLogado.cpf);
                const response = await serviçoBuscarParticipaçõesMineraçãoGerenteTecnologia(usuárioLogado.cpf);
                
                console.log("[CLIENTE] 📥 Resposta bruta da API:", response);
                console.log("[CLIENTE] 📦 Dados recebidos (response.data):", response?.data);

                if (Array.isArray(response?.data)) {
                    console.log(`[CLIENTE] ✅ ${response.data.length} participações recebidas`);
                } else {
                    console.warn("[CLIENTE] ⚠️ O retorno não é um array:", typeof response?.data);
                }

                if (!desmontado && response.data) setListaParticipaçõesMineração(response.data);
            } catch (error) {
                console.error("[CLIENTE] ❌ Erro ao buscar participações:", error);
                mostrarToast(referênciaToast, error.response?.data?.erro || "Erro desconhecido", "error");
            }
        }

        buscarParticipaçõesMineração();
        return () => (desmontado = true);
    }, [usuárioLogado.cpf]);





    
    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} position="bottom-center" />
            {/* Corrigido: Título do Card */}
            <Card title="Administrar Participações de Mineração" className={estilizarCard(usuárioLogado.cor_tema)}>
                <DataTable
                    dataKey="id"
                    size="small"
                    paginator
                    rows={TAMANHOS.MAX_LINHAS_TABELA}
                    emptyMessage="Nenhuma participação encontrada."
                    value={listaParticipaçõesMineração}
                    responsiveLayout="scroll"
                    breakpoint="490px"
                    removableSort
                    className={estilizarDataTable()}
                    paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}
                >
                    <Column
                        bodyClassName={estilizarColunaConsultar()}
                        body={ConsultarTemplate}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />

                    {/* Campos reais conforme o backend */}
                    <Column
                        field="título"
                        header="Título"
                        sortable
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                    <Column
                        field="área_atuação"
                        header="Área de Atuação"
                        sortable
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                    <Column
                        field="data_início"
                        header="Data de Início"
                        sortable
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        body={(rowData) => new Date(rowData.data_início).toLocaleDateString()}
                    />
                    <Column
                        field="descrição"
                        header="Descrição"
                        sortable
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                </DataTable>

                <Divider className={estilizarDivider()} />
                <Button
                    className={estilizarBotãoRetornar()}
                    label="Retornar"
                    onClick={retornarPáginaInicial}
                />
                <Button
                    className={estilizarBotão()}
                    label="Adicionar"
                    onClick={adicionarParticipaçãoMineração}
                />
            </Card>
        </div>
    );
}
