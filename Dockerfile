# Use an official Node.js runtime as a parent image
FROM node:20.10.0 as builder

# Set the working directory to /frontend
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code to the working directory
COPY frontend ./

# Build the Angular app for production
RUN ng build

# Create a new stage for the backend
FROM node:20.10.0

# Set the working directory to /backend
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code to the working directory
COPY backend ./

# Copy the built frontend code from the previous stage into the backend public folder
COPY --from=builder /frontend/dist/frontend ./public

# Expose the port your Node.js app is running on (change if needed)
EXPOSE 8000

# Start your Node.js app
CMD ["node", "server.js"]
