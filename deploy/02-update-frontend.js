const { ethers, network } = require("hardhat");
const fs = require("fs");

const { UPDATE_FRONTEND } = require("../secret");

const FRONT_END_ADDRESSES_FILE =
  "../nextjs-lottery/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../nextjs-lottery/constants/abi.json";

module.exports = async () => {
  if (UPDATE_FRONTEND) {
    console.log("Updating frontend...");
    updateContractAddresses();
    updateAbi();
  }
};

const updateContractAddresses = async () => {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8")
  );

  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(raffle.address)) {
      currentAddresses[chainId].push(raffle.address);
    }
  } else {
    currentAddresses[chainId] = [raffle.address];
  }

  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
};

const updateAbi = async () => {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();

  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    raffle.interface.format(ethers.utils.FormatTypes.json)
  );
};

module.exports.tags = ["all", "frontend"];
