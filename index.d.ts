declare module 'isvaliduuid' {
    /**
     * Options for UUID validation.
     */
    export interface UUIDValidationOptions {
        /**
         * Specify the UUID version to validate against.
         * - `"ALL"` (default) allows any version.
         * - A number between `1` and `maxVersion` specifies an exact version.
         */
        version?: number | 'ALL';

        /**
         * The maximum allowable UUID version.
         * - Default: `7`
         * - Helps restrict validation to only valid versions.
         */
        maxVersion?: number;

        /**
         * Enforce strict lowercase case sensitivity.
         * - `true` (default): Requires lowercase UUIDs.
         * - `false`: Allows mixed-case UUIDs.
         */
        strictCase?: boolean;
    }

    /**
     * Validates whether a given string is a properly formatted UUID.
     * 
     * @param uuid - The UUID string to validate.
     * @param options - Optional validation options.
     * @returns `true` if the UUID is valid, otherwise `false`.
     * 
     * @example
     * ```ts
     * import { isValidUUID } from "isvaliduuid";
     * 
     * console.log(isValidUUID("550e8400-e29b-41d4-a716-446655440000")); // true
     * console.log(isValidUUID("invalid-uuid")); // false
     * console.log(isValidUUID("550e8400-e29b-41d4-a716-446655440000", { version: 4 })); // true
     * console.log(isValidUUID("550E8400-E29B-41D4-A716-446655440000", { strictCase: true })); // false
     * ```
     */
    export function isValidUUID(uuid: string, options?: UUIDValidationOptions): boolean;

    export default isValidUUID;
}
