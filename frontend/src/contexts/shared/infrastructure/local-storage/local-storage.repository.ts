import { StorageRepository } from '../../domain/interfaces/storage.repository.ts';

/**
 * Local Storage Repository.
 */
export class LocalStorageRepository implements StorageRepository {
    /**
     * Get a value from local storage.
     * @param key - The key of the value to retrieve.
     * @returns The value associated with the specified key, or `null` if no value was found.
     */
    public async get(key: string): Promise<string | null> {
        return localStorage.getItem(key);
    }

    /**
     * Set a value in local storage.
     * @param key - The key of the value to set.
     * @param value - The value to set.
     */
    public async set(key: string, value: string): Promise<void> {
        localStorage.setItem(key, value);
    }
}
