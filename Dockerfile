# Use the official Node.js image as a base image
FROM node:16

ENV YARN_VERSION 3.6.1

RUN yarn policies set-version $YARN_VERSION

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install project dependencies in the container using Yarn
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Build the Vue app for production using Yarn
RUN yarn build

# Expose port 80 for the app
EXPOSE 80

# Serve the app using a simple static server
CMD ["yarn", "serve"]
