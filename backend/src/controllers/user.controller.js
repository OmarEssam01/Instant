import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res){
    try {
        const currentUserId = req.user.id;
        const currentUser = await User.findById(currentUserId)
        const recommendedUsers = await User.find({
            $and: [
                {_id: {$ne: currentUserId}}, // exclude current user (myself)
                {_id: {$nin: currentUser.friends }}, //exclude current user's friends
                {isOnboarded: true}
            ]
        })
        res.status(200).json(recommendedUsers)
    } catch (error) {
        console.log("Error in getRecommendedUsers Controller " , error);
        res.status(500).json({message: "Internal Server Error"})
    }
}
export async function getMyFriends(req,res) {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in getFriends Controller" , error);
        res.status(500).json({message : "Internal Server Error"})
    }
}
export async function sendFriendRequest(req , res) {
    try {
        const myId = req.user.id;
        const {id: recipientId} = req.params
        // prevent sending friend Requests to myself 
        if(myId===recipientId){
            return res.status(400).json({message:"You Cant Send A Friend Request to Yourself Bruh ."})
        }
        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message:"Recipient Not Found"})
        }
        // prevent Sending Friend Request to My Friends
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message: "You are Already Friends With This User"})
        }

        // check if there is an existing friend Request
        const existingFriendRequest = await FriendRequest.findOne({
            $or:[
                {sender: myId , recipient: recipientId},
                {sender: recipientId , recipient: myId},
            ],
            
        })
        if (existingFriendRequest){
            return res.status(400).json({message: "there is an Already exists Friend Request between you and this User"})
        }
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })
        res.status(201).json(friendRequest)
    } catch (error) {
        console.log("there was an Error in friendRequest Controller " , error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function acceptFriendRequest(req , res){
    try {
        const {id: requestId} = req.params
        const friendRequest = await FriendRequest.findById(requestId)
        if(!friendRequest){
            return res.status(404).json({message:"Friend Request Doesnt Exist"})
        }
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message: "You Are Not Authorized to Accept This Friend Request"})
        }
        friendRequest.status = "accepted"
        await friendRequest.save();
        // add each user to the Other's Friends Array
        await User.findByIdAndUpdate(friendRequest.sender,{
          $addToSet:{ friends: friendRequest.recipient } , 
        })

        await User.findByIdAndUpdate(friendRequest.recipient , {
            $addToSet: {friends: friendRequest.sender}
        })
        res.status(200).json({message: " Friend Request Accepted Successfully"})
    } catch (error) {
        console.log("Error in acceptFriendRequest Controller " , error);
        res.status(500).json({message: "Internal Server Error"})
    }
}
export async function getFriendRequests(req , res ) {
  try {
    const incomingFriendRequests = await FriendRequest.find({
        recipient: req.user.id,
        status: "pending",
    }).populate("sender","fullName profilePic nativeLanguage learningLanguage")
    const acceptedFriendRequests = await FriendRequest.find({
        sender: req.user.id, 
        status: "accepted",
    }).populate("recipient","fullName profilePic")
    res.status(200).json({incomingFriendRequests,acceptedFriendRequests})
  } catch (error) {
        console.log("Error in getFriendRequests Controller " , error);
        res.status(500).json({message: "Internal Server Error"})
  }

}
export async function getOutgoingFriendRequests(req , res){
    try {
        const outgoingFriendRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient","fullName profilePic learningLanguage  nativeLanguage")
        res.status(200).json(outgoingFriendRequests)
    } catch (error) {
        console.log("Error in getOutgoingFriendRequests Controller " , error);
        res.status(500).json({message: "Internal Server Error"})
    }
}