import { Perfil } from "../entidades/usuário";
export default function verificarPerfilGerenteMineradora(request, response, next) {
if (request.perfil === Perfil.GERENTE_MINERADORA) return next();
else return response.status(401).json({ erro: "Acesso não autorizado." });
};