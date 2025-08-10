import {StreamChat} from "stream-chat"
import dotenv from "dotenv";
dotenv.config()

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream APi Key or Secret is Missing")
} 
const streamClient = StreamChat.getInstance(apiKey,apiSecret)


export const upsertStreamUser = async function (userData){
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.error("Error in Upserting Stream User", error)
    }
}
export const generateStreamToken = (userId) => {
    try {
        //ensure User Id is string 
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString)
    } catch (error) {
        console.log("Error Generating Stream Token ", error);
    }
}