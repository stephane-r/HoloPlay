FROM openjdk:8

# Forked from https://github.com/theanam/react-native-docker
LABEL MAINTAINER STEPHANE RICHIN
LABEL VERSION 0.1
LABEL AUTHOR_EMAIL contact@stephane-richin.fr

# ENV VARIABLES
ENV NODE_VERSION=10.x \
    SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip" \
    ANDROID_HOME="/usr/local/android-sdk" \
    ANDROID_VERSION=27 \
    ANDROID_BUILD_TOOLS_VERSION=27.0.3\
    GRADLE_VERSION=4.4\
    MAVEN_VERSION=3.6.0 \
    GOSU_VERSION=1.10 \
    HOME=/app

RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash -
RUN apt-get update && apt-get -y install nodejs unzip

WORKDIR ${ANDROID_HOME}

# GET SDK MANAGER
RUN curl -sL -o android.zip ${SDK_URL} && unzip android.zip && rm android.zip
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

RUN touch /root/.android/repositories.cfg

# ANDROID SDK AND PLATFORM
RUN $ANDROID_HOME/tools/bin/sdkmanager --update
RUN $ANDROID_HOME/tools/bin/sdkmanager \
    "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
    "platforms;android-${ANDROID_VERSION}" \
    "platform-tools"

# GRADLE
RUN curl -sL -o gradle.zip https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip && \
    mkdir /opt/gradle && unzip -d /opt/gradle gradle.zip && rm gradle.zip

# MAVEN
RUN curl -sL -o maven.zip https://www-us.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.zip && \
    mkdir /opt/maven && unzip -d /opt/maven maven.zip && rm maven.zip

# ADD PATH TO BASHRC
RUN export PATH=$PATH:$ANDROID_HOME/emulator\
    && export PATH=$PATH:$ANDROID_HOME/tools\
    && export PATH=$PATH:$ANDROID_HOME/tools/bin\
    && export PATH=$PATH:/opt/gradle/gradle-${GRADLE_VERSION}/bin\
    && export PATH=$PATH:/opt/maven/apache-maven-${MAVEN_VERSION}/bin\
    && echo PATH=$PATH:$ANDROID_HOME/platform-tools>>/etc/bash.bashrc

# YARN
RUN npm install -g yarn
RUN yarn global add react-native-cli flow-typed

# CHANGE WORKDIR
WORKDIR $HOME

# VOLUMES
VOLUME ["/app","/root/.gradle"]

# REAT NATIVE AND REACT WEB PORTS
EXPOSE 8081 3000

# DEFAULT COMMAND
CMD ["react-native", "yarn", "flow-typed"]
