const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'pb138-insurance',
    description: 'Insurance Company API',
  },
  host: 'localhost:3001',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Auth',
      description: '',
    },
    {
      name: 'Users',
      description: '',
    },
    {
      name: 'Cars',
      description: '',
    },
    {
      name: 'Contacts',
      description: '',
    },
    {
      name: 'Insurances',
      description: '',
    },
    {
      name: 'Packages',
      description: '',
    },
  ],
  definitions: {
    AddUser: {
      $email: 'milos.zeman@muni.cz',
      $firstName: 'Milos',
      lastName: 'Zeman',
      $birthDate: new Date().toISOString(),
      $citizenID: '123456',
      $licenseDate: new Date().toISOString(),
      passwdHash: '',
    },
    UpdateUser: {
      $id: 1,
      $email: 'andrej.babis@muni.cz',
      $firstName: 'Andrej',
      lastName: 'Babis',
      $birthDate: new Date().toISOString(),
      $citizenID: '654321',
      $licenseDate: new Date().toISOString(),
      passwdHash: '',
    },

    AddCar: {
      $plate: 'BA123456',
      $brand: 'Tesla',
      $model: 'X',
      $engineSize: 1500,
      $powerKW: 2500,
      $weight: 3500,
      $registered: new Date().toISOString(),
      $fuelType: 2,
      $userID: 1,
    },
    UpdateCar: {
      $id: 1,
      $plate: 'BL123456',
      $userID: 2,
    },

    AddContact: {
      $phone: '0902123123',
      $street: 'Vlhka 22',
      $city: 'Brno',
      $zip: '102455',
      $userID: 1,
    },
    UpdateContact: {
      $id: 1,
      $phone: '0911245671',
      $street: 'Sucha 21',
      $city: 'Brno',
      $zip: '101421',
    },

    AddInsurance: {
      $monthlyRate: 5000,
      $dueDate: new Date().toISOString(),
      $userID: 1,
      $carID: 1,
    },
    UpdateInsurance: {
      $id: 1,
      $monthlyRate: 3500,
      $dueDate: new Date().toISOString(),
    },

    AddPackage: {
      insuranceType: 0,
      insuranceID: 1,
    },

    Login: {
      email: 'test@test.com',
      password: 'abc',
    },

    InsuranceId: {
      $insuranceID: 1,
    },
    UserId: {
      $userID: 1,
    },
  },
  securityDefinitions: {},
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
