FROM node:16-alpine

RUN apk update && apk upgrade
RUN apk add make

WORKDIR /opt/app

COPY . .
RUN make build

ENTRYPOINT ["./entrypoint.sh" ]
CMD ["yarn", "start"]
