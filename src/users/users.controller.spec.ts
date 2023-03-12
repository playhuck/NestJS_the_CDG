import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService : Partial<UsersService>;
  let fakeAuthService : Partial<AuthService>;

  beforeEach(async () => {
    // 생성한 테스트 더미 서비스를 사용하기 위해 변수를 초기화합니다.
    fakeUsersService = {
      // email에 해당하는 유저 객체 배열을 반환하는 find 메서드입니다.
      find: (email : string) => {
        return Promise.resolve([{ id : 1, email, password : "password"} as User])
      },
      // id에 해당하는 유저 객체를 반환하는 findOne 메서드입니다.
      findOne: (id : number) => {
        return Promise.resolve({ id, email : "asdf@asdf.com", password : "password"} as User)
      },
      // id에 해당하는 유저 객체를 attrs에 따라 업데이트하는 update 메서드입니다.
      update: (id : number, attrs : Partial<User>) => {
        return Promise.resolve({ id, email : attrs.email, password : attrs.password} as User)
      },
      // id에 해당하는 유저 객체를 삭제하는 remove 메서드입니다.
      remove: (id : number) => {
        return Promise.resolve({ id, email : "asdf@asdf.com", password : "password"} as User)
      }
    };
    fakeAuthService = {
      // 아직 구현되지 않은 AuthService의 메서드입니다.
      // signup: () => {},
      signin: (email : string, password : string) => {
        return Promise.resolve({id : 1, email, password} as User)
      }
    };
    // 테스트 모듈을 생성하고 컨트롤러에서 사용할 더미 서비스들을 주입합니다.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide : UsersService,
        useValue : fakeUsersService
      }, {
        provide : AuthService,
        useValue : fakeAuthService
      }]
    }).compile();

    // 생성된 컨트롤러 인스턴스를 가져옵니다.
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    // 컨트롤러 인스턴스가 정의되었는지를 테스트합니다.
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  })

  it('findUser throws an error if user with given id is not found', async () => {
    // findOne 메서드를 임의로 null을 반환하도록 변경합니다.
    fakeUsersService.findOne = () => null;
    // findUser 메서드에 존재하지 않는 id를 전달하여 NotFoundException이 발생하는지 테스트합니다.
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('Login updates session object and returns user', async () => {
    const session = { userId : -10 };
    const user = await controller.signin({ email : 'asdf@asdf.com', password : 'password'}, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })
});