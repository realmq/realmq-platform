# RealMQ Platform

## Directory Structure
```
src
  api (all http endpoints)
    lib
    admin
      lib
      v1 -> https://api.realmq.com/admin/v1
        lib
        routes
          resource
            {id}
              update.js
              update.(test|spec).js
              delete.js
            create.js
            list.js
    client
      v1 -> https://api.realmq.com/client/v1
        routes
          resource
            {id}
              update
                lookupResource.js
              update.js
              delete.js
            create.js
            list.js
    broker
      v1
        routes
    webhooks
      v1
        routes
  config
  lib
  models
    realm.js -> module.exports = ({ name, lastname }) => ({});
  repositories
  rules
    channel
      index.js
  tasks (use cases)
    lib
    admin
      realm
        create.js
docs
  architecture
    app.md
  specification
    index.md
```
