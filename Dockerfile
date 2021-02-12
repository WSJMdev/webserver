FROM node:15.7.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html
ENV REACT_APP_SERVER_HOST http://222.107.252.206:3001

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
