import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from 'typeorm';

@Entity('vacancies')
// Индекс для ускорения поиска вакансий, как в кейсе «Софи»
@Index('IDX_vacancy_matching', ['grade', 'location', 'isActive'])
export class VacancyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  companyName: string;

  @Column({ type: 'varchar', length: 50 })
  grade: string; // Junior, Middle, Senior

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
