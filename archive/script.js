const addressField = document.getElementById("address");
const loginButton = document.getElementById("login");
const transferButton = document.getElementById("transfer");
const messageText = document.getElementById("message");

const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0x814f",
  rpcTarget: "https://api.zq2-prototestnet.zilliqa.com",
  displayName: "Zilliqa 2 EVM Testnet",
  blockExplorerUrl: "https://explorer.zq2-prototestnet.zilliqa.com/",
  ticker: "ZIL",
  tickerName: "Zilliqa",
  logo: "https://iili.io/dSYPeSa.png",
};

const ethers = window.ethers;
var ethersProvider;
var signer;
var address;

async function handleLoginClick() {
  const privateKeyProvider = new window.EthereumProvider.EthereumPrivateKeyProvider({
    config: { chainConfig: chainConfig },
  });

  const web3auth = new window.Modal.Web3Auth({
    clientId: "BABh-fCnfqibZJmjc-WZ0pFrmT31OozpS8_VEhXRm8lKRp7nAsQw_XwF4DBcDfEMvFTzB_bH4qJnI4z-9w94SCY",
    web3AuthNetwork: "sapphire_devnet",
    privateKeyProvider,
  });

  await web3auth.initModal();
  await web3auth.connect();

  const provider = web3auth.provider;
  ethersProvider = new ethers.providers.Web3Provider(provider);

  const user = await web3auth.getUserInfo();
  console.log(user);

  signer = await ethersProvider.getSigner();
  address = await signer.getAddress();

  const balance = ethers.utils.formatEther(
    await ethersProvider.getBalance(address), 
  );
  console.log(address, balance);

  transferButton.disabled = balance === 0;

  messageText.textContent = `Welcome ${user.name}, your account ${address} has a balance of ${balance} ZIL.`;

  if (balance === 100)
    messageText.innerHTML += `Get some ZIL from the <a href="https://faucet.zq2-prototestnet.zilliqa.com">faucet</a>.`;
}

async function handleTransferClick() {
  const destination = addressField.value;
  const amount = ethers.utils.parseEther("1.0"); 

  const tx = await signer.sendTransaction({
    to: destination,
    value: amount,
  });
  console.log(tx);

  const receipt = await tx.wait();
  console.log(receipt);

  const balance = ethers.utils.formatEther(
    await ethersProvider.getBalance(address),
  );
  console.log(address, balance);

  transferButton.disabled = balance === 0;

  messageText.innerHTML = `You transferred ${ethers.utils.formatEther(amount)} ZIL to ${destination} in <a href="https://explorer.zq2-prototestnet.zilliqa.com/tx/${tx.hash}">this</a> transaction. Your account ${address} has a new balance of ${balance} ZIL`;
}

loginButton.addEventListener("click", handleLoginClick);
transferButton.addEventListener("click", handleTransferClick);
