import servidor from "./servidor";
export function serviçoCadastrarGerenteTecnologia(gerente) { return servidor.post("/gerente-tecnologia", gerente); };
export function serviçoAtualizarGerenteTecnologia(gerente) { return servidor.patch("/gerente-tecnologia", gerente); };
export function serviçoBuscarGerenteTecnologia(cpf) { return servidor.get(`/gerente-tecnologia/${cpf}`); }





