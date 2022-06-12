import { object, string, number, date, ValidationError, boolean } from 'yup';
import { Request, Response } from 'express';
import prisma from '../client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { FuelType } from '@prisma/client';

const carSchemaFull = object({
  plate: string().required(),
  brand: string().required(),
  model: string().required(),
  engineSize: number().required(),
  powerKW: number().required(),
  weight: number().required(),
  registered: date().required(),
  fuelType: number().required(),
  userID: number().required(),
}).noUnknown();

const carSchemaUpdate = object({
  id: number().required(),
  plate: string().required(),
  userID: number().required(),
}).noUnknown();

export const getByUserID = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Cars']
  #swagger.description = 'Get all cars owned by user.'
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

    const cars = await prisma.car.findMany({
      where: {
        userID: userID,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: cars,
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
  #swagger.tags = ['Cars']
  #swagger.description = 'Update existing car.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Car object.',
                schema: { $ref: '#/definitions/UpdateCar' }
  }
  */

  try {
    const data = await carSchemaUpdate.validate(req.body, { strict: true });

    const car = await prisma.car.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: car,
      message: 'Car data updated',
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
        message: 'Invalid car ID',
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

export const add = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Cars']
  #swagger.description = 'Add new car.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Car object.',
                schema: { $ref: '#/definitions/AddCar' }
  }
  */

  try {
    const dataUnparsed = await carSchemaFull.validate(req.body);

    if (dataUnparsed.fuelType > 4) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: 'Invalid fuel type',
      });
    }

    let fuelType: FuelType = FuelType.DIESEL;
    if (dataUnparsed.fuelType == 1) fuelType = FuelType.ELECTRIC;
    if (dataUnparsed.fuelType == 2) fuelType = FuelType.GASOLINE;
    if (dataUnparsed.fuelType == 3) fuelType = FuelType.HYBRID;
    if (dataUnparsed.fuelType == 4) fuelType = FuelType.LPG;

    const data = { ...dataUnparsed, fuelType: fuelType };

    const car = await prisma.car.create({
      data,
    });

    return res.status(201).send({
      status: 'success',
      data: car,
      message: 'Car added',
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
      message: 'Voľačo sa dojebalo \u00AF\\_(\u30C4)_/\u00AF',
    });
  }
};

export const delet = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Cars']
  #swagger.description = 'Delete existing car.'
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

    const car = await prisma.car.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: car,
      message: 'Car deleted',
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
        message: 'Invalid car ID',
      });
    }
    if (e instanceof PrismaClientKnownRequestError && e.code == 'P2003') {
      return res.status(400).send({
        status: 'error',
        data: {},
        message:
          'Foreign key constraint failed (need to delete associated insurance first)',
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
