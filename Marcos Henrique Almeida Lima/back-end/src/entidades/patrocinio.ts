import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
"typeorm";
import GerenteTecnologia from "./gerente_tecnologia";
import ParticipacaoMineracao from "./participacao_mineracao";
@Entity()
export default class Patrocinio extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column()
justificativa: string;
@CreateDateColumn()
data_manifestação: Date;
@ManyToOne(() => ParticipacaoMineracao, (participacao_mineracao) => participacao_mineracao.patrocinios, { onDelete: "CASCADE" })
participacao_mineracao: ParticipacaoMineracao;
@ManyToOne(() => GerenteTecnologia, (gerente_tecnologia) => gerente_tecnologia.patrocinios, { onDelete: "CASCADE" })
gerente_tecnologia: GerenteTecnologia;
}