import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import md5 from "md5";
import { sign } from "jsonwebtoken";
import Usuário, { Perfil } from "../entidades/usuário";
import GerenteMineradora from "../entidades/gerente_mineradora";
import gerentetecnologia from "../entidades/gerente_tecnologia";
dotenv.config();
const SALT = 10;
const SENHA_JWT = process.env.SENHA_JWT;
export default class ServiçosUsuário {
  constructor() {}

  static async logarUsuário(request, response) {
    // Adicione este log para ver os dados recebidos na função
    console.log("Função logarUsuário iniciada. Dados recebidos:", request.body);
    const { cpf_ou_email, senha } = request.body;
    try {
      const usuário = await Usuário.findOne({
        where: [{ cpf: md5(cpf_ou_email) }, { email: cpf_ou_email }],
      });
      // Adicione este log para ver se o usuário foi encontrado
      console.log("Resultado da busca no banco de dados:", usuário);

      if (!usuário) {
        console.log("Usuário não encontrado.");
        return response.status(401).json({ erro: "Usuário não encontrado." });
      }

      console.log("Usuário encontrado. Verificando a senha...");
      const senhaCorreta = await bcrypt.compare(senha, usuário.senha);
      // Adicione este log para ver o resultado da comparação da senha
      console.log("Resultado da comparação da senha:", senhaCorreta);

      if (!senhaCorreta) {
        console.log("Senha incorreta.");
        return response.status(401).json({ erro: "Senha incorreta." });
      }

      console.log("Login bem-sucedido. Gerando token...");
      const token = sign({
        cpf: usuário.cpf,
        perfil: usuário.perfil,
        nome: usuário.nome
      }, SENHA_JWT, { expiresIn: '1h' });

      return response.status(200).json({ token, perfil: usuário.perfil });

    } catch (error) {
      console.error("Erro no serviço de login:", error);
      return response.status(500).json({ erro: "Erro no servidor ao tentar logar." });
    }
  }

  static async verificarCpfExistente(request, response) {
    console.log("Função verificarCpfExistente chamada. CPF recebido:", request.params.cpf);
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const usuário = await Usuário.findOne(cpf_encriptado);
      console.log("Resultado da busca no banco de dados:", usuário);

      if (usuário) {
        console.log("CPF encontrado. Retornando status 200 com dados.");
        return response.status(200).json({ dados: "CPF já cadastrado." });
      } else {
        console.log("CPF não encontrado. Retornando status 200 com dados nulos.");
        return response.status(200).json({ dados: null });
      }
    } catch (error) {
      console.error("Erro no serviço de verificação de CPF:", error);
      return response.status(500).json({ erro: "Erro BD: verificarCpfCadastrado" });
    }
  };


static async verificarCadastroCompleto(usuário: Usuário) {
switch(usuário.perfil) {
case Perfil.GERENTEMINERADORA:
const gerentemineradora = await GerenteMineradora.findOne({ where: { usuário: usuário.cpf },
relations: ["usuário"] });
if (!gerentemineradora) return false;
return true;
case Perfil.GERENTETECNOLOGIA:
const gerenteTecnologia = await gerentetecnologia.findOne({ where: { usuário: usuário.cpf },
relations: ["usuário"] });
if (!gerenteTecnologia) return false;
return true;
default: return;
}
};

static async cadastrarUsuário(usuário_informado) {
try {
const { cpf, nome, perfil, email, senha, questão, resposta, cor_tema } = usuário_informado;
const cpf_encriptado = md5(cpf);
const senha_encriptada = await bcrypt.hash(senha, SALT);
const resposta_encriptada = await bcrypt.hash(resposta, SALT);
const usuário = Usuário.create({ cpf: cpf_encriptado, nome, perfil, email,
senha: senha_encriptada, questão,
resposta: resposta_encriptada, cor_tema });
const token = sign({ perfil: usuário.perfil, email: usuário.email }, SENHA_JWT,
{ subject: usuário.nome, expiresIn: "1d" });
return { usuário, senha, token };
} catch (error) {
throw new Error("Erro BD: cadastrarUsuário");
};
};
};