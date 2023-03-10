# RealMQ Platform Config

The app is aware of the following environment variables,
that can also be injected via `.env` file:

| Variable            | Description                                                                  | Default                                         |
|---------------------|------------------------------------------------------------------------------|-------------------------------------------------|
| LOG_LEVEL           | App wide logging verbosity                                                   | `info`                                          |
| PORT                | The HTTP Port the server will listen to                                      | `8080`                                          |
| DB_URL              | MongoDB connection url                                                       | `mongodb://realmq:realmq@database:27017/realmq` |
| API_ADMIN_KEY       | Fixed api key used to authenticate against admin api                         | _empty_                                         |
| API_BROKER_KEY      | Key for securing broker -> platform communication                            | _empty_                                         |
| BROKER_PROTOCOL     | Protocol used for platform -> broker connection                              | `mqtt`                                          |
| BROKER_HOST         | Host used for platform -> broker connection                                  | `broker`                                        |
| BROKER_PORT         | Port used for platform -> broker connection                                  | `1883`                                          |
| BROKER_USERNAME     | Username used for platform -> broker connection                              | `adapter`                                       |
| BROKER_PASSWORD     | Password used for platform -> broker connection                              | `adapter`                                       |
| VERNEMQ_ACCEPT_EULA | In order to use the bundled verneMQ broker, you need to accept their licence | `no`                                            |
