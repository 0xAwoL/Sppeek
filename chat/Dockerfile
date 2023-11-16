# Use an official Node.js image as the base image
FROM node:20

# Set the working directory within the container
WORKDIR /node

# Copy package.json and package-lock.json (if present) to the container
COPY package.json ./
 
# Install dependencies for development (including dev dependencies)
RUN npm install

# Copy the rest of your application source code
COPY . .

# Expose the port your application will run on
EXPOSE 1337

# Build your TypeScript code
RUN npm run build

# Command to start your production application
CMD ["npm", "run", "dev"]
