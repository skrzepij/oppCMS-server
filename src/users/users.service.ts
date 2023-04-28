import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    getAll() {
        return this.repo.find()
    }

    getById(id: number) {
        return this.repo.findOneBy({id})
    }

    add(name: string) {
        const newUser = this.repo.create({name})
        return this.repo.save(newUser)
    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({id})
        await this.repo.remove(user)
    }

    //TODO: Pomyśleć nad napisaniem generycznego mappera albo sprawdzenie czy nie ma libki lub type orm czegoś takiego nie posiada, zamiast ręcznie przypisywać pola.
    async edit(id: number, name: string) {
        const user = await this.repo.findOneBy({id})
        user.name = name
        return this.repo.save(user)
    }
}
