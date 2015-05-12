// Patrick Data

Neighbourhoods
    objectId
    name
    groups (relation)
    

Groups
    objectId
    neighbourhood
    name
    description
    created
    hue
    inReview
    deleted 
    criticalMass
    lastMessageDate
    lastMessageText
    notificationThreshhold
    members (relation)
    admins (relation)
    blacklist (relation)

Users
    objectId
    firebaseToken
    name
    street
    neighbourhoodId
    fbUserId
    groups (relation)

Log
    Type
    Description

// Firebase Data


"memberships": {
    "userId": {
        "groups": {
            // write: server, read: noone
            "conversationId": true
        }
        "directs": {
            // write: authed userId,counterparty read: userId 
            "conversationId": {
                "title": "Eytan, Korazim"
                "hue": 200
                "counterparty": "userId"
                "lastMessageDate": "<date>"
                "lastMessage": {
                }
            }
        }
    }
}
"messages": {
    // write: authed user, read:noone
    "conversationId": {   
        // write & read: userId.groups.conversationId exists OR userId.direct.conversationId exists
        // validation: user = authorId 
        "messageId": {
            "conversationType": 0, // direct or group
            "dmRecipientId": "id", //userId if direct, otherwise nil
            "authorId": "userId",
            "authorName": "David"
            "authorStreet": "Melchett"
            "messageType": 0, // text, photo, system
            "data": "<data>",
            "created": "<date>",
            "exclamations": 0,
        }
    }
}

// Peter listenes to all /messages/conversations

Child Added
    Group: Update Parse Group With Last Message
    Direct: Send Notification

Child Removed
    Remove from Last Group Message If Relevant  
    Update Parse Log

Child Changed
    Group: Send Notification When Threshhold Crossed 

// More Backend Functions

registerUserWithFirebase
addUserToFirebaseGroup
removeUserFromFirebaseGroup
