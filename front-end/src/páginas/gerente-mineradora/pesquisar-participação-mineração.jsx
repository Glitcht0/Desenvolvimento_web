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
import ContextoGerenteMineradora from "../../contextos/contexto-gerente-mineradora";
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarParticipaçõesMineraçãoGerenteMineradora } from "../../serviços/serviços-gerente-mineradora";
import { TAMANHOS, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator,
estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
from "../../utilitários/estilos";

export default function PesquisarParticipaçãoMineração() {
const referênciaToast = useRef(null);
const { usuárioLogado } = useContext(ContextoUsuário);
const {participaçãoMineraçãoConsultado, setParticipaçãoMineraçãoConsultado,
patrocínioConsultada } = useContext(ContextoGerenteMineradora);
const [listaPatrocínios, setListaPatrocínios] = useState([]);
const navegar = useNavigate();


const opçõesCategoria = [
  { label: "Extração", value: "Extração" },
  { label: "Exploração", value: "Exploração" },
  { label: "Consultoria", value: "Consultoria" },
  { label: "Pesquisa Mineral", value: "Pesquisa Mineral" }
];


function retornarCadastrarParticipaçãoMineração() {
setParticipaçãoMineraçãoConsultado(null);
navegar("../cadastrar-participacao-mineracao");
};
function ConsultarTemplate(interesse) {
return (
<Button icon="pi pi-search"
className={estilizarBotãoTabela(usuárioLogado.cor_tema,
participaçãoMineraçãoConsultado?.id === interesse.id)}
tooltip="Consultar Participação Mineração" tooltipOptions={{ position: 'top' }}
onClick={() => {
setParticipaçãoMineraçãoConsultado(interesse);
navegar("../consultar-participacao-mineracao");;
}}/>
);
};
function DropdownÁreaTemplate(opções) {
function alterarFiltroDropdown(event) {
return opções.filterCallback(event.value, opções.index); };
return <Dropdown value={opções.value} options={opçõesCategoria} placeholder="Selecione"
onChange={alterarFiltroDropdown} showClear />;
};


function BooleanBodyTemplate(participacao) {
  if (participacao.resultado) return participacao.resultado;
  else return "N/A";
};
function BooleanFilterTemplate(opções) {
function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
return (
<div>
<label>Resultado:</label>
<TriStateCheckbox
className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
onChange={alterarFiltroTriState}/>
</div>
);
};
useEffect(() => {
let desmontado = false;
async function buscarParticipaçõesMineraçãoGerenteMineradora() {
try {
const response = await serviçoBuscarParticipaçõesMineraçãoGerenteMineradora(usuárioLogado.cpf);
if (!desmontado && response.data) setListaPatrocínios(response.data);
} catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
};
buscarParticipaçõesMineraçãoGerenteMineradora();
return () => desmontado = true;
}, [usuárioLogado.cpf]);
return (
<div className={estilizarFlex()}>
<Toast ref={referênciaToast} position="bottom-center"/>
<Card title="Interesses Cadastrados" className={estilizarCard(usuárioLogado.cor_tema)}>
<DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
emptyMessage="Nenhum interesse encontrado." value={listaPatrocínios}
responsiveLayout="scroll" breakpoint="490px" removableSort
className={estilizarDataTable()}
paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
<Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
<Column field="título" header="Título" filter showFilterOperator={false}
headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
<Column field="gerente_mineradora.usuário.nome" header="Gerente Mineradora" filter showFilterOperator={false}
headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
<Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
field="categoria" header="Categoria" filter filterMatchMode="equals"
filterElement={DropdownÁreaTemplate} showClearButton={false}
showFilterOperator={false} showFilterMatchModes={false}
filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
<Column field="resultado" header="Resultado" dataType="string" filter
showFilterOperator={false} body={BooleanBodyTemplate}
filterElement={BooleanFilterTemplate} filterMatchMode="equals"
showClearButton={false} showAddButton={false}
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