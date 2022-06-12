import { object, string, number, date, ValidationError, boolean } from 'yup';
import { Request, Response } from 'express';
import prisma from '../client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { InsuranceType } from '@prisma/client';

const packageSchemaFull = object({
  insuranceType: number().required(),
  insuranceID: number().required(),
}).noUnknown();

const packageSchemaUpdate = object({
  insuranceType: number().required(),
  insuranceID: number().required(),
}).noUnknown();

export const getByInsuranceID = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Packages']
  #swagger.description = 'Get insurance\'s packages.'
  #swagger.parameters['insuranceID'] = {
                in: 'query',
                required: true,
                type: 'number',
                description: 'Id of insurance.',
                schema: { $ref: '#/definitions/InsuranceId' }
  }
  */

  try {
    const insuranceID = await number()
      .required()
      .validate(req.query.insuranceID);

    const referencedInsurance = await prisma.insurance.findUnique({
      where: {
        id: insuranceID,
      },
    });

    if (!referencedInsurance) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: "Invalid insurance ID (insurance doesn't exist)",
      });
    }

    const packages = await prisma.package.findMany({
      where: {
        insuranceID: insuranceID,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: packages,
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
      // this situation should be usually caught by "if (!referencedInsurance)" above,
      // so this condition applies only if the insurance is deleted inbetween
      return res.status(400).send({
        status: 'error',
        data: {},
        message: "Invalid insurance ID (insurance doesn't exist)",
      });
    }
    return res.status(500).send({
      status: 'error',
      data: {},
      message: 'Internal server error',
    });
  }
};

export const add = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Packages']
  #swagger.description = 'Add new package to insurance.'
  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Package object.',
                schema: { $ref: '#/definitions/AddPackage' }
  }
  */

  try {
    const dataUnparsed = await packageSchemaFull.validate(req.body, {
      strict: true,
    });

    if (dataUnparsed.insuranceType > 2) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: 'Invalid insurance type',
      });
    }

    let insuranceType: InsuranceType = InsuranceType.PZP;
    if (dataUnparsed.insuranceType == 1)
      insuranceType = InsuranceType.HAVARIJNA;
    if (dataUnparsed.insuranceType == 2) insuranceType = InsuranceType.SKLO;

    const data = { ...dataUnparsed, insuranceType: insuranceType };

    const identicalPackage = await prisma.package.findFirst({
      where: {
        insuranceID: data.insuranceID,
        insuranceType: data.insuranceType,
      },
    });

    if (identicalPackage) {
      return res.status(400).send({
        status: 'error',
        data: {},
        message: 'Insurance already contains this package',
      });
    }

    const packag = await prisma.package.create({
      data,
    });

    return res.status(201).send({
      status: 'success',
      data: packag,
      message: 'Package added',
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
        message: 'Invalid insurance ID (foreign key)',
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
  #swagger.tags = ['Packages']
  #swagger.description = 'Delete existing package of insurance.'
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

    const packag = await prisma.package.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: packag,
      message: 'Package deleted',
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
        message: 'Invalid package ID',
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
