# installing dependencies
# FROM nikolaik/python-nodejs:python3.7-nodejs11 as node_cache
FROM node:alpine AS node_cache
WORKDIR /usr/local/demo_ts
COPY package*.json ./
RUN npm install

# test
# FROM node_cache AS tests
# COPY src/ ./src/
# COPY __tests__/ ./__tests__/
# COPY jest.config.js ./jest.config.js
# COPY tsconfig.json ./tsconfig.json
# RUN npm run test

# build
FROM node_cache AS build
COPY src/ ./src/
COPY tsconfig.json ./tsconfig.json
COPY tslint.json ./tslint.json
COPY knexfile.js ./knexfile.js
RUN npm run build

# run
FROM build AS release
# COPY config ./config/
# COPY deps ./deps/
# RUN pip install -r ./deps/.../requirements.txt
CMD ["npm", "run", "start"]
