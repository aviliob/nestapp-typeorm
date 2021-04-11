import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypeDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  simbolo!: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  descripcion!: string;

}