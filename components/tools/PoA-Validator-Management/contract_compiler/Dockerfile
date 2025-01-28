FROM ubuntu:24.04

# Install git and other necessary dependencies
RUN apt-get update
RUN apt-get install -y git jq software-properties-common golang wget curl

# Set GOPATH and add Go binaries to PATH
ENV GOPATH=/root/go
ENV PATH=$GOPATH/bin:$PATH

ARG SUBNET_EVM_VERSION
RUN go install github.com/ava-labs/subnet-evm/cmd/abigen@$SUBNET_EVM_VERSION

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
