import { JwtPayload, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import TokenPayload from '../interfaces/token-payload';
import { CustomError } from '../exceptions/CustomError';
import * as ex from 'express';
import InvalidAuthTokenException from '../exceptions/invalid-token.exception';

/**
 * generates JWT used for local testing
 */
export async function generateToken(payload: TokenPayload): Promise<any> {


  try {

    const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));

    const signInOptions: SignOptions = {
      // RS256 uses a public/private key pair. The API provides the private key
      // to generate the JWT. The client gets a public key to validate the
      // signature
      algorithm: 'RS256',
      expiresIn: '24h'
    };

    console.log(`generated token ${privateKey}`);

    // generate JWT
    const token = sign({data: payload},{key : privateKey, passphrase: 'Cr3d1tP@ss'} , signInOptions);
    console.log(`generated token ${token}`);

    return token;

  }
  catch(error)
  {
    console.log(error)
    return new InvalidAuthTokenException("Unable to generate token");
  }
  
  
};


/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
 export async function validateToken(token: string): Promise<any> {
  
    const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'));
   
  
    const verifyOptions: VerifyOptions = {
      algorithms: ['RS256', 'RS512'],
    };


    return verify(token, publicKey, verifyOptions);;
}