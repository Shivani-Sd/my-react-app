# Dockerfile for React Application

# Stage 1: Build ReactJS application
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the React app source code
COPY . ./

# Build the React app
RUN npm run build

# # Stage 2: Serve ReactJS application with Nginx
# FROM nginx:alpine

# # Copy build output from the build stage to Nginx HTML directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Command to run Nginx
# CMD ["nginx", "-g", "daemon off;"]
