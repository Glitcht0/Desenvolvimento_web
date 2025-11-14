import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GerenteMineradora from "../entidades/gerente-mineradora";
import ServiçosUsuário from "./serviços-usuário";

import Patrocínio from "src/entidades/patrocínio"; //🗡️
import ParticipaçãoMineração from "src/entidades/participação-mineração";







export default class ServiçosGerenteMineradora {
  constructor() {}

  //🗡️========================== 99% de chance de dar erro aqui ==================================================//🗡️




  static async cadastrarPatrocínio(request, response) {
    try {
      const { necessidade_bolsa, justificativa, cpf } = request.body;

      const cpf_encriptado = md5(cpf);
      const gerente = await GerenteMineradora.findOne({ where: { usuário: cpf_encriptado }, relations: ["usuário"] });
      if (!gerente) return response.status(404).json({ erro: "Gerente mineradora não encontrado." });

      await Patrocínio.create({
        necessidade_bolsa,
        justificativa,
        gerentemineradora: gerente
        
        
        
      }).save();

      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : cadastrarPatrocínio" });
    }
  };


  static async buscarParticipaçõesMineraçãoPatrocínio(request, response) {
    try {
      const id_patrocínio = request.params.id_patrocínio;
      const participaçõesMineração = await ParticipaçãoMineração.find({ where: { patrocínio: { id: id_patrocínio } },
      relations: ["gerenteTecnologia", "gerenteTecnologia.usuário", "Patrocínio"]});
      return response.json(participaçõesMineração);
    } catch (error) { return response.status(500).json(
    { erro: "Erro BD : buscarParticipaçõesMineraçãoPatrocínio" }); }
  };

  static async buscarParticipaçõesMineraçãoGerenteMineradora(request, response) {
    try {
      const cpf = request.params.cpf;
      const cpf_encriptado = md5(cpf);
      
      const participaçõesMineração = await ParticipaçãoMineração.createQueryBuilder("p")
        .leftJoinAndSelect("p.gerente_mineradora", "gm")
        .leftJoinAndSelect("gm.usuário", "u")
        .where("u.cpf = :cpf", { cpf: cpf_encriptado })
        .getMany();
      
      return response.json(participaçõesMineração);
    } catch (error) { 
      return response.status(500).json({ erro: "Erro BD : buscarParticipaçõesMineraçãoGerenteMineradora" }); 
    }
  };

  static async alterarPatrocínio(request, response) {
    try {
      const { id, necessidade_bolsa, justificativa } = request.body;

      await Patrocínio.update(id, {
        necessidade_bolsa,
        justificativa
        // data_manifestação é automática, relacionamentos você não altera aqui
      });

      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : alterarPatrocínio" });
    }
  };

 static async removerPatrocínio(request, response) {
  try {
    const id = request.params.id;
    const patrocínio = await Patrocínio.findOne({ where: { id } });
    if (!patrocínio) return response.status(404).json({ erro: "Patrocínio não encontrado." });

    await Patrocínio.remove(patrocínio);
    return response.json();
  } catch (error) {
    return response.status(500).json({ erro: "Erro BD : removerPatrocínio" });
  }
  };

  static async buscarPatrocínioGerenteMineradora(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);

      const patrocínios = await Patrocínio.createQueryBuilder("p")
        .leftJoinAndSelect("p.gerentemineradora", "gm") // nome da relação correta
        .leftJoinAndSelect("gm.usuário", "u")
        .where("u.cpf = :cpf", { cpf: cpf_encriptado })
        .getMany();

      return response.json(patrocínios);
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarPatrocíniosGerenteMineradora" });
    }
  };

  static filtrarJustificativasEliminandoRepeticao(patrocinios: Patrocínio[]) {
    const únicas = patrocinios
      .filter((p, i, arr) => arr.findIndex(x => x.justificativa === p.justificativa) === i)
      .map(p => ({ label: p.justificativa, value: p.justificativa }));
    return únicas;
  }


  static async buscarÁreasAtuaçãoPatrocínio(request, response) {
  try {
  const propostas = await Patrocínio.find();
  const áreas_atuação = ServiçosGerenteMineradora.filtrarJustificativasEliminandoRepeticao(propostas);
  return response.json(áreas_atuação.sort());
  } catch (error) { return response.status(500).json
  ({ erro: "Erro BD : buscarÁreasAtuaçãoPatrocínio" }); }
  };


  //🗡️============================================================================//🗡️

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

  static async AtualizarGerenteMineradora(request, response) {
  console.log("AtualizarGerenteMineradora chamado");
  try {
  const { cpf, titulação, anos_experiência_empresarial } = request.body;
  const cpf_encriptado = md5(cpf);
  await GerenteMineradora.update({ usuário: { cpf: cpf_encriptado } },
  { titulação, anos_experiência_empresarial });
  return response.json();
  } catch (error) { return response.status(500).json({ erro: "Erro BD : AtualizarGerenteMineradora" }); }
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
