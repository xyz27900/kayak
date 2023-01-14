# Docker Compose

The `docker-compose.yaml` file that is being used for orchestration is located in the `.kayak` directory as well as the `Dockerfile` and by default looks like this:

```yaml
version: "3.9"

services:
  display:
    image: kayak/display
    container_name: display
    environment:
      DISPLAY: :0.0
      DISPLAY_WIDTH: 1280
      DISPLAY_HEIGHT: 720
    ports:
      - "5800:5800"
    networks:
      - kayak-network

  ffmpeg:
    image: kayak/ffmpeg
    container_name: ffmpeg
    depends_on:
      - display
    restart: on-failure
    environment:
      DISPLAY: display:0.0
      DISPLAY_WIDTH: 1280
      DISPLAY_HEIGHT: 720
      VIDEO_FILENAME: output.mp4
      CR_DETECTOR_URL: application:5000
    volumes:
      - $KAYAK_VIDEOS_DIR:/videos
    networks:
      - kayak-network

  anvil:
    image: kayak/anvil
    container_name: anvil
    environment:
      ANVIL_FORK_URL: https://rpc.ankr.com/eth_goerli
      SEED_PHRASE: $SEED_PHRASE
      CHAIN_ID: 1337
    networks:
      - kayak-network

  application:
    build:
      context: ..
      dockerfile: ./.kayak/Dockerfile
    container_name: kayak-application
    depends_on:
      - display
    environment:
      DISPLAY: display:0.0
    env_file:
      - ../.env
    networks:
      - kayak-network

networks:
  kayak-network:
```

If you need more services for testing (for example, a backend or a database), you can add them here.

::: warning
During the modification, please keep in mind the following:

1. The `CR_DETECTOR_URL` variable in the `ffmpeg` service should point to the container where the browser is running and the port should be `5000`. It is used to detect whether the browser is launched or not.
2. The `DISPLAY` variable should be the same across all services.
3. All containers should share the same network.
:::

## Local Testnet Node

As you might notice, there is a service called `anvil` in the `docker-compose.yaml` file. This is a local testnet node that uses [Anvil](https://book.getfoundry.sh/anvil/).

You need to specify the `SEED_PHRASE` and `CHAIN_ID` variables — they are being passed to `--mnemonic` and `--chain-id` flags respectively.

## Environment variables

| Variable          | Description                                                                                                        |
|-------------------|--------------------------------------------------------------------------------------------------------------------|
| `DISPLAY`         | The display that is used for testing.                                                                              |
| `DISPLAY_WIDTH`   | The width of the display.                                                                                          |
| `DISPLAY_HEIGHT`  | The height of the display.                                                                                         |
| `VIDEO_FILENAME`  | The name of the video file that will be saved in the `videosDir` directory.                                        |
| `CR_DETECTOR_URL` | The URL of the `chrome-detector`. It is running in the `application` container.                                    |
| `ANVIL_FORK_URL`  | The URL of the Ethereum network to be forked.                                                                      |
| `SEED_PHRASE`     | The seed phrase of the account that is used for testing. To use the test node account in Metamask, leave it as is. |
| `CHAIN_ID`        | The ID of the network in your local node.                                                                          |
