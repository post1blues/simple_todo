FROM node:16-alpine as build
WORKDIR /app
COPY ./package*.json .
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main"]
