import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {

    /** 전원 기능 공급 */
    /** 다른 서비스가 공급을 요청하는 전력의 양 */
    /** 다른 서비스가 올바르게 작동하기 위한 전력의 양 */
    supplyPower(watts: number) {
        console.log(`Supplying ${watts} worth of power.`)
    };

    /** 2개의 모듈 CPU Module, Power Module 이 있고,*/
    /** 각 모듈 안에 하나의 서비스가 존재한다. */
    /** 그리고 Power 서비스의 인스턴스를 CPU 서비스로 가져와야 하고 이는 */
    /** 서로 다른 모듈 간에 코드를 공유한다는 의미다. */
}
