FROM node:15.7.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm install
ARG APIHOST
ENV APIHOST=http://3.34.215.218:3000
ARG TESTCODE
ENV TESTCODE=http://ec2-13-209-109-159.ap-northeast-2.compute.amazonaws.com:3001
ARG IAM
ENV IAM=http://3.34.215.218:80/
RUN REACT_APP_SERVER_HOST="${APIHOST}" REACT_APP_TESTCODE="${TESTCODE}" REACT_APP_HOST="${IAM}" npm run build

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
