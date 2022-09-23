# Pairswap

#### Config

```
cp ./public/config.example.js ./public/config.js
```

Can change config at runtime

#### Development

```
yarn dev
```

#### Production (use Docker Registry)

In local machine:

```
docker build -t devsisunetwork/ko-exchange .
docker push devsisunetwork/ko-exchange
```

In remote server:

```
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker pull devsisunetwork/ko-exchange
docker run -p 3000:3000 devsisunetwork/ko-exchange
```
