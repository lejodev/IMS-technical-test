import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { EntityManager, EntityTarget, FindManyOptions, FindOptionsOrder, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

// Servicio que va a centralizar toos los CRUD
@Injectable()
export class WrapperService {

    constructor(private readonly entityManager: EntityManager) { }

    GET<T extends ObjectLiteral>(
        entity: EntityTarget<T>,
        options?: {
            where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
            order?: FindOptionsOrder<T>;
            relations?: string[];
            take?: number;
            skip?: number;
        },
    ): Observable<T[]> {
        const findOptions: FindManyOptions<T> = {
            ...options,
        };
        return from(this.entityManager.find(entity, findOptions));
    }

    findOne<T extends ObjectLiteral>(
        entityTarget: EntityTarget<T>,
        where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    ): Observable<T | null> {
        return from(this.entityManager.findOneBy(entityTarget, where));
    }

    create<T>(entityTarget: EntityTarget<T>, body: T): Observable<T> {
        return from(this.entityManager.save(entityTarget, body));
    }

    update<T extends ObjectLiteral>(
        entityTarget: EntityTarget<T>,
        criteria: any,
        data: QueryDeepPartialEntity<T>,
    ): Observable<UpdateResult> {
        return from(this.entityManager.update(entityTarget, criteria, data));
    }

}
