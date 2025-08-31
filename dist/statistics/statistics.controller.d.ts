import { StatisticsService } from './statistics.service';
import { StatisticsDto } from './dto/statistics.dto';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getStatistics(): Promise<StatisticsDto>;
}
