# Stage 1
FROM node:20.10.0

ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]

# To use with NGINX
##Stage 1
#FROM node:17-alpine as builder
#WORKDIR /app
#COPY package*.json .
#COPY yarn*.lock .
#RUN yarn install
#COPY . .
#RUN yarn build
#
##Stage 2
#FROM nginx:1.19.0
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=builder /app/build .
#ENTRYPOINT ["nginx", "-g", "daemon off;"]