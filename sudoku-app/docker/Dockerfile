FROM mhart/alpine-node:12 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && \
	npm prune --production

FROM nginx:stable-alpine
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html

