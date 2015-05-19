// ************************
// ****** PARSE DATA ******
// ************************

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
    rank // if nil, the group is not discoverable
    hue
    lifeCycle // INITIAL_REVIEW, PRE_CRITICAL_MASS, OPEN
    criticalMass
    previewMessageDate
    previewMessageText
    notificationThreshhold
    members (relation)
    admins (relation)
    blacklist (relation)
Users
    // CLPs // defaults
    // ACLs // read: residentsOfId & supers, write: user & supers
    objectId
    name
    profilePhoto
    street
    neighbourhoodId
UserData
    // CLPs // get: user, else: supers
    // ACLs // read & write: user
    firebaseToken
    fbUserId
    email
    gender
    birthday
    // other fb data?
Log
    // CLPs // everything: none
    type // report message, report user, admin message delete
    description
Parse Config
    defaultCriticalMass
Blacklist
    // CLPs /// everything: none
    objectId
    userId
    fbUserId
    email
    reason
    blacklistedBy   

// ***************************
// ****** FIREBASE DATA ******
// ***************************

"users": {
      "$userId": {
        "groups": {
            "$conversationId": {
                "role": 0 // user or admin 
            }
        }
        "directs": {
            // read if $userId == auth.uid
            // create if($userId == auth.uid) OR (.counterparty == auth.uid)
            // validate that .counterparty exists in /users
            "$conversationId": {
                "title": "Eytan, Korazim" // update if (.counterparty == auth.uid)
                "hue": 200 // update if (.counterparty == auth.uid)
                "counterparty": "userId"
                "lastMessageDate": "<date>" // update if ($userId == auth.uid) OR (.counterparty == auth.uid)
                "lastMessage": {
                    // update if ($userId == auth.uid) OR (.counterparty == auth.uid)
                    "text": "hello"
                }
            }
        }
        "blacklisted": false
    }
}
"superadmins": { 
  "userId": true
}
"messages": {
    "groups": {
        "$conversationId": {  
            // read if $conversationId exists in /users/auth.id/groups
            // delete if /users/auth.id/groups/$conversationId/role == ADMIN OR if /superadmins/auth.id === true
            "messageId": {
                // validate that authorId is auth.id and recipient.id existst in /users 
                "authorId": "userId",
                "authorName": "David"
                "authorStreet": "Melchett"
                "messageType": 0, // text, photo, system
                "data": "<data>",
                "created": "<date>",
                "exclamations": 5 // update only if $conversationId exists in /users/auth.id/groups
            }
        }
    }
    "directs": {
        "$conversationId": { 
            // create & read if $conversationId exists in /users/auth.id/direct
            "messageId": {
                // validate that authorId is auth.id and recipient.id existst in /users
                "recipientId": "id", 
                "authorId": "userId",
                "authorName": "David"
                "authorStreet": "Melchett"
                "messageType": 0, // text, photo, system
                "data": "<data>",
                "created": "<date>",
                "exclamations": 0 // update only if $conversationId exists in /users/auth.id/direct
            }
        }  
    }
}

// ************************
// ****** CLOUD CODE ******
// ************************

signUp
    check blacklist for fbtoken
    get name, profile photo from facebook 
    save profile photo in a $userid-suffix format
    save profile photo filename in the users.$userid
    create firebase user
getGroupsForUser(range)
getGroup
    // TBD after cache architecture is determined
    // return group data
isSuper
joinGroup($groupId)
    check that user is not banned       
        add user to $groupId.members // master key
        add $groupId to firebase /users/userId/groups
        if $group.lifeCycle == kBeforeCriticalMass AND $group.members.count > $group.criticalMass
            notify superAdmins, admin & users
            set lifeCycle = open
leaveGroup($groupId)
    remove user from $groupId.members
    remove $groupId from firebase/users/userId/groups
getUserProfile($userId)
    get $userId data
    get all groups where $userId is a member

// ADMINS
    
createGroup
    create parse group, add user as admin
    add group to firebase /users/userId/groups
    create firebase /messages/groups/conversationId
banUser(group)
    if the user is an admin or a superadmin
        update parse data
        update firebase data 

// FIREBASE LISTENER HOOKS

directMessageAdded($receipientId, $authorId, $message)
    send notification to user: $recipientId  
groupMessageAdded($groupId, $authorId, $message)
    update $groupId.previewMessage
    if $messageData.exclamations >= $groupId.notificationThreshold
        send notification to members of $groupId
groupMessageRemovedbyAdmin($groupId, $adminId, $removedMessage, $lastMessageInGroup)
    if the user is an admin or a superadmin
        log // message, $removingUserId, group & id, neighbourhood & id
        if removed message is the last message in the group
            update $groupsId.previewMessage with $lastMessageInGroup

// SUPER ADMIN SUPPORT

blacklistUser(user, reason)
    add to blacklist
    remove from all parse groups 
    remove from all firebase groups
    remove from residentsOfId    
notifySuperAdmins($text)
    fetch superadmins from role
    notify them with 

// BACKGROUND JOBS

rankGroups
    
// *******************************
// ****** FIREBASE LISTENER ******
// *******************************

Child Added
    Notify Parse of Message
        (Group: Update Parse Group With Last Message)
        (Direct: Send Notification)
    If Direct: update /users/$userid/directs/$conversationId/lastMessage(Date)
Child Removed
    Remove from Last Group Message If Relevant  
    Update Parse Log
Child Changed
    Group: Send Notification When Threshhold Crossed         




