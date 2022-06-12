import { object, string, number, date, ValidationError, boolean } from 'yup';
import { Request, Response } from 'express';
import prisma from '../client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const contactSchemaFull = object({
  phone: string().required(),
  street: string().required(),
  city: string().required(),
  zip: string().required(),
  userID: number().required(),
}).noUnknown();

const contactSchemaUpdate = object({
  id: number().required(),
  phone: string().required(),
  street: string().required(),
  city: string().required(),
  zip: string().required(),
}).noUnknown();

export const getByUserID = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Get user\'s contacts.'
  #swagger.parameters['userID'] = {
                in: 'query',
                required: true,
                type: 'number',
                description: 'Id of user owning this resource.',
                schema: { $ref: '#/definitions/UserId' }
  }
  */

  try {
    const userID = await number().required().validate(req.query.userID);

    const referencedUser = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (!referencedUser) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: "Invalid user ID (user doesn't exist)",
      });
    }

    const contacts = await prisma.contact.findMany({
      where: {
        userID: userID,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: contacts,
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
        message: "Invalid user ID (user doesn't exist)",
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
  #swagger.tags = ['Contacts']
  #swagger.description = 'Update existing contact.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Contact object.',
                schema: { $ref: '#/definitions/UpdateContact' }
  }
  */

  try {
    const data = await contactSchemaUpdate.validate(req.body, { strict: true });

    const contact = await prisma.contact.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: contact,
      message: 'Contact data updated',
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
        message: 'Invalid contact ID',
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
  #swagger.tags = ['Contacts']
  #swagger.description = 'Add new contact.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Contact object.',
                schema: { $ref: '#/definitions/AddContact' }
  }
  */

  try {
    const data = await contactSchemaFull.validate(req.body, { strict: true });

    const contact = await prisma.contact.create({
      data,
    });

    return res.status(201).send({
      status: 'success',
      data: contact,
      message: 'Contact added',
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: 'error',
        data: e.errors,
        message: e.message,
      });
    }
    if (e instanceof PrismaClientKnownRequestError && e.code == 'P2003') {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: 'Invalid user ID (foreign key)',
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
  #swagger.tags = ['Contacts']
  #swagger.description = 'Delete existing contact.'
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

    const contact = await prisma.contact.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: contact,
      message: 'Contact deleted',
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
        message: 'Invalid contact ID',
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
