import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src_computer/cpu/cpu.service';
import { DiskService } from 'src_computer/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get('')
  async run() {
    console.log(this.cpuService.compute(1, 2), this.diskService.getData())
    return [await this.cpuService.compute(1, 2), await this.diskService.getData()];
  }
}
