import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  /** 경도 longitude */
  @Column()
  lng: number;

  /** 위도 latitude */
  @Column()
  lat: number;

  /** 주행거리 */
  @Column()
  mileage: number;

  @ManyToOne(() => User, (user) => user.reports)
  user : User;
}
