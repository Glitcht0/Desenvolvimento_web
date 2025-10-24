import servidor from "./servidor";

export function serviçoCadastrarGerenteTecnologia(gerenteTecnologia) {
    console.log("[serviçoCadastrarGerenteTecnologia] Dados enviados:", gerenteTecnologia);
    return servidor.post("/gerente-tecnologia", gerenteTecnologia, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoAtualizarGerenteTecnologia(gerenteTecnologia) {
    console.log("[serviçoAtualizarGerenteTecnologia] Dados enviados:", gerenteTecnologia);
    return servidor.patch("/gerente-tecnologia", gerenteTecnologia, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoBuscarGerenteTecnologia(cpf) {
    console.log("[serviçoBuscarGerenteTecnologia] CPF enviado:", cpf);
    const token = window?.localStorage?.getItem('token');
    console.log("[serviçoBuscarGerenteTecnologia] Token Authorization:", token);
    return servidor.get(`/gerente-tecnologia/${cpf}`, {
        headers: {
            Authorization: token || undefined
        }
    });
}

export function serviçoCadastrarPatrocínio(patrocínio) {
    console.log("[serviçoCadastrarPatrocínio] Dados enviados:", patrocínio);
    return servidor.post("/gerente-tecnologia/patrocínios", patrocínio, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoRemoverPatrocínio(id) {
    console.log("[serviçoRemoverPatrocínio] ID enviado:", id);
    return servidor.delete(`/gerente-tecnologia/patrocínios/${id}`, {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};

export function serviçoBuscarPatrocíniosGerenteTecnologia(cpf) {
    console.log("[serviçoBuscarPatrocíniosGerenteTecnologia] CPF enviado:", cpf);
    const token = window?.localStorage?.getItem('token');
    return servidor.get(`/gerente-tecnologia/patrocínios/gerente-tecnologia/${cpf}`, {
        headers: {
            Authorization: token || undefined
        }
    });
};

export function serviçoBuscarPatrocínios() {
    console.log("[serviçoBuscarPatrocínios] Requisição geral de Patrocínios");
    return servidor.get("/gerente-tecnologia/patrocínios", {
        headers: {
            Authorization: window?.localStorage?.getItem('token') || undefined
        }
    });
};
