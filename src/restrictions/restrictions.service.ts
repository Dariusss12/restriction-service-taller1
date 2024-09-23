import { Inject, Injectable } from '@nestjs/common';
import { CreateRestrictionDto } from './dto/create-restriction.dto';
import { Restriction } from './entities/restriction.entity';
import { v4 as uuid } from 'uuid';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class RestrictionsService {

  constructor(
    @Inject('FIRESTORE') 
    private firestore: Firestore,
  ) {}

  async addRestriction(createRestrictionDto: CreateRestrictionDto) {
    const restriction: Restriction = {
      id: uuid(),
      ...createRestrictionDto,
      createdAt: new Date(),
    };

    await this.firestore.collection('restrictions').doc(restriction.id).set(restriction);

    return {restriction};
    
  }

  findAll() {
    return `This action returns all restrictions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restriction`;
  }

  remove(id: number) {
    return `This action removes a #${id} restriction`;
  }
}
