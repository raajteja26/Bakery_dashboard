# Use an official Node.js image as the base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY  ./package.json .

# Install the dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the application
RUN npm run build

# Set the command to start the application
CMD [ "npm", "start" ]
