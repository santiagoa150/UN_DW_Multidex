import { UserDto } from '../user.dto';
import { User } from '../../domain/user';

/**
 * Utility class for mapping user data.
 */
export abstract class UserMappers {
    /**
     * Maps a `User` domain object to a `UserDto` object.
     * @param dto - The `UserDto` object to map.
     * @returns A new `User` object.
     */
    static DTO2User(dto: UserDto): User {
        return new User(dto.userId, dto.email, dto.username, dto.password, dto.names, dto.lastNames);
    }
}
