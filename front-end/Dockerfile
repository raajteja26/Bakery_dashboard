# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY front-end/package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY front-end/ .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app when the container launches
CMD ["npm", "start"]
