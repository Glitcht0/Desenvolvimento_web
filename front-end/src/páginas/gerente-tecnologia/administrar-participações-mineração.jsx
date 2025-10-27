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
    const { ParticipaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado, setPatrocínioSelecionada } =
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
                    ParticipaçãoMineraçãoConsultado?.id === participação.id
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
                const response = await serviçoBuscarParticipaçõesMineraçãoGerenteTecnologia(usuárioLogado.cpf);
                if (!desmontado && response.data) setListaParticipaçõesMineração(response.data);
            } catch (error) {
                mostrarToast(referênciaToast, error.response.data.erro, "error");
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
                    // Corrigido: Mensagem de tabela vazia
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
                    
                    {/* Corrigido: Colunas da tabela para refletir sua entidade ParticipaçãoMineração */}
                    
                    <Column
                        // Baseado no seu back-end (serviços-gerente-tecnologia.ts)
                        field="gerente_mineradora.usuário.nome" 
                        header="Gerente da Mineradora" // Título corrigido
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    <Column
                        field="categoria" // Campo direto da entidade ParticipaçãoMineração
                        header="Categoria"
                        filter
                        filterMatchMode="equals"
                        filterElement={DropdownÁreaTemplate}
                        showClearButton={false}
                        showFilterOperator={false}
                        showFilterMatchModes={false}
                        filterMenuClassName={estilizarFilterMenu()}
                        showFilterMenuOptions={false}
                        sortable
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                    <Column
                        field="título" // Campo direto da entidade ParticipaçãoMineração
                        header="Título da Participação" // Título corrigido
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    <Column
                        field="área_atuação" // Adicionando um campo que existe na sua entidade
                        header="Área de Atuação"
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    
                    {/* // Removida: Coluna "Necessidade de bolsa"
                    // O campo 'necessidade_bolsa' não existe na sua entidade 'ParticipaçãoMineração'.
                    // Você pode adicionar outra coluna aqui se desejar.
                    */}
                    
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
