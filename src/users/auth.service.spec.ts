import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  /**
   * 사용자 서비스를 테스트하는 데 사용할 가짜 서비스를 생성합니다.
   */
  const users: User[] = [];
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // 테스트에 사용할 가짜 사용자 서비스를 설정합니다.
    fakeUsersService = {
      // 기본적으로 빈 배열을 반환하는 find 메서드를 정의합니다.
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      // 주어진 이메일과 비밀번호로 새로운 사용자를 생성하여 반환하는 create 메서드를 정의합니다.
      create: (email: string, password: string) => {
        const user = ({id : Math.floor(Math.random() * 99999), email, password} as User)
        users.push(user);
        return Promise.resolve(user);
      },
    };

    // AuthService와 가짜 UsersService를 포함하는 테스트 모듈을 설정합니다.
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    // 테스트 모듈에서 AuthService 인스턴스를 가져옵니다.
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    // 새로운 사용자를 생성합니다.
    const user = await service.signup('asdf@asdf.com', 'asdf');

    // 비밀번호가 단순 문자열 'asdf'가 아닌 해싱된 값으로 저장되었는지 확인합니다.
    expect(user.password).not.toEqual('asdf');

    // 비밀번호 해싱에 사용된 salt값과 해시값을 가져와서 정의합니다.
    const [salt, hash] = user.password.split('.');

    // salt값과 해시값이 정의되었는지 확인합니다.
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  /**
   * 가짜 유저 서비스를 사용하여 테스트하는 예시입니다.
   * fakeUsersService.find 메소드를 오버라이드하여 가짜 데이터를 반환합니다.
   */
  it('throws an error if user signs up with email that is in use', async () => {
    // 가짜 유저 데이터를 반환하는 find 메소드를 정의합니다.
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

    /**
     *  signup 메소드에 이미 사용 중인 이메일을 입력하여 호출하고 예외가 발생하는지 확인합니다.
     *  Jest는 테스트 파일의 바운더리를 벗어난, 예를들어 user.service.ts에서 콜백을 리턴하는 것을
     *  허용하지 않기 때문에 테스트 코드안에서 BadRequestException을 던져야 한다.
     * */
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  /**
   * 사용되지 않는 이메일로 로그인을 시도할 경우 예외가 발생하는지 테스트합니다.
   */
  it('throws if signin is called with an unused email', async () => {
    // 사용되지 않는 이메일로 signin 메서드를 호출합니다.
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException); // NotFoundException이 발생하는 것을 예상합니다.
  });

  /**
   * 잘못된 비밀번호가 제공된 경우 예외가 발생하는지 테스트합니다.
   */
  it('throws if an invalid password is provided', async () => {
    // 이메일과 비밀번호를 가진 가짜 사용자를 정의합니다.
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
      ]);

    // 이메일과 잘못된 비밀번호로 signin 메서드를 호출합니다.
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException); // BadRequestException이 발생하는 것을 예상합니다.
  });

  it('throws if an invalid password is provided', async () => {
    // 가입
    await service.signup('asda@asd.com', 'asdsad');
  
    // 올바르지 않은 비밀번호로 로그인 시도. BadRequestException을 던지는지 확인
    await expect(
      service.signin('asdasdsad@dasd.com', 'password'),
    ).rejects.toThrow(BadRequestException);
  });
  
  it('return a user if correct password is provided', async () => {
    // 가입
    await service.signup('asda@asd.com', 'asdsad');
  
    // 올바른 비밀번호로 로그인 시도. User 객체를 반환하는지 확인
    const user = await service.signin('asda@asd.com', 'asdsad');
    expect(user).toBeDefined();
  });
});
