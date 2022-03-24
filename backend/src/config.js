require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Pit Puppies";
const description = "Pit Puppies, is a collection of 5,000 computer generated, adorable NFT pitbull puppies. The main focus of this collection is to bring awareness to one of the most misunderstood breeds of dog.";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
// If you have selected Solana then the collection starts from 0 automatically
// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 2450,    ///Floppy ears randon (3400)
    layersOrder: [
      { name: "Background" },
      { name: "Mat" , displayName : "Floor Mat"},  
      { name: "Body" , displayName : "Body Color" },
      { name: "Accent Fur" },
      { name: "Highlights"  , displayName : ""}, 
      { name: "Border", displayName : "Ears"}, 
      { name: "Eyes" }, 
      { name: "Nose" , displayName : ""}, 
      { name: "Shadows"  , displayName : ""},   
      { name: "Neck Decoration" },     
      { name: "Mouth" }, 
      { name: "Toys"  , displayName : "Toy Right"},  
      { name: "Toys2"  , displayName : "Toy Left"}  ,
      { name: "Frame"  , displayName : ""}    
    ],
  } ,
  {
    growEditionSizeTo: 2450,    ///Pointed ears randon (3000) 6800
    layersOrder: [
      { name: "Background" },
      { name: "Mat" , displayName : "Floor Mat"},  
      { name: "BodyPointEars" , displayName : "Body Color" },
      { name: "Accent Fur" },
      { name: "Highlights"  , displayName : ""}, 
      { name: "BorderPointEars", displayName : "Ears"}, 
      { name: "Eyes" }, 
      { name: "Nose" , displayName : ""}, 
      { name: "Shadows"  , displayName : ""},   
      { name: "Neck Decoration" },     
      { name: "Mouth" }, 
      { name: "Toys"  , displayName : "Toy Right"},  
      { name: "Toys2"  , displayName : "Toy Left"}  ,
      { name: "Frame"  , displayName : ""}     
    ], 
  },    
  {
    growEditionSizeTo: 4900,    ///Floppy brindle ears randon (100) 6900
    layersOrder: [ 
      { name: "Background" },
      { name: "Mat" , displayName : "Floor Mat"},  
      { name: "BodyBrindle" , displayName : "Body Color" },
      { name: "Accent Fur" },
      { name: "Highlights"  , displayName : ""}, 
      { name: "Border", displayName : "Ears"}, 
      { name: "Eyes" }, 
      { name: "Nose" , displayName : ""}, 
      { name: "Shadows"  , displayName : ""},   
      { name: "Neck Decoration" },     
      { name: "Mouth" }, 
      { name: "Toys"  , displayName : "Toy Right"},  
      { name: "Toys2"  , displayName : "Toy Left"} ,
      { name: "Frame"  , displayName : ""}      
    ], 
  }, 
  {
    growEditionSizeTo:  5000,    ///Pointed brindle randon (100) 7000
    layersOrder: [
      { name: "Background" },
      { name: "Mat" , displayName : "Floor Mat"},  
      { name: "BodyBrindlePoint" , displayName : "Body Color" },
      { name: "Accent Fur" },
      { name: "Highlights"  , displayName : ""}, 
      { name: "BorderPointEars", displayName : "Ears"}, 
      { name: "Eyes" }, 
      { name: "Nose" , displayName : ""}, 
      { name: "Shadows"  , displayName : ""},   
      { name: "Neck Decoration" },     
      { name: "Mouth" }, 
      { name: "Toys"  , displayName : "Toy Right"},  
      { name: "Toys2"  , displayName : "Toy Left"}  ,
      { name: "Frame"  , displayName : ""}    
    ], 
  } 
];
 
const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 600,
  height: 600,
  smoothing: true,
};

const extraMetadata = {
  external_url: "https://www.pitpuppies.app", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'Pit Puppies';
const CONTRACT_SYMBOL = 'PPP';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x3DAeC34E0C0Fb425A14bc074bBfA080824953834';
const TREASURY_ADDRESS = '0x3DAeC34E0C0Fb425A14bc074bBfA080824953834';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.001; // 8 = $10    Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-03-20T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-03-20T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 500; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x3DAeC34E0C0Fb425A14bc074bBfA080824953834"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ['0x3DAeC34E0C0Fb425A14bc074bBfA080824953834']; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = false; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which puppy will go home with you today?"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafkreier6knmhnlelxnjbv5vgelh6vtvxmribikpzp25kcz3dq6i4q2bk4"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "JV",
  seller_fee_basis_points: 250, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.pitpuppies.app",
  creators: [
    {
      address: "0x3DAeC34E0C0Fb425A14bc074bBfA080824953834",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
