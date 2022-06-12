import express from 'express';
import cors from 'cors';
import { cars, contacts, packages, users, insurances, auth } from './api';
import 'dotenv/config';

const api = express();
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/api/test', (req, res) => {
  res.json({ requestBody: req.body, requestQuery: req.query });
});

api.get('/api/cars', cars.getByUserID);
api.put('/api/cars', cars.update);
api.post('/api/cars', cars.add);
api.delete('/api/cars/:id', cars.delet);

api.get('/api/contacts', contacts.getByUserID);
api.put('/api/contacts', contacts.update);
api.post('/api/contacts', contacts.add);
api.delete('/api/contacts/:id', contacts.delet);

api.get('/api/insurances', insurances.getByUserID);
api.put('/api/insurances', insurances.update);
api.post('/api/insurances', insurances.add);
api.delete('/api/insurances/:id', insurances.delet);

api.get('/api/packages', packages.getByInsuranceID);
api.post('/api/packages', packages.add);
api.delete('/api/packages/:id', packages.delet);

api.get('/api/users', users.getByMail);
api.get('/api/users/:id', users.getByID);
api.put('/api/users', users.update);
api.post('/api/users', users.add);
api.delete('/api/users/:id', users.delet);

api.post('/api/auth/login', auth.login);

if (process.env.ENVIRONMENT == 'dev') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerFile = require('../swagger-output.json');
  api.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  console.log(
    `Documentation available at http://localhost:${process.env.PORT}/swagger/`
  );
}

api.listen(process.env.PORT, () =>
  console.log(`API listening on port ${process.env.PORT}`)
);
