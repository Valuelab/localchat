// ************************
// ****** PARSE DATA ******
// ************************

// Default CLPs // add fields, delete: superadmin
// Default ACLs // superadmins can do everything

Neighbourhoods
    // CLPs // find & get: everyone, else: supers
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
Blacklist
    // CLPs /// everything: none
    objectId
    userId
    fbUserId
    email
    reason
    blacklistedBy   
Parse Config
    defaultCriticalMass
    supportEmail

// ***************************
// ****** FIREBASE DATA ******
// ***************************

users
    $userId
        groups
            $conversationId
                role // user or admin 
        directs
            // read if $userId == auth.uid
            // create if $userId == auth.uid OR .counterparty == auth.uid
            // validate that .counterparty exists in /users
            $conversationId
                title: Eytan, Korazim // update if (.counterparty == auth.uid)
                hue // update if (.counterparty == auth.uid)
                counterparty: userId
                lastMessageDate: date // update if ($userId == auth.uid) OR (.counterparty == auth.uid)
                lastMessage
                    // update if ($userId == auth.uid) OR (.counterparty == auth.uid)
                    text
        blacklisted // true or false
        superadmin // true of false
messages
    groups
        $conversationId
            // read if $conversationId exists in /users/auth.id/groups
            // delete if /users/auth.id/groups/$conversationId/role == ADMIN OR if /superadmins/auth.id === true
            messageId
                // validate that authorId is auth.id and recipient.id existst in /users 
                authorId
                authorName
                authorStreet
                messageType // text, photo, system
                data
                created
                exclamations // update if $conversationId exists in /users/auth.id/groups
    directs
        $conversationId
            // create & read if $conversationId exists in /users/auth.id/direct
            messageId
                // validate that authorId is auth.id and recipient.id existst in /users
                recipientId
                authorId
                authorName
                authorStreet
                messageType // text, photo, system
                data
                created
                exclamations: // update only if $conversationId exists in /users/auth.id/direct

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




