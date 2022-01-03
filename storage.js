// dotenv
require('dotenv').config();

// uuid
const { v1: uuidv1} = require('uuid');

// AZURE BLOB
const { BlobServiceClient } = require('@azure/storage-blob');

async function saveToAzure(blobdata) {
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    // Create a unique name for the container
    const containerName = 'test';
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Create the container
    // const createContainerResponse = await containerClient.create();
    

    // Create the container if not exists
    const createContainerResponse = await containerClient.createIfNotExists();

    console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);

    // Create a unique name for the blob
    const blobName = 'test'+ Date.now().toString() + '.pdf';
    // const blobName = 'quickstart' + uuidv1() + '.pdf';
    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log('\nUploading to Azure storage as blob:\n\t', blobName);
    // Upload data to the blob
    const data = blobdata;
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
}

async function explore(blobdata) {
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    async function main() {
        let i = 1;
        let containers = blobServiceClient.listContainers();
        for await (const container of containers) {
          console.log(`Container ${i++}: ${container.name}`);
        }
        console.log("szok");
      }
      
      main();

      const containerClient = blobServiceClient.getContainerClient('aaa');

      console.log(containerClient);

    console.log("ok");
    
}

module.exports = { saveToAzure, explore }

// main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));