import { Perfil } from "../entidades/usuário";
export default function verificarPerfilGerenteMineradora(request, response, next) {
if (request.perfil === Perfil.GERENTEMINERADORA) return next();
else return response.status(401).json({ erro: "Acesso não autorizado." });
};