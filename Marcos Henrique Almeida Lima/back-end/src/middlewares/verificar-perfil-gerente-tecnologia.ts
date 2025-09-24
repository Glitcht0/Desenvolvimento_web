import { Perfil } from '../entidades/usuário';
export default function verificarPerfilGerenteTecnologia(request, response, next) {
if (request.perfil === Perfil.GERENTETECNOLOGIA) return next();
else return response.status(401).json({ erro: "Acesso não autorizado." });
};
