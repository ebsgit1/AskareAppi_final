FROM node:20
WORKDIR /app
COPY package*.json ./
COPY ./backend /app
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
