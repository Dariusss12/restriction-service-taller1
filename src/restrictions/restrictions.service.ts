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

  async addRestriction(createRestrictionDto: CreateRestrictionDto, studentId: string) {
    const restriction: Restriction = {
      id: uuid(),
      studentId: studentId,
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

  async findAllRestrictions(studentId: string) {
    const restrictions = await this.firestore.collection('restrictions').where('studentId', '==', studentId).get();
    return restrictions.docs.map(doc => {
      const data = doc.data();
      const restriction: Restriction = {
        id: doc.id,
        studentId: data.studentId,
        description: data.description,
        createdAt: data.createdAt.toDate(),
      };
      return restriction;
    });
  }

  async checkRestrictions(studentId: string) {
    const restrictions = await this.firestore.collection('restrictions').where('studentId', '==', studentId).get();
    if(restrictions.empty) {
      return { hasRestrictions: false };
    }
    return { hasRestrictions: true };
  }

  async remove(id: string, studentId: string) {
    const restrictionRef = this.firestore.collection('restrictions').doc(id);
    const restriction = await restrictionRef.get();

    if (!restriction.exists) {
      throw new NotFoundException('Restriction not found');
    }

    await restrictionRef.delete();
    return { 
      message: 'Restriction deleted',
      studentId: studentId
     };
  }
}
