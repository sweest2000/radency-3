# Use the official Node.js image as the base image
FROM node:20-alpine3.17

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json or yarn.lock file into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your NestJS app is running (replace 3000 with your actual port)
EXPOSE 4000

# Set any required environment variables
ENV NODE_ENV=development

# Start your NestJS application
CMD ["npm", "run", "start:dev"]
