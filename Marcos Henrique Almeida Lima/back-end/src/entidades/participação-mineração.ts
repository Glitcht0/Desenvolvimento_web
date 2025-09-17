import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import GerenteMineradora from "./gerente-mineradora";
import Patrocínio from "./patrocínio";

export enum Categoria {
    Extracao = "Extração",
    Exploracao = "Exploração",
    Consultoria = "Consultoria",
    PesquisaMineral = "Pesquisa Mineral"
}

export enum Resultado {
    Sucesso = "Sucesso",
    Parcial = "Parcial",
    Falha = "Falha"
}
@Entity()
export default class ParticipaçãoMineração  extends BaseEntity {
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
@ManyToOne(() => GerenteMineradora, (gerenteMineradora) => gerenteMineradora.participações_mineração, { onDelete: "CASCADE" })
gerente_mineradora: GerenteMineradora;
@OneToMany(() => Patrocínio, (patrocínio) => patrocínio.participações_mineração)
patrocínios: Patrocínio[];
}