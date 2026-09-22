
# Base image
FROM node:20-alpine

# Working directory
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app explicitly
# RUN npm run build --if-present

# Helper to verify files (optional)
RUN ls -la

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "dev"]
