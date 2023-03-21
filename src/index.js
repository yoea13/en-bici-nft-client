const { ethers } = require("ethers");
// debo importar ethers al proyecto con yarn add ethers
// si clono un proyecto ejecutando "yarn" importa todas las dependencias
// ejecuto en el directorio hardhat-simple-storage-fcc con yarn hardhat node

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await ethereum.request({ method: "eth_requestAccounts" });
  }
}
async function execute() {
  // address
  // contract ABI
  // function
  // node connection (is metamask)
}

module.export = {
  connect,
  execute,
};
