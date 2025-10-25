import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
"typeorm";
import GerenteTecnologia from "./gerente-tecnologia";
import ParticipaçãoMineração from "./participação-mineração";
@Entity()
export default class Patrocínio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    necessidade_bolsa: boolean;

    @Column()
    justificativa: string;

    @CreateDateColumn()
    data_manifestação: Date;

    @ManyToOne(() => ParticipaçãoMineração, (participacao_mineracao) => participacao_mineracao.patrocínios, { onDelete: "CASCADE" })
    participações_mineração: ParticipaçãoMineração;
    
    @ManyToOne(() => GerenteTecnologia, (gerentetecnologia) => gerentetecnologia.patrocínios, { onDelete: "CASCADE" })
    gerentetecnologia: GerenteTecnologia;
}

