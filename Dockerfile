# Base image
FROM node:lts-alpine

# Author
LABEL MAINTEINER="Henrique Schroeder"

# Defining main directory
WORKDIR /app

# Instaling dependencies
ENV NODE_ENV production
ENV TZ 'America/Sao_Paulo'

# Increasing NODEJS memory
ARG MAX_OLD_SPACE_SIZE=2048
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

# Copy application
COPY node_modules/ node_modules
COPY package.json package.json
COPY packages/backend/prisma prisma
COPY packages/backend/dist/ backend

# Defining environment variables
ENV PORT 80
ENV DATABASE_URL mysql://root:wallet_190_pass@mariadb:3306/walletship
# Exposing service running port
EXPOSE 80

# Starting app
CMD [ "npm", "run", "start:backend" ]
