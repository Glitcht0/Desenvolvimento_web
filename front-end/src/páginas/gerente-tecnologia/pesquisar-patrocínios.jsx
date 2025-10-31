// ARQUIVO: pesquisar-patrocínios.jsx

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteTecnologia from "../../contextos/contexto-gerente-tecnologia";
import { serviçoBuscarPatrocínios } from "../../serviços/serviços-gerente-tecnologia";
import mostrarToast from "../../utilitários/mostrar-toast";

import {
    TAMANHOS, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
    estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator,
    estilizarDivider, estilizarFilterMenu, estilizarFlex
} from "../../utilitários/estilos";

// 1. CORRIGIDO: O nome do componente deve ser sobre Patrocínios
export default function PesquisarPatrocínios() { 
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    
    // 2. CORRIGIDO: Desestruturar os estados de PATROCÍNIO do contexto
    // (Assumindo que os nomes no seu ProvedorGerenteTecnologia sejam estes)
    const { 
        PatrocínioConsultada, // <-- Mudou
        setPatrocínioConsultada, // <-- Mudou
        setPatrocínioSelecionada  // <-- Mudou (este nome já estava em administrar-participações)
    } = useContext(ContextoGerenteTecnologia);

    const [listaPatrocínios, setListaPatrocínios] = useState([]);
    const navegar = useNavigate();

    // Este Dropdown não parece ser relevante para Patrocínio, 
    // mas vou mantê-lo caso você queira filtrar por categoria de participação associada
    const opçõesCategoria = [
        { label: "Extração", value: "Extração" },
        { label: "Exploração", value: "Exploração" },
        { label: "Consultoria", value: "Consultoria" },
        { label: "Pesquisa Mineral", value: "Pesquisa Mineral" }
    ];

    function retornarCadastrarPatrocínio(){
        // 3. CORRIGIDO: Define o PATROCÍNIO selecionado ao retornar
        // (O nome "ParticipaçãoMineraçãoConsultada" não existe mais aqui)
        if (setPatrocínioSelecionada && PatrocínioConsultada) {
            setPatrocínioSelecionada(PatrocínioConsultada);
        }
        setPatrocínioConsultada(null); 
        navegar("../cadastrar-participacao-mineracao");
     };

    // 4. CORRIGIDO: O argumento agora é 'patrocínio'
    function ConsultarTemplate(patrocínio) { 
        return (
            <Button icon="pi pi-search"
                className={estilizarBotãoTabela(
                    usuárioLogado.cor_tema,
                    // 5. CORRIGIDO: Compara com o 'patrocínioConsultado'
                    PatrocínioConsultada?.id === patrocínio.id 
                )}
                tooltip="Consultar Patrocínio" // <-- Mudou
                tooltipOptions={{ position: 'top' }} 
                onClick={() => {
                    // 6. CORRIGIDO: Define o 'patrocínioConsultado'
                    setPatrocínioConsultada(patrocínio); 
                    // 7. CORRIGIDO: Navega para a rota de CONSULTAR PATROCÍNIO
                    navegar("../consultar-patrocinio"); 
                }}
            />
        );
    }

    // ... (DropdownÁreaTemplate permanece igual) ...
    function DropdownÁreaTemplate(opções) {
        function alterarFiltroDropdown(event) {
            return opções.filterCallback(event.value, opções.index);
        }

        return <Dropdown value={opções.value} options={opçõesCategoria} placeholder="Selecione"
                onChange={alterarFiltroDropdown} showClear />;
    }

    // Este useEffect já estava CORRETO (buscando patrocínios)
    useEffect(() => {
        let desmontado = false;
        async function buscarPatrocínios() { 
            try {
                const response = await serviçoBuscarPatrocínios(); 
                if (!desmontado && response.data) setListaPatrocínios(response.data); 
            } catch (error) { 
                mostrarToast(referênciaToast, error.response?.data?.erro || "Erro ao buscar patrocínios", "error"); 
            }
        }
        buscarPatrocínios();
        return () => { desmontado = true; };
    }, []);

    return (
        <div className={estilizarFlex()}>
            <Toast ref={referênciaToast} position="bottom-center"/>
            <Card title="Pesquisar Patrocínios" className={estilizarCard(usuárioLogado.cor_tema)}>
                <DataTable 
                    dataKey="id" 
                    size="small" 
                    paginator 
                    rows={TAMANHOS.MAX_LINHAS_TABELA}
                    emptyMessage="Nenhum patrocínio encontrado." // <-- Corrigido
                    value={listaPatrocínios} 
                    // ...
                    >
                    
                    <Column 
                        bodyClassName={estilizarColunaConsultar()} 
                        body={ConsultarTemplate}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                    
                    {/* As colunas de Patrocínio (já estavam corretas) */}
                    <Column 
                        field="gerente_mineradora.usuário.nome" 
                        header="Gerente Responsável" 
                        filter showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} 
                        sortable
                    />
                    <Column 
                        field="justificativa" 
                        header="Justificativa" 
                        filter showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} 
                        sortable
                    />
                    <Column 
                        field="necessidade_bolsa" 
                        header="Necessita Bolsa" 
                        sortable 
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                    <Column 
                        field="data_manifestação" 
                        header="Data" 
                        sortable 
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                   
                </DataTable>
                <Divider className={estilizarDivider()}/>
                <Button 
                    className={estilizarBotãoRetornar()} 
                    label="Retornar"
                    onClick={retornarCadastrarPatrocínio} 
                />
            </Card>
        </div>
    );
}