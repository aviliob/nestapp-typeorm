import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Affiliate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 50, name: 'company_name' })
  companyName!: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  descripcion!: string;

  @Column({ type: 'varchar', nullable: false, length: 25 })
  rif!: string;

  @Column({ type: 'json', nullable: true })
  data!: any;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}