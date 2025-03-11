import { describe, it, expect } from 'vitest';
const { isValidUUID } = require('../gen/index.cjs'); // Adjust the path if needed

describe('isValidUUID', () => {
    it('should return true for valid UUIDs without version check', () => {
        // Testing valid UUIDs twice
        expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true); // v4
        expect(isValidUUID('6f9619ff-8b86-11d1-b42d-00c04fc964ff')).toBe(true); // v1
        expect(isValidUUID('6f9619ff-8b86-21d1-b42d-00c04fc964ff')).toBe(true); // v2
        expect(isValidUUID('6f9619ff-8b86-31d1-b42d-00c04fc964ff')).toBe(true); // v3
        expect(isValidUUID('6f9619ff-8b86-41d1-b42d-00c04fc964ff')).toBe(true); // v4
        expect(isValidUUID('6f9619ff-8b86-51d1-b42d-00c04fc964ff')).toBe(true); // v5
        expect(isValidUUID('6f9619ff-8b86-61d1-b42d-00c04fc964ff')).toBe(true); // v6
        expect(isValidUUID('6f9619ff-8b86-71d1-b42d-00c04fc964ff')).toBe(true); // v7

        // Repeating the same checks to confirm consistency
        expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
        expect(isValidUUID('6f9619ff-8b86-11d1-b42d-00c04fc964ff')).toBe(true);
    });

    it('should return false for invalid UUIDs', () => {
        expect(isValidUUID('not-a-uuid')).toBe(false);
        expect(isValidUUID('12345')).toBe(false);
        expect(isValidUUID('550e8400-e29b-81d4-a716-446655440000')).toBe(false); // Invalid version (8)
        expect(isValidUUID('550e8400-e29b-91d4-a716-446655440000')).toBe(false); // Invalid version (9)
        expect(isValidUUID('00000000-0000-0000-0000-000000000000')).toBe(false); // NIL UUID
    });

    it('should return true for valid UUIDs of a specific version', () => {
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', { version: 4 }),
        ).toBe(true);
        expect(
            isValidUUID('6f9619ff-8b86-11d1-b42d-00c04fc964ff', { version: 1 }),
        ).toBe(true);
        expect(
            isValidUUID('6f9619ff-8b86-21d1-b42d-00c04fc964ff', { version: 2 }),
        ).toBe(true);
        expect(
            isValidUUID('6f9619ff-8b86-31d1-b42d-00c04fc964ff', { version: 3 }),
        ).toBe(true);
        expect(
            isValidUUID('6f9619ff-8b86-51d1-b42d-00c04fc964ff', { version: 5 }),
        ).toBe(true);
        expect(
            isValidUUID('6f9619ff-8b86-61d1-b42d-00c04fc964ff', { version: 6 }),
        ).toBe(true);
        expect(
            isValidUUID('6f9619ff-8b86-71d1-b42d-00c04fc964ff', { version: 7 }),
        ).toBe(true);
    });

    it('should return false for valid UUIDs but incorrect version', () => {
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', { version: 3 }),
        ).toBe(false); // v4 UUID checked as v3
        expect(
            isValidUUID('6f9619ff-8b86-11d1-b42d-00c04fc964ff', { version: 4 }),
        ).toBe(false); // v1 UUID checked as v4
        expect(
            isValidUUID('6f9619ff-8b86-61d1-b42d-00c04fc964ff', { version: 5 }),
        ).toBe(false); // v6 UUID checked as v5
        expect(
            isValidUUID('6f9619ff-8b86-71d1-b42d-00c04fc964ff', { version: 2 }),
        ).toBe(false); // v7 UUID checked as v2
    });

    it('should throw an error for invalid version numbers', () => {
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', {
                version: 15,
            }),
        ).toBe(false);
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', { version: 0 }),
        ).toBe(false);
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', {
                version: 'abc',
            }),
        ).toBe(false);
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', {
                version: -1,
            }),
        ).toBe(false);
    });
});

describe('isValidUUID - Case Sensitivity Tests', () => {
    it('should return true for strictly lowercase valid UUIDs', () => {
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', {
                strictCase: true,
            }),
        ).toBe(true);
    });

    it('should return false for uppercase UUIDs when caseSensitive is true', () => {
        expect(
            isValidUUID('550E8400-E29B-41D4-A716-446655440000', {
                strictCase: true,
            }),
        ).toBe(false);
    });

    it('should return true for uppercase UUIDs when caseSensitive is false', () => {
        expect(
            isValidUUID('550E8400-E29B-41D4-A716-446655440000', {
                strictCase: false,
            }),
        ).toBe(true);
    });

    it('should return false for mixed-case UUIDs when caseSensitive is true', () => {
        expect(
            isValidUUID('550e8400-e29b-41D4-a716-446655440000', {
                strictCase: true,
            }),
        ).toBe(false);
    });

    it('should allow mixed-case UUIDs when caseSensitive is false', () => {
        expect(
            isValidUUID('550e8400-e29b-41D4-A716-446655440000', {
                strictCase: false,
            }),
        ).toBe(true);
    });

    it('should still validate UUID version correctly regardless of case sensitivity', () => {
        expect(
            isValidUUID('550e8400-e29b-41d4-a716-446655440000', {
                version: 4,
                strictCase: false,
            }),
        ).toBe(true);
        expect(
            isValidUUID('550E8400-E29B-41D4-A716-446655440000', {
                version: 3,
                strictCase: false,
            }),
        ).toBe(false);
    });
});
