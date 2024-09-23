import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

    const existingDoc = await this.firestore.collection('restrictions').doc(restriction.id).get();
    if (existingDoc.exists) {
      throw new BadRequestException('A restriction with this ID already exists.');
    }

    await this.firestore.collection('restrictions').doc(restriction.id).set(restriction);

    return {restriction};
    
  }

  findAll() {
    return `This action returns all restrictions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restriction`;
  }

  async remove(id: string) {
    const restrictionRef = this.firestore.collection('restrictions').doc(id);
    const restriction = await restrictionRef.get();

    if (!restriction.exists) {
      throw new NotFoundException('Restriction not found');
    }

    await restrictionRef.delete();
    return { message: 'Restriction deleted' };
  }
}
