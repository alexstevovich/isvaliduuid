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
 * file_name: gen/index.cjs
 * purpose: Core functionality and exports combined.
 *  
 * @system
 *
 * generated_on: 2025-03-11T23:33:07.756Z
 * certified_version: 1.0.0
 * file_uuid: 0d31c86c-393f-48f1-82ad-2e7c69198667
 * file_size: 3492 bytes
 * file_hash: 19b6508c8cd7daddb66198480089070c41417a7262668ee3f7b5adc8eabd1396
 * mast_hash: 3edeee65b2d021d16c17b2df34c63a513d5bf5e523e2be80066b94256aad06a1
 * generated_by: preamble on npm!
 *
 * [Preamble Metadata]
********************************************************/ 
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  isValidUUID: () => isValidUUID
});
module.exports = __toCommonJS(index_exports);

function isValidUUID(uuid, options = {}) {
  const version = Object.prototype.hasOwnProperty.call(options, "version") ? options.version : "ALL";
  const maxVersion = options.maxVersion || 7;
  const strictCase = options.strictCase ?? true;
  if (version === 0) {
    return false;
  }
  if (version !== "ALL") {
    const requestedVersion = parseInt(version, 16);
    if (isNaN(requestedVersion) || requestedVersion < 1 || requestedVersion > maxVersion) {
      return false;
    }
  }
  const generalUUIDRegex = strictCase ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/ : /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  const nilUUID = "00000000-0000-0000-0000-000000000000";
  if (typeof uuid !== "string" || uuid === nilUUID) {
    return false;
  }
  if (!generalUUIDRegex.test(uuid)) {
    return false;
  }
  const extractedVersion = parseInt(uuid[14], 16);
  if (extractedVersion < 1 || extractedVersion > maxVersion) {
    return false;
  }
  if (version === "ALL") {
    return true;
  }
  return extractedVersion === parseInt(version, 16);
}
var index_default = isValidUUID;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidUUID
});
