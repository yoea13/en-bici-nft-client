import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [minted, setminted] = useState("");

  // ---------------------------------------------
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setUserAddress(accounts[0]);

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hiddenAccount = userAddress.slice(0, 4) + "..." + userAddress.slice(-4);

  const renderNotConnectedContainer = () => (
    <Button fontSize={20} onClick={connectWallet} mt={36} bgColor="grey">
      Connect your Wallet
    </Button>
  );

  const renderConnectedContainer = () => (
    <Button fontSize={20} onClick={safeMint} mt={36} bgColor="grey">
      Mint your NFT {hiddenAccount}
    </Button>
  );

  const renderMinted = () => (
    <a href={"https://opensea.io/es/" + userAddress} target="blanc_">
      <div valign="center">
        👁️👁️ 👉🏻
        <img src={"/opensea.png"} width={200} />
      </div>
    </a>
  );

  // ---------------------------------------------

  async function safeMint() {
    setminted(true);
    // Mumbai
    const enbiciadd = "0x53182F689C5E548cB28172ccd86d2576d3406875";
    // Matic
    // const enbiciadd = "0x801B1ec0e3be57Ab132B33CB8be07137734A9C20";
    const abi = ["function safeMint(address to, string memory uri) public"];
    // const config = {
    //   apiKey: "deJjPb_Az5VW7mrhJVRaK1NxiP1oZJY4",
    //   network: Network.ETH_GOERLI,
    // };
    // const alchemy = new Alchemy(config);

    console.log("Inicio!");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(enbiciadd, abi, signer, {
      gas: "2000000000",
    });
    const tx = await contract.safeMint(
      signer.getAddress(),
      "ipfs://Qmet3yADzuJq1boqi6Tb4TaFs21ehxUZyKziRL6Sj8KxF9"
    );
    setminted(true);

    console.log("NFT Minted!");
  }
  return (
    <Box w="100vw">
      <Center>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
        >
          <Heading mb={0} fontSize={36}>
            Get your NFT Membership
          </Heading>
          <a href="http://youtube.com/@en-bici" target="blanc_">
            <img src={"/youtube.png"} width={100} />
          </a>
          @en-bici
          <Text> </Text>
          <div className="App">
            <img
              src={
                "https://ipfs.io/ipfs/QmUg9Nq1J5uzsTdfzuHrKev6h4jxhqCWbXssjZHosh7Krx?filename=logo%20en-bici%20nft.png"
              }
            />
          </div>
        </Flex>
      </Center>

      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        {!minted ? <img src={"/polygon.png"} width={200} /> : <Text> </Text>}
        {userAddress === "" ? renderNotConnectedContainer() : ""}
        {(userAddress !== "") & !minted ? renderConnectedContainer() : ""}
        {(userAddress !== "") & minted ? renderMinted() : ""}
      </Flex>
    </Box>
  );
}

export default App;
