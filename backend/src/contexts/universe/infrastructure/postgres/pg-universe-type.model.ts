import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UniverseTypeDto } from '../universe-type.dto';
import { PgUniverseConstants } from './pg-universe.constants';

/**
 * The universe type models for PostgresSQL.
 */
@Table({ tableName: PgUniverseConstants.UNIVERSE_TYPES_TABLE_NAME, timestamps: false })
export class PgUniverseTypeModel extends Model<UniverseTypeDto> implements UniverseTypeDto {
    @PrimaryKey
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    priority: number;

    @AllowNull(false)
    @Column
    taskWasExecuted: boolean;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    elementsPerPage: number;

    @AllowNull(true)
    @Column
    metadata?: string;
}
