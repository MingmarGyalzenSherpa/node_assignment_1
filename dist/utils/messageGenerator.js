"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleted = exports.updated = exports.created = exports.found = exports.notFound = void 0;
const notFound = (title) => `${title} not found`;
exports.notFound = notFound;
const found = (title) => `${title} found successfully`;
exports.found = found;
const created = (title) => `${title} created successfully`;
exports.created = created;
const updated = (title) => `${title} updated successfully`;
exports.updated = updated;
const deleted = (title) => `${title} deleted successfully`;
exports.deleted = deleted;
//# sourceMappingURL=messageGenerator.js.map