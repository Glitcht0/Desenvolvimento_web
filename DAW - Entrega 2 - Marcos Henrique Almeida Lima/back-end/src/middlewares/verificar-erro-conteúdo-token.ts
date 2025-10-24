import md5 from "md5";
import Usuário from "../entidades/usuário";
export default async function verificarErroConteúdoToken(request, response, next) {
const cpf_encriptado = md5(request.params.cpf || request.body.cpf);
const usuário_token = await Usuário.findOne({ where: { email: request.email_token } });
const usuário = await Usuário.findOne({ where: { cpf: cpf_encriptado } });

console.log("Usuário do token:", usuário_token);
console.log("Usuário solicitado:", usuário);
if (usuário_token.email !== usuário.email) return response.status(401).json
 ("Acesso não autorizado.");
 next();
}
