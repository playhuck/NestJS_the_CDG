import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src_computer/power/power.module';

/** exports 로 내보내진 PowerService가 담겨있는 PowerModule을 import한다. */
@Module({
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService]
})
export class CpuModule {} 
