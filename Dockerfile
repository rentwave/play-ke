FROM node:20

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV=stage

ENV PORT=4004

RUN yarn build

EXPOSE 4004

CMD ["yarn", "start"]
