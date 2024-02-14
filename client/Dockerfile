FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the client application
CMD ["npm", "start"]
