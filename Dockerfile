FROM node:12.16.1-buster

# RUN apt-get update && apt-get install -y powerline fonts-powerline zsh time less && apt-get clean
# RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# RUN sed -i 's/plugins=\(.*\)/plugins=(git-prompt)/' /root/.zshrc
# RUN echo disable -r time >> /root/.zshrc
# RUN echo 'alias time="time -p "' >> /root/.zshrc
ENTRYPOINT cd /docker_*  git --no-pager diff ; bash

RUN git clone https://github.com/emscripten-core/emsdk.git
WORKDIR /emsdk
RUN git pull
RUN ./emsdk install 1.39.10
RUN ./emsdk activate 1.39.10
RUN apt-get update
RUN apt-get install -y default-jre cmake
# RUN echo source /emsdk/emsdk_env.sh >> ~/.zshrc
# RUN /emsdk/upstream/emscripten/embuilder.py build libcompiler_rt libc-wasm libdlmalloc libpthread_stub libc_rt_wasm libsockets
# RUN /emsdk/upstream/emscripten/embuilder.py build struct_info --pic

ENV PREFIX /local

WORKDIR /build
ENV OGG_FILE "https://downloads.xiph.org/releases/ogg/libogg-1.3.4.tar.xz"
RUN curl -L $OGG_FILE | tar xJ
WORKDIR /build/libogg-1.3.4
RUN /emsdk/upstream/emscripten/emconfigure ./configure --disable-shared --prefix=$PREFIX
RUN /emsdk/upstream/emscripten/emmake make install

WORKDIR /build
ENV VORBIS_FILE "https://downloads.xiph.org/releases/vorbis/libvorbis-1.3.6.tar.xz"
RUN curl -L $VORBIS_FILE | tar xJ
WORKDIR /build/libvorbis-1.3.6
RUN /emsdk/upstream/emscripten/emconfigure ./configure --disable-shared --prefix=$PREFIX
RUN /emsdk/upstream/emscripten/emmake make install