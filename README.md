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
docker build -t froggy000/ko-exchange .
docker push froggy000/ko-exchange
```

In remote server:

```
./scripts/build.sh
```
