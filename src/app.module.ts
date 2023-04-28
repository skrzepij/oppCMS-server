import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
      // Domyślnie Nest nie czyta envów, trzeba zadeklarować poniżej, jakie pliki mają być użyte i w jakiej kolejności
      ConfigModule.forRoot({envFilePath: ['.env.local', '.env']}),
      UsersModule,
      TypeOrmModule.forRoot(
        { type: "postgres", host: process.env.DATABASE_HOST, port: parseInt(process.env.DATABASE_PORT), username: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, database: process.env.DATABASE_NAME, synchronize: true, entities: ["**/*.entity.js"] }
      )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
