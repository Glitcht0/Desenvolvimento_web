import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn }
from "typeorm";
import Usuário from "./usuário";
import Patrocínio from "./patrocínio";
import ParticipaçãoMineração from "./participação-mineração";
export enum Titulacao  { GerenteTecnologia = "Gerente Tecnologia", GerenteInovação = "Gerente Inovação", EngenheiroSistemasSênior = "Engenheiro Sistemas Sênior", LíderEquipeDesenvolvimento = "Líder Equipe Desenvolvimento" };

@Entity()
export default class GerenteTecnologia extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: "enum", enum: Titulacao  })
titulacao: Titulacao ;
@Column()
ano_ingresso: number;

@Column({ type: "date" })
data_nascimento: Date;

@Column()
telefone: string;

@OneToMany(() => Patrocínio, (patrocínio) => patrocínio.gerentetecnologia)
patrocínios: Patrocínio[];

@OneToMany(
  () => ParticipaçãoMineração,
  (participação) => participação.gerente_tecnologia
)
participações_mineração: ParticipaçãoMineração[];

@OneToOne(() => Usuário, usuário => usuário.gerentetecnologia, { onDelete: "CASCADE" })
@JoinColumn()
usuário: Usuário;
}