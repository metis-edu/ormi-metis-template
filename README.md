# ormi-metis-template

This repository serves as a template to use [Ormi](https://metis.0xgraph.xyz/)'s subgraph on Metis mainnet (Metis Andromeda) and Metis testnet (Metis Sepolia). Here we create a simple event listener to track all transfers for an ERC20 token m.USDC on Andromeda. We also would like to track the number of transfers carried out by each account. The token can be found [here](https://andromeda-explorer.metis.io/token/0xEA32A96608495e54156Ae48931A7c20f0dcc1a21).

Public subgraph: https://metisapi.0xgraph.xyz/subgraphs/name/metis-example/erc20-transfers/graphql

## Code walkthrough

- The folder `abis/` contains the ABI for the smart contracts we want to obtain the data from. In our case, it contains the ABI for mUSD. The ABI can be found [here](https://andromeda-explorer.metis.io/token/0xEA32A96608495e54156Ae48931A7c20f0dcc1a21?tab=contract).

- `schema.graphql` here we define the entities needed in our subgraph. In our case we need two entities; one for storing the transfers details, and another for storing users' total transfers. 

- `subgraph.yaml` This is manifest file which defines what data sources the subgraph will index. The subgraph in this example indexes info from m.USDC contract only. We provide the contract address, ABI, from which block indexing should start, handler function, etc.

> Note: for the sake of this example we set the starting block to be 17000000 (May 10 2024 16:12:37 PM UTC).

- `src/mappings.ts` is an assembly script file which is responsible for handling a caught event and writing the relevant info to the subgraph.

## How to build & deploy your subgraph:

1. You should have Node.js installed on your machine. For installation instructions, please refer to the [official Node.js website](https://nodejs.org/en/download/package-manager).

2. Visit the [Ormi website](https://metis.0xgraph.xyz/login) to create a new account and project. You will use this account for authentication purposes.

3. Install the dependencies:
```
npm install
```

This command will install the needed packages for building and deploying the subgraph on Ormi.

4. Auto-generate subgraph's helper code:
```
npx graph codegen -o src/generated # or npm run codegen
```
This will create `src/generated/` folder. The folder contains the schema as well as the events associated with m.USDC contract that we defined earlier in assembly script.

5. Now we're ready to build our subgraph. We do that with command:
```
npx graph build # npm run build
```
`build/` folder should be created after running this command.

6. To use Ormi, we have to authenticate access using a token which can be found in the [Ormi website](https://metis.0xgraph.xyz/login). Use this command:
```
npx graph auth https://api.0xgraph.xyz/deploy # or npm run auth:mainnet
```
You will be prompted to enter the auth token.

7. After the authentication is complete, let's create a new subgraph instance using this command: 
```
npx graph create --node https://metisapi.0xgraph.xyz/deploy metis-example/erc20-transfers
```
> Note that `metis-example/erc20-transfers` is the name of the subgraph and you change it as you wish as long as you use the same name in the deploy command.

8. Finally we can deploy the subgraph using the command:
```
npx graph deploy metis-example/erc20-transfers --node https://metisapi.0xgraph.xyz/deploy --ipfs https://metisapi.0xgraph.xyz/ipfs
```
A link to your subgraph will be shown in the terminal.

9. And that's it! After the subgraph syncs, you can access it on Ormi to start querying.
