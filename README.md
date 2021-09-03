# My ethereum project

This project is a self-learning project to catch up with ethereum hot topics.
At the moment, this project launch a private blockchain using ganache-cli with following accounts that you can use

```
  Available Accounts
  ==================
  (0) 0xB75B39AeD12e1DAE8323AB4E9E5af07f65059f3f (100 ETH)
  (1) 0xF47AA466d0F965B5408c0039F5EcDb25feF604Ba (100 ETH) �🔒
  (2) 0xbd83f86912d91F57f79aB1501046d6105582bb5d (100 ETH) �🔒
  (3) 0xf2527506c1F44aD22Ec62e6f5F91D83E7C31aF17 (100 ETH) �🔒

  Private Keys
  ==================
  (0) 0xd11e703a71ee71689c1753c7e0b5ecf36a4eae43ae80e3d25d5f6a2febb29584
  (1) 0xbc2d4d5e6dbeb137fd6a46014ce007fd38fddb7b1ff1d35676c3ce202bf449a9
  (2) 0xd6bd8715932a5a773085632525c9d0b6d24047d8ff7c170a526d5cbea9e71504
  (3) 0xfbc6144c225f4e8bf0720e13c652fac0aadf8ab4a5c8da1f5c77d76eb832eedd
```

## Getting started

You must first install Node.js >= v10.13.0 and npm >= 6.4.1.
Using `npm install` to install all dependencies

### Start project

Firstly, because this project was using private blockchain on local network, to start a network: \

```
  npm run dev:bc
```

then we deploy our smart contract to our newly created blockchain network\

```
  npm run dev:migrate
```

Runs the app in the development mode by using command: \

```
  npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
