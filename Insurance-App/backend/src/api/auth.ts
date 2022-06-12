import { Request, Response } from 'express';
import { object, string, ValidationError } from 'yup';
import * as bcrypt from 'bcrypt';
import prisma from '../client';
import { sign, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '@prisma/client';

const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
}).noUnknown();

interface AuthToken {
  id: number;
  email: string;
}

// https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/
const getJWT = (data: User) => {
  // information to be encoded in the JWT
  const payload: AuthToken = {
    id: data.id,
    email: data.email,
  };

  // read private key value
  const privateKey = fs.readFileSync(
    path.join(__dirname, './../../auth/private.pem')
  );

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: 'RS256',
    expiresIn: '1h',
  };

  return sign(payload, privateKey, signInOptions);
};

export const login = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Auth']
  #swagger.description = 'Check user credentials and return JWT.'
  #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                description: 'Auth object.',
                schema: { $ref: '#/definitions/Login' }
  }
  */

  try {
    const data = await loginSchema.validate(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: 'error',
        data: {},
        message: "Invalid user email (user doesn't exist)",
      });
    }

    if (
      !user.passwdHash || // no password
      !(await bcrypt.compare(data.password, user.passwdHash)) // wrong password
    ) {
      return res.status(401).send({
        status: 'error',
        data: {},
        message: 'Unauthorized',
      });
    }

    const token = getJWT(user);

    return res.status(200).send({
      status: 'success',
      data: token,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: 'error',
        data: e.errors,
        message: e.message,
      });
    }
    return res.status(500).send({
      status: 'error',
      data: {},
      message: 'Internal server error',
    });
  }
};

export const verify = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Auth']
  #swagger.description = 'Verify JWT token.'
  #swagger.parameters['email'] = {
                in: 'query',
                required: true,
                type: 'string',
                description: 'email of a user.',
  }
  */

  try {
    return res.status(200).send({
      status: 'success',
      data: undefined,
    });
  } catch (e) {
    return res.status(500).send({
      status: 'error',
      data: {},
      message: 'Internal server error',
    });
  }
};
