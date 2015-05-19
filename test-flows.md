# Test Flows

## Core Actions

* Sign Up 
* Discover Groups (Ranked)
* See User's Groups (Paged, Sorted)
* Join and Leave Group
	* Banned User
* Load Groups
	* Before Critical Mass
	* See Messages
* Write a Group Message
	* Media Types
	* Banned User
* Like a Message
* See User Profile
* Load DMs If Exist
* View Directs (Paged, Sorted)
* Send DM

## Push Notifications

* One on One Message
* Threshhold Message
* When Critical Mass is Achieved

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
	* Edit group
    * Remove Messages
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
* Delete a Message
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
    * Clients listen to firebase /users/$userId/blacklisted. Log out and wipe local cache if true.
* Superadmins
	* Our flows here are all manual for now
    * Firebase has a manually edited list of superadmin userId's
    * Parse has a manually editted role list of superadmin userId's
    * Because Superadmins can hang out in any neighbourhood, we manually set read: all on their User object
    * Gesture in app activates super admin mode
