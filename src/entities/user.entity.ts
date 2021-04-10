import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  email!: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  password!: string;

  @Column({ type: 'varchar', nullable: false, length: 25 })
  name!: string;

  @Column({ type: 'varchar', nullable: false, length: 25 })
  lastname!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}