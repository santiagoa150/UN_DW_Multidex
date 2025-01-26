import { StorageRepository } from '../../../../shared/domain/interfaces/storage.repository.ts';
import { UniverseTypeNameConstants } from '../../../domain/constants/universe-type-name.constants.ts';
import { UniverseStorageConstants } from '../../../domain/constants/universe-storage.constants.ts';
import { SetCurrentUniverseTypeApplication } from '../../set/current-universe-type/set-current-universe-type.application.ts';
import { UniverseType } from '../../../domain/universe-type.ts';
import { UniverseTypeNameToPropertiesConstants } from '../../../domain/constants/universe-type-name-to-properties.constants.ts';

/**
 * Get Current Universe Application.
 */
export class GetCurrentUniverseTypeApplication {
    /**
     * @param repository - The storage repository.
     * @param setUniverseTypeApplication - The set current universe type application.
     */
    constructor(
        private readonly repository: StorageRepository,
        private readonly setUniverseTypeApplication: SetCurrentUniverseTypeApplication,
    ) {}

    /**
     * Get the current universe type.
     * If no universe type is set, the default universe type is set and returned.
     * @returns The current universe type.
     */
    async exec(): Promise<UniverseType> {
        const universeType = await this.repository.get(UniverseStorageConstants.CURRENT_UNIVERSE);
        if (universeType) {
            const typeName = universeType as UniverseTypeNameConstants;
            return { ...UniverseTypeNameToPropertiesConstants[typeName], name: typeName };
        }
        const defaultType = UniverseTypeNameConstants.POKEMON;
        await this.setUniverseTypeApplication.exec(defaultType);
        return { ...UniverseTypeNameToPropertiesConstants[defaultType], name: defaultType };
    }
}
