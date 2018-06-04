FROM ros:kinetic-ros-core

ADD client client
ADD images images
ADD index.html index.html
ADD package.json package.json
ADD node_modules node_modules
ADD server.js server.js



# Install NVM to install nodejs and npm
# Thanks to remarkablemark and his gist : https://gist.github.com/remarkablemark/aacf14c29b3f01d6900d13137b21db3a
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.12.3

RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install

ENTRYPOINT source /opt/ros/kinetic/setup.bash && npm start


