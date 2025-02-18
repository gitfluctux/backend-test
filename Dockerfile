FROM node:22.3.0 AS builder

WORKDIR /build

COPY package*.json .
RUN npm install

COPY server.ts server.ts
COPY tsconfig.json tsconfig.json
RUN npm run build

FROM ubuntu AS runner

RUN apt update && apt upgrade -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs
RUN apt install -y npm

WORKDIR /app

COPY --from=builder /build/package*.json .
COPY --from=builder /build/node_modules node_modules/
COPY --from=builder /build/dist dist/

CMD [ "npm", "start" ]