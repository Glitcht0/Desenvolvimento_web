import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GerenteMineradora from "../entidades/gerente-mineradora";
import ServiçosUsuário from "./serviços-usuário";

export default class ServiçosGerenteMineradora {
  constructor() {}

  static async cadastrarGerenteMineradora(request, response) {
    try {
      const { usuário_info, titulação, anos_experiência_empresarial } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
      const entityManager = getManager();

      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const gerenteMineradora = GerenteMineradora.create({ usuário, titulação, anos_experiência_empresarial });
        await transactionManager.save(gerenteMineradora);
        await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
      });

      return response.json({ status: Status.ATIVO, token });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  };

  static async buscarGerenteMineradora(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const gerenteMineradora = await GerenteMineradora.findOne({ where: { usuário: cpf_encriptado }, relations: ["usuário"] });

      if (!gerenteMineradora) {
        return response.status(404).json({ erro: "GerenteMineradora não encontrado." });
      }

        return response.json({
        nome: gerenteMineradora.usuário.nome,
        email: gerenteMineradora.usuário.email,
        titulação: gerenteMineradora.titulação,
        anos_experiência_empresarial: gerenteMineradora.anos_experiência_empresarial
      });

    } catch (error) {
      return response.status(500).json({ erro: "Erro BD: buscarGerenteMineradora" });
    }
  };
}
