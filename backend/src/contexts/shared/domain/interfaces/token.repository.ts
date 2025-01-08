/**
 * Interface that represents a token repository.
 */
export interface TokenRepository {
    /**
     * Signs a payload to create a token.
     * @param payload - The data to be signed in to the token.
     * @param secret - The secret key used to sign the token.
     * @param expiresIn - The expiration time of the token in seconds.
     * @returns The signed token as a string.
     */
    sign<T extends Record<string, unknown>>(payload: T, secret: string, expiresIn: number): string;

    /**
     * Verifies the provided token using the secret key.
     * @param token - The token to verify.
     * @param secret - The secret key used to verify the token.
     * @returns The decoded token payload if the verification is successful, otherwise `undefined`.
     */
    verify<T extends Record<string, unknown>>(token: string, secret: string): T | undefined;
}
