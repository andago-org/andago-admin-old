# Build the Node.js app
FROM node:16 as builder

WORKDIR /app

COPY .yarn .yarn/
RUN apt-get update && apt-get install -y build-essential && apt-get clean
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
COPY package.json yarn.lock .yarnrc .yarnrc.yml ./
RUN yarn install
COPY . .
RUN yarn build

# Nginx phase
FROM nginx:alpine

# Copy the built app to the Nginx server
COPY --from=builder /app/dist /app/dist
# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
