import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import GerenteMineradora from "./gerente_mineradora";
import Patrocínio from "./patrocinio";

export enum Categoria {
    Extracao = "Extração",
    Exploracao = "Exploração",
    Consultoria = "Consultoria",
    PesquisaMineral = "PesquisaMineral"
}

export enum Resultado {
    Sucesso = "Sucesso",
    Parcial = "Parcial",
    Falha = "Falha"
}
@Entity()
export default class ParticipacaoMineracao  extends BaseEntity {
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
@ManyToOne(() => GerenteMineradora, (gerentemineradora) => gerentemineradora.participacoes_mineracao, { onDelete: "CASCADE" })
gerentemineradora: GerenteMineradora;
@OneToMany(() => Patrocínio, (patrocinio) => patrocinio.participacao_mineracao)
patrocinios: Patrocínio[];
}