import servidor from "./servidor";

export function serviçoLogarUsuário(login) {
  return servidor.post("/login", login);
};

export function serviçoVerificarCpfExistente(cpf) {
  return servidor.get(`/usuarios/verificar-cpf-existente/${cpf}`);
};