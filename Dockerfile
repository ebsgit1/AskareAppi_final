# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the backend code
COPY backend/ .

# Copy the frontend build
COPY frontend/build ./build

# Expose the application port
EXPOSE 5001

# Start the server
CMD ["npm", "start"]