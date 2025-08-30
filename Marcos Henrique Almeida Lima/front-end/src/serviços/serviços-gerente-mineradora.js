

import servidor from "./servidor";
export function serviçoCadastrargerentemineradora(gerentemineradora)
{ return servidor.post("/professores", gerentemineradora); };
export function serviçoBuscargerentemineradora(cpf) { return servidor.get(`/professores/${cpf}`); };