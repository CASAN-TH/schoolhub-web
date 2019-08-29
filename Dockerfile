# Stage 0, based on Node.js, to build and compile Angular
FROM node:8.9 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run deploy

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
## Clear All .Conf All
RUN rm /etc/nginx/conf.d/*
## Copy our default nginx config
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=node /app/dist /usr/share/nginx/html
## Command for start service
CMD ["nginx", "-g", "daemon off;"]