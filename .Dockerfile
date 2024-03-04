FROM node:20-alpine as builder
WORKDIR /ng-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /ng-app/dist/pokeapi-frontend/browser /usr/share/nginx/html
EXPOSE 80
