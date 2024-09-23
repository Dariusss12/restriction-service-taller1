import { Module } from '@nestjs/common';
import { RestrictionsModule } from './restrictions/restrictions.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    RestrictionsModule],
})
export class AppModule {}
