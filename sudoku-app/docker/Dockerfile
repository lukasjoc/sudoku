# build stage
FROM mhart/alpine-node:latest as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

#-------
FROM nginx:mainline-alpine
WORKDIR /usr/share/nginx/html/
COPY $PWD/docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ ./