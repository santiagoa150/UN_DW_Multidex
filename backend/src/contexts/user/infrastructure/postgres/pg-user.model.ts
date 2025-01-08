import { AllowNull, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { UserDto } from '../user.dto';
import { PgUserConstants } from './pg-user.constants';

@Table({ tableName: PgUserConstants.TABLE_NAME, timestamps: false })
export class PgUserModel extends Model<UserDto> implements UserDto {
    @PrimaryKey
    @AllowNull(false)
    @Column({ type: DataType.UUID })
    userId: string;

    @Unique
    @AllowNull(false)
    @Column
    email: string;

    @Unique
    @AllowNull(false)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    names: string;

    @AllowNull(false)
    @Column
    lastNames: string;
}
