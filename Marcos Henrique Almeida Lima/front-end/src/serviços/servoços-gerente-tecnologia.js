import servidor from "./servidor";
export function serviçoCadastrarGerenteTecnologia(gerente) { return servidor.post("/gerentes-tecnologia", gerente); };
export function serviçoAtualizarGerenteTecnologia(gerente) { return servidor.patch("/gerentes-tecnologia", gerente); };
export function serviçoBuscarGerenteTecnologia(cpf) { return servidor.get(`/gerentes-tecnologia/${cpf}`); }





