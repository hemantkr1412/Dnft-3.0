import {create as IPFSHTTPClient,globSource} from 'ipfs-http-client';

export const CreateIPFSuri = async(reward) =>{
    const projectId = "2Jlv5EBQnZrIkyfYxgQ85PYuUo6";
    const projectSecret = "89e836478d0c9351b7e6b68a0d898d99";
    const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

    const client = IPFSHTTPClient({
        host:'ipfs.infura.io',
        port:5001,
        protocol: 'https',
        headers: {
            authorization: auth
          }
      });

      let date = new Date()
      date = date.toISOString().split('T')[0]

    var obj = {
        properties: {
            name: "ABC HOTEL",
            description:"NFT issued to authentic member of ABC Hotel",
            image: "https://gateway.pinata.cloud/ipfs/QmRUheYjxM4TkBNyVaDcmod554QtXSUBm1yoNAz3c1pPJ3"
        }
      }
      obj = JSON.stringify(obj)
    
    const added = await client.add(obj);

    return added.path

}