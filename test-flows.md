# Test Flows

## Core Actions

* Sign Up 
* Discover Groups (Ranked)
* See User's Groups (Paged, Sorted)
* Join and Leave Group
	* Banned User
* Load Group
	* Before Critical Mass
	* After Critical Mass
* Write a Group Message
	* Media Types
	* Banned User
* Like a Message
* See User Profile
* Load DMs If Exist
* View Directs (Paged, Sorted)
* Send DM
* Delete a Message

## Push Notifications

* One on One Message
* When Critical Mass is Achieved
* Threshhold message

## Admin

* Create Group
	* In Review / Direct Message / Admin Onboarding
	* Before Critical Mass
	* After Critical Mass
* Edit Group
* Remove Message
* Ban User

## Super Admin

* Admin Any Group
* Total Ban of any User
* Ban User
* Switch Neighbourhoods

## Security

* All of the Above
* Firebase Token

## More

* Report Message

## Possible Future Features

* Admin Seeding Guide (PN based)
* Create a Meetup
* Multiple Admins
* See and Join Groups by Gender/Age
* Collapsing Messages
	* After 24 hours
	* Depending on Volume
* Seen Messages
* Store User Exclamations
* See Who Exclaimed My Message

## Problems

* How do we do migrations?
* Force updates?

## Docs

* Security
	* Generally ACLs and CLPs
		* Exception: logging to our db
		* Exception: adming remove users
* Gesture Activates Super Admin Mode