import { object, string, number, date, ValidationError, boolean } from 'yup';
import { Request, Response } from 'express';
import prisma from '../client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SALT_ROUNDS } from '../common';
import * as bcrypt from 'bcrypt';

const userSchemaFull = object({
  email: string().required(),
  firstName: string().required(),
  lastName: string(),
  birthDate: date().required(),
  citizenID: string().required(),
  licenseDate: date().required(),
  passwdHash: string(),
}).noUnknown();

const userSchemaUpdate = object({
  id: number().required(),
  email: string().required(),
  firstName: string().required(),
  lastName: string(),
  licenseDate: date().required(),
  passwdHash: string(),
}).noUnknown();

export const getByMail = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Users']
  #swagger.description = 'Fetch single user by email.'
  #swagger.parameters['email'] = {
                in: 'query',
                required: true,
                type: 'string',
                description: 'email of a user.',
  }
  */

  try {
    const email = await string().required().validate(req.query.email);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: "Invalid user email (user doesn't exist)",
      });
    }
    return res.status(200).send({
      status: 'success',
      data: user,
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

export const getByID = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Users']
  #swagger.description = 'Fetch single user by id.'
  #swagger.parameters: [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ]
  */

  try {
    const id = await number().required().validate(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: 'error',
        data: {},
        message: "Invalid user ID (user doesn't exist)",
      });
    }

    return res.status(200).send({
      status: 'success',
      data: user,
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

export const update = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Users']
  #swagger.description = 'Update existing user.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User object.',
                schema: { $ref: '#/definitions/UpdateUser' }
  }
  */

  try {
    const data = await userSchemaUpdate.validate(req.body);

    if (data.passwdHash) {
      const hash = await bcrypt.hash(data.passwdHash, SALT_ROUNDS);
      data.passwdHash = hash;
    }

    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: user,
      message: 'User data updated',
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: 'error',
        data: e.errors,
        message: e.message,
      });
    }
    if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: 'Invalid user ID',
      });
    }
    console.log(e);
    return res.status(500).send({
      status: 'error',
      data: {},
      message: 'Internal server error',
    });
  }
};

export const add = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Users']
  #swagger.description = 'Add new user.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User object.',
                schema: { $ref: '#/definitions/AddUser' }
  }
  */

  try {
    const data = await userSchemaFull.validate(req.body);

    if (data.passwdHash) {
      const hash = await bcrypt.hash(data.passwdHash, SALT_ROUNDS);
      data.passwdHash = hash;
    }

    const user = await prisma.user.create({
      data,
    });

    return res.status(201).send({
      status: 'success',
      data: user,
      message: 'User added',
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: 'error',
        data: e.errors,
        message: e.message,
      });
    }
    if (e instanceof PrismaClientKnownRequestError && e.code == 'P2002') {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: 'Unique constraint failed (duplicate email)',
      });
    }
    console.log(e);
    return res.status(500).send({
      status: 'error',
      data: {},
      message: 'Internal server error',
    });
  }
};

export const delet = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Users']
  #swagger.description = 'Delete existing user.'
  #swagger.parameters: [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ]
  */

  try {
    const id = await number().required().validate(req.params.id);

    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: user,
      message: 'User deleted',
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: 'error',
        data: e.errors,
        message: e.message,
      });
    }
    if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: 'Invalid user ID',
      });
    }
    if (e instanceof PrismaClientKnownRequestError && e.code == 'P2003') {
      return res.status(400).send({
        status: 'error',
        data: {},
        message:
          'Foreign key constraint failed (need to delete associated cars and insurances first)',
      });
    }
    console.log(e);
    return res.status(500).send({
      status: 'error',
      data: {},
      message: 'Internal server error',
    });
  }
};
