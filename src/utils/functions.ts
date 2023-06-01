const { createHash } = require('crypto');

export const generateHashFromString = (str: string) => {
    return createHash('sha256').update(str).digest('hex');
}