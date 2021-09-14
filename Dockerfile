# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:alpine3.14 as build

# Set the working directory
WORKDIR /docker

# Add the source code to app
COPY ./ /docker

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /docker/dist/charge-it /usr/share/nginx/html

# Expose port 80
EXPOSE 80
