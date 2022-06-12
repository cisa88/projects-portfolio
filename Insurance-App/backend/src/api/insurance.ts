import { object, string, number, date, ValidationError, boolean } from 'yup';
import { Request, Response } from 'express';
import prisma from '../client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const insuranceSchemaFull = object({
  monthlyRate: number().required(),
  dueDate: date().required(),
  userID: number().required(),
  carID: number().required(),
}).noUnknown();

const insuranceSchemaUpdate = object({
  id: number().required(),
  monthlyRate: number().required(),
  dueDate: date().required(),
}).noUnknown();

export const getByUserID = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Insurances']
  #swagger.description = 'Get user\'s insurances.'
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

    const insurances = await prisma.insurance.findMany({
      where: {
        userID: userID,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: insurances,
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
      // this situation should be usually caught by "if (!referencedUser)" above,
      // so this condition applies only if the user is deleted inbetween
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
  #swagger.tags = ['Insurances']
  #swagger.description = 'Update existing insurance.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Insurance object.',
                schema: { $ref: '#/definitions/UpdateInsurance' }
  }
  */

  try {
    const data = await insuranceSchemaUpdate.validate(req.body);

    const insurance = await prisma.insurance.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: insurance,
      message: 'Insurance data updated',
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
        message: 'Invalid insurance ID',
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
  #swagger.tags = ['Insurances']
  #swagger.description = 'Add new insurance.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Insurance object.',
                schema: { $ref: '#/definitions/AddInsurance' }
  }
  */

  try {
    const data = await insuranceSchemaFull.validate(req.body);

    const referencedCar = await prisma.car.findUnique({
      where: {
        id: data.carID,
      },
    });

    if (!referencedCar) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: "Invalid car ID (car doesn't exist)",
      });
    }

    if (referencedCar.userID != data.userID) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: "Car's userID and providied userID don't match",
      });
    }

    const insurance = await prisma.insurance.create({
      data,
    });

    return res.status(201).send({
      status: 'success',
      data: insurance,
      message: 'Insurance added',
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
        message: 'Invalid user ID or car ID (foreign key)',
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
  #swagger.tags = ['Insurances']
  #swagger.description = 'Delete existing insurance.'
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

    const insurance = await prisma.insurance.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: insurance,
      message: 'Insurance deleted',
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
    if (e instanceof PrismaClientKnownRequestError && e.code == 'P2003') {
      return res.status(400).send({
        status: 'error',
        data: {},
        message:
          'Foreign key constraint failed (need to delete associated packages first)',
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
