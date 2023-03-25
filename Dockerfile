# Use an official Node.js runtime as a parent image
FROM node:14.17-alpine as build-stage

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json from local folder to the container
COPY package*.json ./

# Install app dependencies using npm
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js app
RUN yarn build

# Use a smaller Node.js image as a parent image for the production build
FROM nginx:stable-alpine as production-stage

# Copy nginx configuration
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Set the working directory in the container to /app
WORKDIR /app

# Copy only the build files from the build-stage container to the production-stage container
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 7000 for the application
EXPOSE 7000

# Start the HTTP server when the container starts
CMD ["nginx", "-g", "daemon off;"]
