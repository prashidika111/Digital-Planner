# Stage 1: Build the Vite React Application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app for production (outputs to 'dist' folder)
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration to support React Router client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
