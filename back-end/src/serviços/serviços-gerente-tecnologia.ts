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
    const { título, categoria, área_atuação, data_início, descrição, resultado, cpf, id_patrocínio } = request.body;
    console.log("📥 Dados recebidos:", request.body);
    

    const cpf_encriptado = md5(cpf);
    console.log("🔐 CPF encriptado:", cpf_encriptado);

    const gerente_tecnologia = await GerenteTecnologia.findOne({
      where: { usuário: { cpf: cpf_encriptado } },
      relations: ["usuário"]
    });
    console.log("👤 Gerente tecnologia encontrado:", gerente_tecnologia);

    if (!gerente_tecnologia)
      return response.status(404).json({ erro: "Gerente tecnologia não encontrado." });

    // Buscar o patrocínio para obter o gerente mineradora
    let gerente_mineradora = null;
    if (id_patrocínio) {
      const patrocínio = await Patrocínio.findOne({
        where: { id: id_patrocínio },
        relations: ["gerentemineradora"]
      });
      console.log("🏢 Patrocínio encontrado:", patrocínio);
      
      if (patrocínio && patrocínio.gerentemineradora) {
        gerente_mineradora = patrocínio.gerentemineradora;
        console.log("⛏️ Gerente mineradora encontrado:", gerente_mineradora);
      }
    }

    const participaçõesMineração = await ParticipaçãoMineração.find({
      where: { gerente_tecnologia, título }
    });
    console.log("🔎 Participações existentes:", participaçõesMineração);

    if (participaçõesMineração.length > 0)
      return response.status(400).json({ erro: "O gerente já cadastrou essa participação de mineração." });

    const nova = ParticipaçãoMineração.create({
      título,
      categoria,
      área_atuação,
      data_início: new Date(data_início),
      descrição,
      resultado,
      gerente_tecnologia,
      gerente_mineradora
    });
    console.log("🧱 Nova participação:", nova);

    await nova.save();
    console.log("✅ Participação salva com sucesso!");

    // Se um patrocínio foi informado, associe-o à participação recém-criada.
    if (id_patrocínio) {
      try {
        const pat = await Patrocínio.findOne({ where: { id: id_patrocínio } });
        if (pat) {
          // A entidade Patrocínio possui a propriedade 'participações_mineração' que referencia a participação
          pat.participações_mineração = nova as any; // tipagem flexível
          await pat.save();
          console.log(`🔗 Patrocínio (id=${id_patrocínio}) associado à participação (id=${nova.id})`);
        } else {
          console.warn(`⚠️ Patrocínio com id=${id_patrocínio} não encontrado para associar.`);
        }
      } catch (err) {
        console.error(`❌ Erro ao associar patrocínio id=${id_patrocínio}:`, err?.message || err);
      }
    }

    return response.json({ sucesso: true });
  } catch (error) {
    console.error("💥 Erro detalhado ao cadastrar participação:", error);
    
    return response.status(500).json({ erro: "Erro BD : cadastrarParticipaçãoMineração", detalhe: error.message });
  }
}


  //🗡️ ------------------------------------- 🗡️



//🗡️ -----------------2-------------------- 🗡️
static async removerParticipaçãoMineração(request, response) {
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
    console.log("[server] 📡 Buscando participações do CPF:", request.params.cpf);
    console.log("[server] 🔐 CPF encriptado:", cpf_encriptado);

    const interesses = await ParticipaçãoMineração.createQueryBuilder('p')
      .leftJoinAndSelect('p.gerente_tecnologia', 'gt')
      .leftJoinAndSelect('gt.usuário', 'u')
      .leftJoinAndSelect('p.patrocínios', 'pat')
      .leftJoinAndSelect('pat.gerentemineradora', 'gm')
      .leftJoinAndSelect('gm.usuário', 'gmu')
      .where('u.cpf = :cpf', { cpf: cpf_encriptado })
      .getMany();

    console.log("[server] 📦 Participações encontradas:", interesses.length);
    console.log("[server] 🧾 Dados retornados:", interesses);

    return response.json(interesses);
  } catch (error) {
    console.error("[server] 💥 Erro detalhado ao buscar participações:", error);
    return response.status(500).json({ erro: "Erro BD : buscarParticipaçõesMineraçãoGerente", detalhe: error.message });
  }
}


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
      "gerentetecnologia.usuário",
      "gerentemineradora",
      "gerentemineradora.usuário"
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