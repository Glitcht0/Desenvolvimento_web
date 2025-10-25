import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GerenteTecnologia from '../entidades/gerente-tecnologia';
import ServiçosUsuário from "./serviços-usuário";
import GerenteMineradora from "../entidades/gerente-mineradora"; //🗡️
import Patrocínio from "../entidades/patrocínio"; //🗡️
import ParticipaçãoMineração from "../entidades/participação-mineração"; //🗡️



export default class ServiçosGerenteTecnologia  {
constructor() {}

  
  //🗡️ ------------------1 Alteração feita usando Gerente Mineradora ------------------- 🗡️
static async cadastrarParticipaçãoMineração(request, response) {
  try {
    const { título, categoria, área_atuação, data_início, descrição, resultado, cpf } = request.body;

    const cpf_encriptado = md5(cpf);

    // Buscar gerente mineradora pelo usuário
    const gerente_mineradora = await GerenteMineradora.findOne({ where: { usuário: cpf_encriptado } });
    if (!gerente_mineradora) return response.status(404).json({ erro: "Gerente mineradora não encontrado." });

    // Checar se já existe participação igual
    const participaçõesMineração = await ParticipaçãoMineração.find({
      where: { gerente_mineradora, título }
    });
    if (participaçõesMineração.length > 0) 
      return response.status(404).json({ erro: "O gerente já cadastrou essa participação de mineração." });

    // Criar participação
    await ParticipaçãoMineração.create({
      título,
      categoria,
      área_atuação,
      data_início: new Date(data_início),
      descrição,
      resultado,
      gerente_mineradora
    }).save();

    return response.json();
  } catch (error) {
    return response.status(500).json({ erro: "Erro BD : cadastrarParticipaçãoMineração" });
  }
};

  //🗡️ ------------------------------------- 🗡️



//🗡️ -----------------2-------------------- 🗡️
static async removerInteresse(request, response) {
  try {
    const id = request.params.id;
    await ParticipaçãoMineração.delete(id);
    return response.json();
  } catch (error) { return response.status(500).json({ erro: "Erro BD : ParticipaçãoMineração" }); }
  };
//🗡️ ------------------------------------- 🗡️


//🗡️ ------------------3------------------- 🗡️
static async buscarParticipaçõesMineraçãoGerenteTecnologia(request, response) {
  try {
    const cpf_encriptado = md5(request.params.cpf);
    // Buscar participações onde o gerente_mineradora.usuário.cpf = cpf_encriptado
    const interesses = await ParticipaçãoMineração.createQueryBuilder('p')
      .leftJoinAndSelect('p.gerente_mineradora', 'gm')
      .leftJoinAndSelect('gm.usuário', 'u')
      .leftJoinAndSelect('p.patrocínios', 'pat')
      .leftJoinAndSelect('pat.gerentetecnologia', 'gt')
      .leftJoinAndSelect('gt.usuário', 'gtu')
      .where('u.cpf = :cpf', { cpf: cpf_encriptado })
      .getMany();
    return response.json(interesses);
  } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarParticipaçõesMineraçãoGerente" }); }
};
//🗡️ ------------------------------------- 🗡️


//🗡️ -------------------4------------------ 🗡️
static async buscarPatrocínios(request, response) {
  try {
    // Retorna patrocínios com informações do gerente de tecnologia e da participação de mineração
    const propostas = await Patrocínio.find({ relations: [
      "participações_mineração",
      "participações_mineração.gerente_mineradora",
      "participações_mineração.gerente_mineradora.usuário",
      "gerentetecnologia",
      "gerentetecnologia.usuário"
    ] });
    return response.json(propostas);
  } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarPatrocínios" }); }
  };

//🗡️ ------------------------------------- 🗡️




  
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