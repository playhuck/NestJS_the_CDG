import { Injectable } from '@nestjs/common';
import { PowerService } from 'src_computer/power/power.service';

@Injectable()
export class DiskService {

    constructor(private powerService : PowerService){}

    public async getData() {
        console.log(`Drwaing 20 watts of power from PowerService`);
        this.powerService.supplyPower(20);
        return 'data';
    }

}
