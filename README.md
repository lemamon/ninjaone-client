# NinjaOne Devices Manager

This project consists of two applications:

- A backend server (devicesTask_serverApp)
- A frontend client (ninjaone-client)

## Prerequisites

- Node.js (v18 or higher)
- npm (v10 or higher)

## Getting Started

### Setting up the Server

1. First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/NinjaMSP/devicesTask_serverApp
cd devicesTask_serverApp
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will start running on <http://localhost:3000>

### Setting up the Client

1. Open a new terminal and navigate to the client directory:

```bash
git clone https://github.com/lemamon/ninjaone-client
cd ninjaone-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file based on the example:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The client application will be available at <http://localhost:5173>

## Development

### Server

- The server provides a REST API for managing devices
- API endpoints are available at <http://localhost:3000/api/devices>

### Client

- Built with React + Vite
- Uses TypeScript for type safety
- Includes unit tests using Vitest and React Testing Library

## Testing

### Running Tests

For the client:

```bash
cd ninjaone-client
npm test
```
