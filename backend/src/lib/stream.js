import {StreamChat} from 'stream-chat'
import "dotenv/config"

const apikey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if (!apikey || !apiSecret){
    console.error("Stream API key or secret key missing");
}

const streamClient = StreamChat.getInstance(apikey, apiSecret);

export const upsertStreamUser = async (userData) =>{
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.log("Error upserting creating Stream user:", error)
        
    }
};
// Todo: complete will be later
export const generateStreamToken = (userId) => {};




