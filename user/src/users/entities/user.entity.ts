import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string
    @Column()
    middle_name: string
    @Column()
    last_name: string

    @Column()
    has_issue: boolean

    @Column({
        type: 'enum',
        enum: ['male', 'female']
    })
    gender: string

    @Column({ type: 'date' })
    birth_date: Date

    getAge(): number {
        return Math.floor((Date.now() - this.birth_date.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    }
}
