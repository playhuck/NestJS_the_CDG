import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostReportDto } from './dtos/post.report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    async postReport(body : PostReportDto) {
        const report = this.reportRepository.create(body);

        return this.reportRepository.save(report);
    }
}
