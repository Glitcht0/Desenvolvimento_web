

import servidor from "./servidor";
export function serviçoCadastrarGerenteMineradora(gerentemineradora)
{ return servidor.post("/gerente-mineradora", gerentemineradora); };
export function serviçoBuscarGerenteMineradora(cpf) { return servidor.get(`/gerente-mineradora/${cpf}`); };
export function serviçoAtualizarGerenteMineradora(gerentemineradora)
{ return servidor.patch("/gerente-mineradora", gerentemineradora); }


//🗡️ ------------------------------------- 🗡️

export function serviçoCadastrarPatrocínio(patrocínio) { 
    // Corresponde à rota: RotasGerenteMineradora.post("/patrocínio", ...)
    return servidor.post("/gerente-mineradora/patrocinio", patrocínio); 
};

export function serviçoAlterarPatrocínio(patrocínio) { 
    // Corresponde à rota: RotasGerenteMineradora.patch("/patrocínio", ...)
    return servidor.patch("/gerente-mineradora/patrocinio", patrocínio); 
};

export function serviçoRemoverPatrocínio(id) { 
    // Corresponde à rota: RotasGerenteMineradora.delete("/patrocínio/:id", ...)
    return servidor.delete(`/gerente-mineradora/patrocinio/${id}`); 
};

export function serviçoBuscarPatrocínioGerenteMineradora(cpf) { 
    // Corresponde à rota: RotasGerenteMineradora.get("/patrocínio/gerente-mineradora/:cpf", ...)
    return servidor.get(`/gerente-mineradora/patrocinio/gerente-mineradora/${cpf}`); 
};

export function serviçoBuscarÁreasAtuaçãoPatrocínio() { 
    // Corresponde à rota: RotasGerenteMineradora.get("/patrocínio/áreas-atuacao/", ...)
    return servidor.get("/gerente-mineradora/patrocinio/areas-atuacao/"); 
};

//🗡️ ------------------------------------- 🗡️