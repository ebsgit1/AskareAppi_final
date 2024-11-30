# Step 1: Build frontend
FROM node:16 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Step 2: Build backend
FROM node:16 AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
COPY --from=frontend /app/frontend/build ./build

# Expose port
EXPOSE 5001

# Start the backend server
CMD ["node", "index.js"]