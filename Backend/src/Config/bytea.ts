import { customType } from 'drizzle-orm/pg-core';

export const bytea = customType<{ data: Buffer }>({
  dataType() {
    return 'bytea';
  },
  toDriver(value: Buffer): string {
    return `\\x${value.toString('hex')}`;
  },
  fromDriver(value: unknown){
    if (typeof value === "string" && value.startsWith('x')){
        return Buffer.from(value.slice(2), "hex")
    }
    if (value instanceof Buffer){
        return value
    }
    throw new Error("Unexpected BYTEA value from DB")
  },
});