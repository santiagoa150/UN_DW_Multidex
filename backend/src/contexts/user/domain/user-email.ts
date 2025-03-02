/**
 * User email value object.
 */
export class UserEmail {
    /**
     * The email address regex.
     */
    private static readonly _regExp: RegExp = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    /**
     * Validates an email address.
     * @param email - The email address to validate.
     * @returns True if the email address is valid, false otherwise.
     */
    static validate(email: string): boolean {
        return this._regExp.test(email);
    }
}
