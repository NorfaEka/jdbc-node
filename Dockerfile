FROM ubuntu:20.04

ENV TZ=Asia/Jakarta \
    DEBIAN_FRONTEND=noninteractive

# Install required libraries
RUN apt-get update \
    && apt-get -y install sudo build-essential \
    && apt-get -y install unzip curl wget git nano \
    && apt-get -y install lsb-release ca-certificates apt-transport-https software-properties-common \
    && apt-get -y install unixodbc unixodbc-dev

COPY . /home/ubuntu/jdbc-node/

WORKDIR /home/ubuntu/jdbc-node/

# Installing Node
SHELL ["/bin/bash", "--login", "-i", "-c"]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN source /root/.bashrc && nvm install 18.16.1
SHELL ["/bin/bash", "--login", "-c"]

# Install odbc
RUN mkdir -p /usr/lib/intersystems/odbc
RUN cd /usr/lib/intersystems/odbc/ \
    && wget -q https://github.com/intersystems-community/iris-driver-distribution/raw/main/ODBC/lnxubuntu1804/ODBC-2022.1.0.209.0-lnxubuntu1804x64.tar.gz \
    && tar -xzvf /usr/lib/intersystems/odbc/ODBC-2022.1.0.209.0-lnxubuntu1804x64.tar.gz \
    && ./ODBCinstall \
    && rm -f ODBC-2022.1.0.209.0-lnxubuntu1804x64.tar.gz

RUN ln -s /usr/lib/x86_64-linux-gnu/libodbccr.so.2.0.0 /etc/libodbccr.so

EXPOSE 3000