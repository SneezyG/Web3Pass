# 🔐 Web3Pass: An Ethereum based login system

A decentralized login system that enables users to authenticate securely using their Ethereum wallet (e.g., MetaMask) by signing cryptographic messages. It verifies signatures server-side and returns a JWT token for protected API access — without requiring usernames or passwords.

## [See Web3Pass Code Repo](https://github.com/SneezyG/Web3Pass)

---

## 🚀 Key Features  
- **Wallet-Based Login**: Authenticate users through wallet signatures (Sign-In with Ethereum).
- **Signature Verification**: Securely validate the signed message and address on the server.
- **JWT Token Issuance**: Return time-limited JWT tokens for stateless session handling.
- **Protected API Routes**: Use the token to access backend routes securely.
- **Frontend/Backend Integration**: Fully functional project with both client and server logic.

---

## 📍 Use Cases  
- **dApp Login Systems**: Replace traditional login flows in decentralized apps.
- **DAO Membership Gates**: Restrict features or dashboards to verified wallet holders.
- **NFT Platform Access**: Gate NFT management or minting behind verified identity.
- **Wallet-Based Account Linking**: Link wallet addresses to off-chain profiles securely.
- **Crypto Payment Auth**: Confirm wallet ownership before processing Web3 payments.

---

## 🧠 Architecture  
The frontend prompts the user to connect their wallet and sign a login challenge. That message and its signature are sent to a Node.js backend. The server verifies the signature using Ethers.js and issues a JWT token. Protected routes use this token for access control, maintaining a secure session without passwords.

---

## ⚙️ Technology Stack  
| Layer          | Technology         |
|----------------|--------------------|
| Frontend       | HTML, JavaScript, Ethers.js |
| Wallet Provider| MetaMask (EIP-1193) |
| Backend        | Node.js, Express.js |
| Auth Tokens    | JSON Web Token (JWT) |
| Signature Tools| Ethers.js (server & client) |
| Message Signing| Ethereum ECDSA (`signMessage`) |

---

## 🔌 API Endpoints  

**POST /login**  
- Accepts: `{ address, message, signature }`  
- Verifies the signature and returns a JWT if valid.

**GET /protected**  
- Requires: `Authorization: Bearer <token>`  
- Returns a protected message if the token is valid and unexpired.

---

## 📦 Authentication Logic  
1. The frontend calls `eth_requestAccounts` to request wallet access.
2. A login message (with timestamp or nonce) is signed by the user.
3. The backend uses `ethers.utils.verifyMessage()` to recover the signing address.
4. If the address matches, a JWT token is returned.
5. This token is stored and sent with requests to access secure endpoints.

---

## 🛡️ Notes  
- MetaMask must be installed in the browser to use this system.
- Signing does not expose the user's private key — only wallet ownership is proven.
- JWT tokens can be stored in localStorage, cookies, or memory based on your app needs.
- Tokens should be time-limited for security (e.g., 1 hour).
- Backend routes can use middleware to enforce token verification.

---
