import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;

    @Column({ default: '' })
    description: string;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}