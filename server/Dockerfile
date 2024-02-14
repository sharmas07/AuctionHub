FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server application code
COPY . .

# Expose the port the server runs on
EXPOSE 8080

# Command to run the server
CMD ["node", "index.js"]
