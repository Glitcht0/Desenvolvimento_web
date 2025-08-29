import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GerenteMineradora from "../entidades/gerente_mineradora";
import ServiçosUsuário from "./serviços-usuário";

export default class Serviçosgerentemineradora {
  constructor() {}

  static async cadastrargerentemineradora(request, response) {
    try {
      const { usuário_info, titulação, anos_experiência_empresarial } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
      const entityManager = getManager();

      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const gerentemineradora = GerenteMineradora.create({ usuário, titulação, anos_experiência_empresarial });
        await transactionManager.save(gerentemineradora);
        await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
      });

      return response.json({ status: Status.ATIVO, token });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  };

  static async buscargerentemineradora(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const gerentemineradora = await GerenteMineradora.findOne({ where: { usuário: cpf_encriptado }, relations: ["usuário"] });

      if (!gerentemineradora) {
        return response.status(404).json({ erro: "GerenteMineradora não encontrado." });
      }

      // O erro estava na linha abaixo, faltando uma propriedade ou tendo uma vírgula extra.
      // O código correto inclui a propriedade 'anos_experiência_empresarial' e fecha o objeto.
      return response.json({
        nome: gerentemineradora.usuário.nome,
        email: gerentemineradora.usuário.email,
        titulação: gerentemineradora.titulação,
        anos_experiência_empresarial: gerentemineradora.anos_experiência_empresarial
      });

    } catch (error) {
      return response.status(500).json({ erro: "Erro BD: buscargerentemineradora" });
    }
  };
}
