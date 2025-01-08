/**
 * User domain model
 */
export class User {
    /**
     * @param _userId The user's unique identifier
     * @param _email The user's email address
     * @param _username The user's username
     * @param _password The user's password
     * @param _names The user's names
     * @param _lastNames The user's last names
     */
    constructor(
        private readonly _userId: string,
        private readonly _email: string,
        private readonly _username: string,
        private readonly _password: string,
        private readonly _names: string,
        private readonly _lastNames: string,
    ) {}

    get userId(): string {
        return this._userId;
    }

    get email(): string {
        return this._email;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get names(): string {
        return this._names;
    }

    get lastNames(): string {
        return this._lastNames;
    }
}
