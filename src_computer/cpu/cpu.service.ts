import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {

    constructor(private powerService : PowerService){}

    /** PowerService에서 10watt의 전력을 끌어오고 */
    /** 전원 서비스 공급 전원 기능을 호출하고, 10을 전달하지만, 실제로 여기서 아무런 작업도 수행하지 않는다. */
    public async compute(a : number , b : number) {
        console.log(`Drawing 10 watts of power from Power Service`);
        this.powerService.supplyPower(10);
        return a + b;
    }
}
