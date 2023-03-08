import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { CpuModule } from 'src_computer/cpu/cpu.module';
import { DiskModule } from 'src_computer/disk/disk.module';

@Module({
  imports: [CpuModule, DiskModule],
  controllers: [ComputerController]
})
export class ComputerModule {}
 