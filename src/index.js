/* *******************************************************
 * isvaliduuid
 *
 * @license
 *
 * Apache-2.0
 *
 * Copyright 2023 Alex Stevovich
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @meta
 *
 * package_name: isvaliduuid
 * file_name: src/index.js
 * purpose: Core functionality and exports combined.
 *
 * @system
 *
 * generated_on: 2025-03-11T23:31:49.440Z
 * certified_version: 1.0.0
 * file_uuid: 0d31c86c-393f-48f1-82ad-2e7c69198667
 * file_size: 3336 bytes
 * file_hash: 1167c644c2ecffe1b07441e42b61c78a6539f2805d5dd8c660df1d313d93725e
 * mast_hash: bfebbad2cb65da8625dcce01b5ce1b808b98c3d96cf6ab5b61962158bd8c6a65
 * generated_by: preamble on npm!
 *
 * [Preamble Metadata]
 ********************************************************/
export function isValidUUID(uuid, options = {}) {
    const version = Object.prototype.hasOwnProperty.call(options, 'version')
        ? options.version
        : 'ALL';
    const maxVersion = options.maxVersion || 7;
    const strictCase = options.strictCase ?? true; // Enforce strict case sensitivity

    // Ensure version is not `0`
    if (version === 0) {
        return false;
    }

    // ✅ Ensure version is either `"ALL"` or between `1-maxVersion`
    if (version !== 'ALL') {
        const requestedVersion = parseInt(version, 16); // Convert hex to decimal

        if (
            isNaN(requestedVersion) ||
            requestedVersion < 1 ||
            requestedVersion > maxVersion
        ) {
            return false; // Reject invalid versions
        }
    }

    // Strict UUID regex (Enforces lowercase case sensitivity if required)
    const generalUUIDRegex = strictCase
        ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        : /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    // NIL UUID (all zeros, special case in RFC4122)
    const nilUUID = '00000000-0000-0000-0000-000000000000';

    if (typeof uuid !== 'string' || uuid === nilUUID) {
        return false; // Reject NIL UUID and non-string inputs
    }

    if (!generalUUIDRegex.test(uuid)) {
        return false; // Immediately return false if format is incorrect
    }

    // Extract version number from UUID (hexadecimal to decimal conversion)
    const extractedVersion = parseInt(uuid[14], 16); // `uuid[14]` is the version digit

    // Ensure extracted version is within allowed range
    if (extractedVersion < 1 || extractedVersion > maxVersion) {
        return false;
    }

    // ✅ If "ALL" is specified, return true without further checking
    if (version === 'ALL') {
        return true;
    }

    // ✅ If a specific version is requested, check it against extracted version
    return extractedVersion === parseInt(version, 16);
}

export default isValidUUID;
