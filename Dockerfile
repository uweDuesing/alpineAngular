FROM nginx:1.23.0-alpine as developer
WORKDIR /container
ENV TZ "Pacific/Auckland"
RUN apk add --update nodejs npm
RUN apk add --update npm


FROM nginx:1.23.0-alpine as builder
WORKDIR /container
COPY . /container/
ARG configuration=production
RUN npm install
RUN node --max-old-space-size=8192 ./node_modules/.bin/ng build --configuration production


FROM nginx:1.23.0-alpine as deployer
ARG VERSION
ENV VERSION $VERSION
ARG BUILD_NUMBER
ENV BUILD_NUMBER $BUILD_NUMBER
ARG GIT_COMMIT
ENV GIT_COMMIT $GIT_COMMIT
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/
COPY --from=builder /container/dist/ ./
COPY ./startup.sh ./
RUN chown -R nginx /usr/share/nginx/html
EXPOSE 80
RUN chmod +x startup.sh
CMD ["/bin/ash", "./startup.sh"]
