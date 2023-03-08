import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

/** PowerService가 공급자에 자동 추가 됐다. */ 
@Module({
  /** 기본적으로 PowerService는 다른 모듈에서 Access할 수 없다. */
  providers: [PowerService],
  /** 따라서 이런 상황을 변경시켜주기 위해 해당 속성을 외부로 내보낸다. */
  /** 프로젝트의 다른 모듈에서 해당 클래스를 사용할 수 있도록 명시적으로 선언. */
  exports: [PowerService]
})
export class PowerModule {}
