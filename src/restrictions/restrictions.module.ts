import { Module } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { RestrictionsController } from './restrictions.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [RestrictionsController],
  providers: [
    {
      provide: 'FIRESTORE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const projectId = configService.get<string>('FIREBASE_PROJECT_ID');
        const privateKey = configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'); // Reemplazar saltos de línea
        const clientEmail = configService.get<string>('FIREBASE_CLIENT_EMAIL');

        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            privateKey,
            clientEmail,
          }),
        });
        return admin.firestore();
      },
    },
    RestrictionsService],
})
export class RestrictionsModule {}
