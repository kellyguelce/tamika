FROM node:20
WORKDIR /app

# Copy requiements
COPY package*.json ./
# Install requirements
RUN npm install
# Copy all project files
COPY . .
# Expose sveltekit port
EXPOSE 5173