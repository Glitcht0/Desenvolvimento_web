import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";

// 🔸 Contextos
import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora";
import ContextoUsuário from "../../contextos/contexto-usuário";

// 🔸 Serviço para buscar dados
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
    estilizarFlex
} from "../../utilitários/estilos";

export default function AdministrarPatrocínios() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { patrocínioConsultada, setPatrocínioConsultada } = useContext(ContextoGerenteMineradora);
    const [listaPatrocínios, setListaPatrocínios] = useState([]);
    const navegar = useNavigate();

    function retornarPáginaInicial() {
        navegar("/pagina-inicial");
    }

    function adicionarPatrocínio() {
        setPatrocínioConsultada(null);
        navegar("../cadastrar-patrocínio");
    }

    function ConsultarTemplate(patrocínio) {
        function consultar() {
            setPatrocínioConsultada(patrocínio);
            navegar("../cadastrar-patrocínio");
        }

        return (
            <Button
                icon="pi pi-search"
                className={estilizarBotãoTabela(
                    usuárioLogado.cor_tema,
                    patrocínioConsultada?.id === patrocínio.id
                )}
                tooltip="Consultar Patrocínio"
                tooltipOptions={{ position: "top" }}
                onClick={consultar}
            />
        );
    }

    useEffect(() => {
        let desmontado = false;

        async function buscarPatrocíniosGerenteMineradora() {
            try {
                const response = await serviçoBuscarPatrocínioGerenteMineradora(usuárioLogado.cpf);
                if (!desmontado && response.data) {
                    setListaPatrocínios(response.data);
                }
            } catch (error) {
                const erro = error.response?.data?.erro;
                if (erro) mostrarToast(referênciaToast, erro, "error");
            }
        }

        buscarPatrocíniosGerenteMineradora();
        return () => (desmontado = true);
    }, [usuárioLogado.cpf]);

    return (
        <div className={estilizarFlex()}>
            <Card title="Administrar Patrocínios" className={estilizarCard(usuárioLogado.cor_tema)}>
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
                    <Column
                        bodyClassName={estilizarColunaConsultar()}
                        body={ConsultarTemplate}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    />
                    <Column
                        field="id"
                        header="ID"
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    <Column
                        field="necessidade_bolsa"
                        header="Necessidade de Bolsa"
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        body={(p) => (p.necessidade_bolsa ? "Sim" : "Não")}
                        sortable
                    />
                    <Column
                        field="justificativa"
                        header="Justificativa"
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    <Column
                        field="data_manifestação"
                        header="Data de Manifestação"
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        body={(p) => new Date(p.data_manifestação).toLocaleDateString()}
                        sortable
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
                    onClick={adicionarPatrocínio}
                />
            </Card>
        </div>
    );
}
