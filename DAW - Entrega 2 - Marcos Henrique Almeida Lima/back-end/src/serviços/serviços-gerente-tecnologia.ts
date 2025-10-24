import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GerenteTecnologia from '../entidades/gerente-tecnologia';
import ServiçosUsuário from "./serviços-usuário";
export default class ServiçosGerenteTecnologia  {
constructor() {}



  static async cadastrarGerenteTecnologia(request, response) {
    try {
      const { usuário_info, titulacao, ano_ingresso, data_nascimento, telefone } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
      const entityManager = getManager();

      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const gerente = GerenteTecnologia.create({ usuário, titulacao, ano_ingresso, data_nascimento, telefone });
        await transactionManager.save(gerente);
        await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }







  static async atualizarGerenteTecnologia(request, response) {
    try {
      const { cpf, titulacao, ano_ingresso, data_nascimento, telefone } = request.body;
      const cpf_encriptado = md5(cpf);
      await GerenteTecnologia.update(
        { usuário: { cpf: cpf_encriptado } },
        { titulacao, ano_ingresso, data_nascimento, telefone }
      );
      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : atualizarGerenteTecnologia" });
    }
  }



  static async buscarGerenteTecnologia(request, response) {
    console.log("buscarGerenteTecnologia chamado");
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const gerente = await GerenteTecnologia.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"]
      });
      if (!gerente) return response.status(404).json({ erro: "Gerente de tecnologia não encontrado." });
      
      return response.json({
        nome: gerente.usuário.nome,
        email: gerente.usuário.email,
        titulacao: gerente.titulacao,
        ano_ingresso: gerente.ano_ingresso,
        data_nascimento: gerente.data_nascimento,
        telefone: gerente.telefone
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarGerenteTecnologia" });
    }
  }
}