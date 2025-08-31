import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { StatisticsDto } from './dto/statistics.dto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer les statistiques globales' })
  @ApiResponse({ 
    status: 200, 
    description: 'Statistiques récupérées avec succès',
    type: StatisticsDto
  })
  getStatistics() {
    return this.statisticsService.getStatistics();
  }
}
