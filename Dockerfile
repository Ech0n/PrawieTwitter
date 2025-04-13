FROM node:18

WORKDIR /app/client

COPY client/ /app/client/
RUN npm ci

RUN npm run build

WORKDIR /app

COPY server/ /app/server/
RUN cd server && npm ci

RUN cp -r /app/client/dist/* /app/server/public

EXPOSE 3000

WORKDIR /app/server

CMD ["npm", "start"]