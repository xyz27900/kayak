FROM --platform=$BUILDPLATFORM alpine:3.15 AS builder

RUN apk --no-cache add \
    bash \
    curl \
    git

RUN curl -L https://foundry.paradigm.xyz | bash \
    && /root/.foundry/bin/foundryup

FROM --platform=$BUILDPLATFORM bitnami/minideb

COPY --from=builder /root/.foundry/bin/anvil /usr/bin/anvil

ENV ANVIL_IP_ADDR=0.0.0.0

EXPOSE 8545

CMD ["sh", "-c", "anvil --no-cors --silent --fork-url $ANVIL_FORK_URL --mnemonic \"$SEED_PHRASE\" --chain-id $CHAIN_ID"]
