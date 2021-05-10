import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({default: false})
  isAdmin: boolean;

  async updatePassword(password: string): Promise<void> {
    this.password = password;
    await this.save();
  }
}
