import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import GerenteMineradora from "./gerente_mineradora";
import Patrocinio from "./patrocinio";
export enum Categoria { EXTENSÃO = "Extensão", IC = "Iniciação Científica", TCC = "TCC" };
export enum Resultado { ARTIGO = "artigo", DESENVOLVIMENTO = "desenvolvimento", MONOGRAFIA =
"monografia" };
@Entity()
export default class ParticipacaoMineracao extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;
@Column()
título: string;
@Column({ type: "enum", enum: Categoria })
categoria: Categoria;
@Column()
área_atuação: string;
@Column({ type: "date" })
data_início: Date;
@Column()
descrição: string;
@Column({ type: "enum", enum: Resultado })
resultado: Resultado;
@ManyToOne(() => GerenteMineradora, (gerente_mineradora) => gerente_mineradora.participacoes_mineracao, { onDelete: "CASCADE" })
gerente_mineradora: GerenteMineradora;
@OneToMany(() => Patrocinio, (patrocinio) => patrocinio.participacao_mineracao)
patrocinios: Patrocinio[];
}