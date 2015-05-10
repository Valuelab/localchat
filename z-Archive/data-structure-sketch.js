    
    "neighbourhoods": {
        "neighbourhoodId": {
            "name": "Shenkin",
        }
    },
    "discovery":{
        "neighbourhoodId": {
            "groupId": {
                "rank": 12,
                "name": "Vegans",
                "description": "Only vegans",
                "hue": 200,
                "previewMessage": {
                    "authorName": "Eytan",
                    "text": "I don't speak broke nigga"
                }
            }
        }
    }
    "groups": {     
        "groupId": {
            "neighbourhood": "neighbourhoodId"
            "name": "Vegans"
            "description": "Only Vegans!",
            "created": "<date>",
            "hue": "230",
            "inReview": false,
            "notificationThreshold": 10,
            "criticalMass": 20,
            "admins": {
                "userId": true,
            },
            "members": {
                "userId": true,  
            }
            "blacklist": {
                "userId": true,
            } 
        }  
    }
    "users": {
        "userId": {
            "name": "Eytan",
            "neighbourhood": "Shenkin",
            "neighbourhoodId": "neighbourhoodId",
            "street": "Korazim",
            "fbUserId": "id"
        }
    }
    "memberships": {
        "userId": {
            "groups": {
                "groupId": {
                    "name": "Vegans",
                    "description": "Only vegans",
                    "hue": 230
                }
            }
            "directs": {
                "directId": {
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
        "groups": {
            "groupId": {
                "messageId": {
                    "type": 0, // Text, Photos, System
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
    "system": {
        "globals": {
            "defaultCriticalMass": 20
            "blacklist": {
                "fbUserId": true
        }
        "reports": {
            "reportId": {
            "message": "messageId"
            "group": "groupId"
        }
    }
}