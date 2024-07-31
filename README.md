# Simple NodeJS app

This is a simple Node app using:
  - Express (for the HTTP server)
  - Sequelize (as the ORM for communicating with the database - a mariadb database)
  - Pug (as a templating engine - for rendering webpages)
  - Winston (for logging)

## How to use

### Local

1. Run `yarn install`
1. Copy the `.env_copy` file, rename it to `.env` and fill in the necessary environment variables:
    - `POD_NAME`: it's recommended to use `local`
    - `PORT`: you can either delete it - as it defaults to `3838` - or you can set it to any port you like (but make sure it's not in use!)
1. Run `npm run dev`
1. Navigate to `http://127.0.0.1:PORT`

### Kubernetes

1. TODO: Document
1. Also, make sure that in the Pod spec (be it a single Pod, or a Pod part of a DeploymentSet/ReplicaSet) you provision the Pod's name:

  ```yaml
  ...
  spec:
    env:
      - name: POD_NAME
        valueFrom:
          fieldRef:
            fieldPath: metadata.name
  ...
  ```
