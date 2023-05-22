import React from 'react';
import logo from './logo.svg';
import './App.css';




function App() {

  const sendMessage = async () => {
    const paillierBigint = require('paillier-bigint');
    const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(3072)

  // Optionally, you can create your public/private keys from known parameters
  // const publicKey = new paillierBigint.PublicKey(n, g)
  // const privateKey = new paillierBigint.PrivateKey(lambda, mu, publicKey)

  const m1 = 12345678901234567890n
  const m2 = 5n

  // encryption/decryption
  const c1 = publicKey.encrypt(m1)
  console.log(privateKey.decrypt(c1)) // 12345678901234567890n

  // homomorphic addition of two ciphertexts (encrypted numbers)
  const c2 = publicKey.encrypt(m2)
  const encryptedSum = publicKey.addition(c1, c2)
  console.log(privateKey.decrypt(encryptedSum)) // m1 + m2 = 12345678901234567895n

  // multiplication by k
  const k = 10n
  const encryptedMul = publicKey.multiply(c1, k)
  alert(privateKey.decrypt(encryptedMul))
  }


  return (
    <div className="App">
      <header className="App-header">
      <button className='sendbtn' onClick={() => sendMessage()}>sum</button>
      </header>
    </div>
  );
}

export default App;
