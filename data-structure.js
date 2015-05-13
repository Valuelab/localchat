// PARSE DATA

// Default CLPs // add fields, delete: superadmin
// Default ACLs // superadmins can do everything

Neighbourhoods
    // CLPs // find & get: everyone, else: supers
    // ACLs // none
    objectId
    name
    
Groups
    // CLPs // defaults
    // ACLs // write: admins & supers, read: residentsOfId & supers
    objectId
    neighbourhoodId
    name
    description
    created
    rank
    hue
    inReview
    deleted // nil, by user, by admin
    criticalMass
    lastMessageDate
    lastMessageText
    notificationThreshhold
    blacklist (relation)
    admins (relation)

Users
    // CLPs // defaults
    // ACLs // read: residentsOfId & supers, write: user & supers
    objectId
    name
    street
    neighbourhoodId
    groups (relation)

UserData
    // CLPs // get: user, else: supers
    // ACLs // read & write: user
    firebaseToken
    fbUserId
    email
    all fb data?

Log
    // CLPs // everything: supers
    type // report message, report user, admin message delete
    description

Parse Config
    defaultCriticalMass

Blacklist
    objectId
    userId
    fbUserId
    email

// FIREBASE DATA

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

// PARSE CLOUD CODE FUNCTIONS

signUp // TBD, but including firebase

getGroupsForUser(range)
isSuper
messageAdded
    Direct → Notification
    Group → Update Group.lastMessage
    Group → Notification Threshold?
addUserToGroup // including firebase
removeUserFromGroup // including firebase
removeMessageByAdmin
    Log 
    Update Firebase 

// BACKGROUND JOBS

// FIREBASE LISTENERS

Child Added
    Notify Parse of Message ()
        (Group: Update Parse Group With Last Message)
        (Direct: Send Notification)

Child Removed
    Remove from Last Group Message If Relevant  
    Update Parse Log

Child Changed
    Group: Send Notification When Threshhold Crossed         




