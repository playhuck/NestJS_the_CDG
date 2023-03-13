import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostReportDto } from './dtos/post.report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {

    constructor(private reportService : ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    async postReport(@Body() body : PostReportDto ) {
        return await this.reportService.postReport(body);

    }
}
