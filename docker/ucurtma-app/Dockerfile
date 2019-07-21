FROM alpine:edge

RUN apk --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ upgrade && \
    apk --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ add \
    firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox procps
RUN apk add yarn

RUN dbus-daemon --session --fork
RUN Xvfb :1 -screen 1 "1280x1024x24" >/dev/null 2>&1 &
RUN export DISPLAY=:1.0
RUN fluxbox >/dev/null 2>&1 &

EXPOSE 3000 6006

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app
COPY . .
RUN yarn

