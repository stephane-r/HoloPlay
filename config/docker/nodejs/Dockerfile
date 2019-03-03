FROM beevelop/android

LABEL MAINTAINER STEPHANE RICHIN
LABEL VERSION 0.1
LABEL AUTHOR_EMAIL contact@stephane-richin.fr

# ENV VARIABLES
ENV NODE_VERSION=10.x \
    NODE_HOME="/opt/node" \
    ANDROID_HOME="/opt/android" \
    ANDROID_VERSION=27 \
    ANDROID_BUILD_TOOLS_VERSION=27.0.3\
    GOSU_VERSION=1.10 \
    HOME=/app \
    PATH=$PATH:/opt/node/bin

# NODE
WORKDIR $NODE_HOME
RUN apt-get update \
    && apt-get install -y curl git ca-certificates --no-install-recommends \
    && apt-get clean

RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash -
RUN apt-get update && apt-get -y install nodejs unzip

# ANDROID SDK AND PLATFORM
WORKDIR $ANDROID_HOME
RUN touch /root/.android/repositories.cfg
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager \
    "platform-tools" \
    "platforms;android-${ANDROID_VERSION}" \
    "build-tools;${ANDROID_BUILD_TOOLS_VERSION}"
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager --update

RUN npm install -g yarn
RUN yarn global add react-native-cli flow-typed

# GOSU
WORKDIR $HOME
RUN chmod a+rwx $HOME

ENV GOSU_VERSION $GOSU_VERSION
RUN arch="$(dpkg --print-architecture | awk -F- '{ print $NF }')" \
    && echo $arch \
    && wget -O gosu "https://github.com/tianon/gosu/releases/download/1.10/gosu-$arch" \
    && mv ./gosu /usr/local/bin/gosu \
    && chmod +x /usr/local/bin/gosu

RUN git config --global user.name Novaway

COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod a+x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# VOLUMES
VOLUME ["/app"]

# REAT APP PORT
EXPOSE 8081 3000

# DEFAULT CORDOVA COMMAND
CMD ["react-native", "yarn", "flow-typed"]
