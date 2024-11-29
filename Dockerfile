FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["database:5432", "--", "npm", "run", "dev"]
