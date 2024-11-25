import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { PageDto, PageMetaDto, PageOptionsDto } from '../common/dtos'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private dataSource: DataSource
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create({
            ...createUserDto,
            has_issues: createUserDto.has_issues ?? false
        })
        return await this.usersRepository.save(user)
    }

    async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
        const queryBuilder = this.usersRepository.createQueryBuilder('users')

        queryBuilder
            .orderBy('users.id', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id })
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id })

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }

        const updatedUser = this.usersRepository.create({
            ...user,
            ...updateUserDto
        })

        return await this.usersRepository.save(updatedUser)
    }

    async resetAndCountIssues() {
        const startTime = performance.now()

        //*
        // Executes in ~7500 ms for 300 000 updates of 1 000 000 users
        const queryBuilder = this.usersRepository.createQueryBuilder('users')
        const result = await queryBuilder
            .update(User)
            .set({ has_issues: false })
            .where('has_issues = :value', { value: true })
            .execute()
        /*/
        // Executes in ~13250 ms for 300 000 has_issues of 100000 users
        const [result] = await this.usersRepository.query(`
            WITH updated AS (
                UPDATE "users"
                SET has_issues = false
                WHERE has_issues = true
                RETURNING 1
            )
            SELECT COUNT(*) as affected FROM updated
        `)
        result.affected = parseInt(result.affected)
        //*/

        const executionTime = performance.now() - startTime

        return {
            updatedCount: result.affected,
            executionTimeMs: Math.round(executionTime * 100) / 100,
            message: `Successfully reset ${result.affected} users`
        }
    }
}
