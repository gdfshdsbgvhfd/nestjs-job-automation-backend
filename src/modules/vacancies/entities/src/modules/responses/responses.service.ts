import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);

  constructor(private readonly dataSource: DataSource) {}

  async createAutomationResponse(userId: string, vacancyId: string, coverLetter: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log(`Starting automated response for user ${userId}`);
      // Здесь идет логика сохранения отклика в изолированной транзакции
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (error) {
      this.logger.error(`Transaction failed. Rolling back: ${error.message}`);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Automation error');
    } finally {
      await queryRunner.release();
    }
  }
}
