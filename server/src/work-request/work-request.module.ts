import { Module, forwardRef } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';
import { WorkRequestController } from './work-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRequest } from './entities/work-request.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WorkRequestController],
  providers: [WorkRequestService],
  imports: [TypeOrmModule.forFeature([WorkRequest]), forwardRef(() => AuthModule)]
})

export class WorkRequestModule {}
