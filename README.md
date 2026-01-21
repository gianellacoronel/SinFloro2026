# Sin Floro 2026 🇵🇪

> **WORK IN PROGRESS**: This project is currently under active development. All feedback is welcome!

**Sin Floro 2026** is a decentralized application (dApp) built for the 2026 Peruvian General Elections (Sunday, April 12). This educational project leverages Web3 technology to create a prediction market where users can mint **INTI tokens** and place bets on their favorite presidential candidates.

The goal is to demonstrate how blockchain technology can be applied to prediction markets, ensuring immutability and transparent fund management, while learning about EVM-compatible tokens and modern frontend integration.

## 🚀 Features

- **Mint INTI Tokens**: Users can mint their own ERC-20 tokens (INTI) to participate in the market.
- **Bet on Candidates**: Use your INTI tokens to place bets on presidential candidates you think will win.
- **Real-time Tracking**: View the accumulated bets for each candidate on the blockchain.
- **Educational Focus**: A practical example of integrating Foundry smart contracts with a Next.js frontend.

## 🛠 Tech Stack

This project works with a modern Web3 stack:

### Smart Contracts

- **[Foundry](https://book.getfoundry.sh/)**: A blazing fast, portable and modular toolkit for Ethereum application development written in Rust. Used for developing, testing, and deploying contracts.
- **Solidity**: The primary programming language for implementing the smart contracts (`IntiToken` and `SinFloro` contracts).

### Frontend

- **[Next.js 16](https://nextjs.org/)**: The React framework for the web.
- **[Wagmi](https://wagmi.sh/)**: React Hooks for Ethereum.
- **[Viem](https://viem.sh/)**: TypeScript Interface for Ethereum.
- **[Convex](https://www.convex.dev/)**: Backend-as-a-Service for reactivity.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**, **pnpm**, or **yarn**
- **[Foundry](https://getfoundry.sh/)**: Run `curl -L https://foundry.paradigm.xyz | bash` and then `foundryup`.

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gianellacoronel/SinFloro2026.git
cd SinFloro2026
```

### 2. Smart Contracts Setup (`contracts/`)

Navigate to the contracts directory to compile and test the smart contracts.

```bash
cd contracts

# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test
```

### 3. Frontend Setup (`web/`)

Navigate to the web directory to run the application.

```bash
cd ../web

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `contracts/`: Contains the Solidity smart contracts, tests, and deployment scripts. Source code is in `contracts/src/` (e.g., `IntiToken.sol`, `SinFloro.sol`).
- `web/`: Contains the Next.js frontend application, components, and integration logic with Wagmi/Viem.
