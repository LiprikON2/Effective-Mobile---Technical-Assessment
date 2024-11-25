import { Expose, Transform } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    has_issues: boolean

    @Column({
        type: 'enum',
        enum: ['male', 'female']
    })
    gender: string

    @Column({ type: 'date' })
    birth_date: Date

    @Expose() // Makes the virtual property visible in responses
    @Transform(({ obj }) => obj.getAge())
    age: number

    getAge(): number {
        return Math.floor(
            (new Date().getTime() - new Date(this.birth_date).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
        )
    }
}
