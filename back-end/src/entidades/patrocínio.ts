import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
"typeorm";
import GerenteTecnologia from "./gerente-tecnologia";
import GerenteMineradora from "./gerente-mineradora";
import ParticipaçãoMineração from "./participação-mineração";
@Entity()
export default class Patrocínio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    necessidade_bolsa: boolean;

    @Column()
    justificativa: string;

    @Column({ nullable: true })
    categoria_participacao: string;

    @CreateDateColumn()
    data_manifestação: Date;

    @ManyToOne(() => ParticipaçãoMineração, (participacao_mineracao) => participacao_mineracao.patrocínios, { onDelete: "CASCADE" })
    participações_mineração: ParticipaçãoMineração;

    @ManyToOne(() => GerenteMineradora, (gerentemineradora) => gerentemineradora.patrocínios, { onDelete: "CASCADE" })
    gerentemineradora: GerenteMineradora;
    
    @ManyToOne(() => GerenteTecnologia, (gerentetecnologia) => gerentetecnologia.patrocínios, { onDelete: "CASCADE" })
    gerentetecnologia: GerenteTecnologia;
}

