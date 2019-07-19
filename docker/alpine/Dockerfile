FROM alpine:edge
USER root
WORKDIR /usr/src/app

RUN apk --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ upgrade && \
    apk --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ add \
    nodejs nodejs-npm chromium firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox procps
RUN apk add yarn

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
EXPOSE 3000 3007 1337 1338 3200 42424

RUN dbus-daemon --session --fork
RUN Xvfb :1 -screen 1 "1280x768x24" >/dev/null 2>&1 &
RUN export DISPLAY=:1.0
RUN fluxbox >/dev/null 2>&1 &

RUN yarn global add lerna next testcafe
COPY package.json ./

RUN yarn
RUN adduser -D ucurtma
USER ucurtma