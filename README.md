# LifeLink

## Preview Link 
  [Click me !](https://lifelink-7ucy.onrender.com)

  

## Current Agenda
- Blood banks and ongoing camps list (Real Data)
- window detect in nav (e.target) & update


# Done 

- [✔️] A button beside the "Donate Now" for Join as donor
- [✔️] JWT
- [✔️] Emergency request List => OnGoing requests table 
- [✔️] Authorization 
- [✔️] Partials => components
- [✔️] change aadhaar into an phone number and OTP via n8n ? Twillo => nodemailer


# BIG THINGS

- The session (Express-session)
- The search and request btn
- Users real time notification's
- ```[Done]``` Share details on accept
- Emergency Requests , smart routing => nearest first 
- 

# The Dream

- PWA 
- Blocked VIEW for a time bound (notification) 

# Commands

- npm i express jsonwebtoken bcryptjs dotenv cookie-parser
- node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"


# Custom Algo (Topological Sort)

## Factors
 ```
 1. Urgency Level 
 2. Reason for request (Patient condition)
 3. Time 
 4. Rare Blood Group 

 ```


# Request end : 
 ```js
if request.units_fulfilled >= request.units_required{
    request.status = "fulfilled"
    lock request
    notify(requester, "Your request is complete")
    notify(all_pending_responders, "Request closed - need already fulfilled")
}
 ```


```
 🔹 Flow Breakdown

Requester creates a blood request

Details: patient condition, blood group, hospital, units required.

Request enters DB with status = "active".

Responders (donors) see the request

The request is displayed first (highlighted) for the requester.

Each responder can click "I’ll Donate" (with confirmation).

Requester sees all responders in real time

A list (sorted by proximity or priority) shows all available donors who accepted.

Include donor info: name, blood group, distance, contact/secure chat option.

Matching and Fulfillment

Requester (or hospital) selects required number of donors.

Once the units required are matched, the system auto-updates:

status = "fulfilled".

Lock the request so no new donors can respond.

Auto-Termination Rules

If donors_accepted >= units_required → auto terminate request.

Notify extra responders: “Thank you, the need has been fulfilled”.

Archive request for records.
```


### Differenting request's between self and other's
#### HOW?

```
  Redfine schema : it stores the user's details when saving the request in the backend
  And fetch the req's of every user when logged in
  if request's exists : show the user's request's on top !

```

