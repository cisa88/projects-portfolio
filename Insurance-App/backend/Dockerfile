FROM node:18-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
RUN npm install
EXPOSE 3001
ENV ENVIRONMENT=prod
CMD ["npm", "run", "prod"]
