


// Parse + Firebase

/** PARSE: https://www.parse.com/apps/localchat--11/collections

/** FIREBASE **/
    "directs": {
        "userId": {
            "directId": {
                "title": "Eytan, Korazim"
                "hue": 200
                "counterparty": "userId"
                "lastMessageDate": "<date>"
                "lastMessage": {

                }
            }
        }
    },
    "messages": {
        "groups": {
            "groupId": {
                "messageId": {
                    "type": 0, // Text, Photos, System
                    "groupId": "groupId",
                    "authorId": "userId",
                    "authorName": "David"
                    "authorStreet": "Melchett"
                    "data": "<data>",
                    "created": "<date>",
                    "exclamations": 0,
                    "notificationSent": false,
                    "status": 0 // none, admin delete, user delete
                }
            } 
        } 
        "direct": {
           "directId": {
                "messageId": {
                    "type": 0, // Text, Photos, System
                    "authorId": "userId",
                    "recepientId": "userId"
                    "authorName": "David",
                    "authorStreet": "Melchett",
                    "data": "<data>",
                    "created": "<date>",
                    "exclamations": 0,
                    "status": 0, // none, admin delete, user delete
                    "notificationSent": false
                }
            }
        }
    }

    /** Firebase2Parse jobs

    ## UpdateGroupLastMessage
        * Listen to /messages/groups for ChildAdded & ChildRemoved messages
        * Get the group's last message
        * Call Parse.CloudCode.UpdateLastMessage(text, date)

    ## InsertGroupNotifications
        * Reload Parse.Groups notificationThreshold values every minute
        * Listen to /messages/groups for ChildChanged events
        * If message.exclamations > group.notificationThreshold
            * Call Parse.CloudCode.SendGroupNotification(group, user, text)

    ## SendDirectNotifications
        * Listen to /messages/direct for ChildAdded and to /messages/groups for ChildChanged
        * Call Parse.CloudCode.SendDirectNotification(user, text)

    */
