FROM node:18 AS build
COPY package*.json ./
WORKDIR /app/frontend
RUN npm install && npm run build
WORKDIR /app
COPY --from=build /app/frontend/build /app/frontend/build
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
