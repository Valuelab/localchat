
    "neighbourhoods": {
        "neighbourhoodId": {
            "name": "Shenkin",
        }
    },
    "groups": {
        "public": {
            "neighbourhoodId": {
                "groupId": {
                    "neighbourhood": "neighbourhoodId"
                    "name": "Vegans"
                    "description": "Only Vegans!",
                    "created": "<date>",
                    "hue": "230",
                    "notificationThreshold": 10,
                    "criticalMass": 20,
                    "appeal": 0.3
                    "lastMessage": "David: 'Whatup'"
                    "lastMessageDate": "<date>",
                    "lastActiveMemberThumbnails": {
                        "userId": true
                    }
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
        },
        "inModeration": {
            "neighbourhoodId": {
                "groupId": {
                    "neighbourhood": "neighbourhoodId",
                    "name": "Vegans",
                    "description": "Only Vegans!",
                    "created": "<date>",
                    "hue": "230",
                    "admins": {
                        "userId": true,
                    },
                }
            }
        }
        "private": {
            "groupId": {
                "lastMessage": "Eytan: I don't speak broke nigga",
                "lastMessageDate": "<date>"
                "members": {
                    "userId": true
                }
            }
        }
    }
    "users": {
        "userId": {
            "name": "Eytan",
            "neighbourhood": "neighbourhoodId",
            "street": "Korazim",
        }
    }
    "memberships": {
        "userId": {
            "public": {
                "groupId": {
                    "name": "Vegans",
                    "hue": "230"
                }
            },
            "private": {
                "groupId": {
                    "counterparty": "userId"
                    "title": "Eytan, Shenkin"
                    "hue": "230",
                    "counterparty": "userId"
                }
            } 
        }  
    }
    "messages": {
        "groupId": {
            "messageId": {
                "group": "groupId"
                "type": 0, // Text, Photos, System
                "authorId": "userId",
                "status": 0 // Displayed, Admin Removed
                "text": "Hello!", 
                "image": "<data>",
                "likes": 0
            }
        }
    }
    "globals": {
        "criticalMass": 20
        "blacklist": {
            "fbUserId": true
        }
    }
    "reports": {
        "reportId": {
            "message": "messageId"
            "group": "groupId"
        }
    }
 }