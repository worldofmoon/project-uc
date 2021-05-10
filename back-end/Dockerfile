FROM node:16-alpine


WORKDIR /opt/app
COPY . .

RUN yarn install --prod


ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["yarn", "start"]
