# SSL Proxy Server

Create a lightweight, simple, and customizable secure reverse proxy server within a secure connection. Built with Node.js and Typescript.

Example Usecase:

```
http://localhost:3000 -> https://localhost
```

## ❗IMPORTANT NOTE

Before getting started, please do not use this tool for bad purpose. Please use this tool for development purposes only, it also not recommended for production purposes.

## 🔐 Why SSL?

Heres why:

- 🛡️ **Data Encryption**: SSL ensures all data transferred between the client and server is encrypted, protecting sensitive information like passwords, tokens, and personal data from being intercepted.

- ✅ **Authentication**: SSL certificates verify the identity of your server, so clients know they're communicating with the real service—not an impostor or a man-in-the-middle.

- 📦 **Required by APIs & Browsers**: Many modern APIs, payment processors, and browser features (like Service Workers or HTTP/2) require HTTPS to function.

## 🛠️ Installation

1. Clone this repository.

```bash
git clone https://github.com/bryanfks-dev/SSL-Proxy-Server.git
```

2. Redirect to the cloned repository.

```
cd ssl-proxy-server
```

3. Install npm packages.

```
npm install
```

## 🧪 Usage

```bash
npm start <target-url>
```

There more command line argument coming in the future.
