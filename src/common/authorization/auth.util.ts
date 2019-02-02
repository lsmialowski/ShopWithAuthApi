import * as jwt from 'jsonwebtoken';
import {UnauthorizedError} from 'routing-controllers';

export const getToken = (token: string) => {
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    return token;
};

export const decodeToken = (token: string) => {
    return jwt.decode(token);
};

export const validateDecodedToken = (decodedToken?: any): any => {
    if (!decodedToken) {
        throw new UnauthorizedError('Incorrect token');
    }

    return decodedToken;
};

export const decodeAndValidateToken = (token: string) => {
    let decodedToken = decodeToken(token);
    decodedToken = validateDecodedToken(decodedToken);

    return decodedToken;
};
