

import servidor from "./servidor";
export function serviçoCadastrarProfessor(gerentemineradora)
{ return servidor.post("/professores", gerentemineradora); };
export function serviçoBuscarProfessor(cpf) { return servidor.get(`/professores/${cpf}`); };