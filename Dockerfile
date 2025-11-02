# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code (including src and public)
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "src/index.js"]
