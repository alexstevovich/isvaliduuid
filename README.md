# isValidUUID

The **NEW** super atomic `isValidUUID` is finally here—the missing piece often needed alongside the default crypto library.

## Features

- Validates general UUID format.
- Supports checking against specific UUID versions.
- Allows restricting the highest allowed version.
- Rejects `nil` UUIDs (`00000000-0000-0000-0000-000000000000`).

## Installation

```sh
npm install isvaliduuid
```

## Usage

```javascript
import isValidUUID from 'isvaliduuid';
```

### Basic UUID validation

```javascript
console.log(isValidUUID('550e8400-e29b-41d4-a716-446655440000')); // true
console.log(isValidUUID('not-a-uuid')); // false
```

### Validating a specific version

```javascript
console.log(
    isValidUUID('550e8400-e29b-41d4-a716-446655440000', { version: 4 }),
);
// true
console.log(
    isValidUUID('550e8400-e29b-41d4-a716-446655440000', { version: 1 }),
);
// false
```

### Restricting the highest version allowed

```javascript
console.log(
    isValidUUID('550e8400-e29b-41d4-a716-446655440000', {
        maxVersion: 5,
    }),
);
// true
console.log(
    isValidUUID('550e8400-e29b-61d4-a716-446655440000', {
        maxVersion: 5,
    }),
);
// false
```

## API

### `isValidUUID(uuid: string, options?: object): boolean`

#### Parameters

- `uuid` _(string)_: The UUID string to validate.
- `options` _(object, optional)_:
    - `version` _(string | number)_: The specific version to check against. Default: "ALL" (allows all versions).
    - `maxVersion` _(number)_: The maximum allowable UUID version. Default: `7`.

#### Returns

- `true` if the UUID is valid according to the given constraints.
- `false` if the UUID is invalid or does not match the specified criteria.

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
