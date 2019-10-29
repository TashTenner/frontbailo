# README 3. module: Bailo.app

## Description

​
Find and add tango schools and venues around the world.
​

## User Stories

​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
​

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

​
**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.

​
**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend.

​
**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account.

​
**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.

**Profile** - As a user I want to be able to see my profile and edit it.

​
**Venue list** - As a user I want to see all the tango venues available on a map so that I can choose which ones I want to attend.

​
**Venues create** - As a registered user I want to create a tango venue so that I can invite others to attend.

**Venues delete** - As an admin I want to delete a tango venue so that I can keep the venue list up-to-date.

​
**Venues detail** - As a user I want to see the tango venue details of one event so that I can decide if I want to attend.

**Venues accept** - As an admin I want to accept a tango venue so that I can keep the venue list up-to-date.

**Venues decline** - As an admin I want to decline a tango venue so that I can keep the venue list up-to-date.

**School list** - As a user I want to see all the tango schools available on a map so that I can choose which ones I want to attend.

​
**Schools create** - As a registered user I want to create a tango school so that I can invite others to attend.

**Schools delete** - As an admin I want to delete a tango school so that I can keep the school list up-to-date.

​
**Schools detail** - As a user I want to see the tango school details of one school so that I can decide if I want to attend.

**Schools accept** - As an admin I want to accept a tango school so that I can keep the school list up-to-date.

**Schools decline** - As an admin I want to decline a tango school so that I can keep the school list up-to-date.
​

## Backlog

**Native app feel** - As a user I want to have a nice smartphone feeling even though it is not a native app.

**Geo-Location**

**Add Events model**

**Add Swing, Salsa, Forro**

​

## Routes

**Backend & Frontend**

| Name              | Method | Endpoint              | Description                                  | URL                 | Public |
| ----------------- | ------ | --------------------- | -------------------------------------------- | ------------------- | ------ |
| Register          | POST   | api/auth/register     | Register, user/admin                         | /register           | yes    |
| Login             | POST   | api/auth/login        | Login, user/admin                            | /login              | yes    |
| Logout            | POST   | api/auth/logout       | Logout, user/admin                           | /logout             | yes    |
| Me                | GET    | api/auth/me           | Check session/ if logged in                  |                     |        |
| Map               | GET    | api/venues            | READ: See map with nav-bar, search, milongas | /                   | yes    |
| Venue Info Short  | GET    | api/venues/:venueId   | READ: See details of milonga in sidebar      | /:id                | yes    |
| Venue Info Long   | GET    | api/venues/:venueId   | READ: See details of milonga new page        | /milonga/:id        | no     |
|                   |        |                       |                                              | /add/milonga        | no     |
| Add General       | --     | ---                   | ---                                          | /add                | yes    |
| Map               | GET    | api/schools           | READ: See map with nav-bar, search, schools  | /                   | yes    |
| School Info Short | GET    | api/schools/:schoolId | READ: See details of school in sidebar       | /:id                | yes    |
| School Info Long  | GET    | api/schools/:schoolId | READ: See details of school new page         | /school/:id         | no     |
|                   |        |                       |                                              | /add/school         | no     |
| Profile           | GET    | api/user/:id          | See profile page of user                     | /profile            | no     |
| Profile edited    | PUT    | api/user/:id          | Edit profile                                 | /profile            | no     |
| Accept Venue      | POST   | api/venues            | CREATE: Add milonga to map                   | /admin/venues       | no     |
| Edit Venue        | PUT    | api/venues/:venueId   | UPDATE: Edit details of milonga              | /admin/venues/edit  | no     |
| Delete Venue      | DELETE | api/venues/:venueId   | DELETE: Delete milonga                       | /admin/venues       | no     |
| Accept School     | POST   | api/schools           | CREATE: Add school to map                    | /admin/schools      | no     |
| Edit School       | PUT    | api/schools/:schoolId | UPDATE: Edit details of school               | /admin/schools/edit | no     |
| Delete School     | DELETE | api/schools/:schoolId | DELETE: Delete school                        | /admin/schools      | no     |

## Models

​
Venue model

```js
  {
    name: { type: String, required: true },
    address: {
      street: String,
      number: Number,
      additionalInfo: String,
      postcode: String,
      city: String,
      country: String,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    type: { type: String, enum: ['milonga', 'practica', 'school'] },
    date: {
      dStart: String,
      dFinish: String,
    },
    time: {
      tStart: String,
      tFinish: String,
    },
    price: {
      number: Number,
      currency: String,
    },
    contact: {
      phoneNr: String,
      mail: String,
      website: String,
      nameOrganizer: String,
    },
    frequency: String,
    mainPhoto: String,
    morePhotos: [String],
    rating: { type: Number, min: 1, max: 5 },
    followers: [String],
    status: { type: String, enum: ['pending', 'accepted', 'rejected'] }
  },
```

School model

```js
  {
    name: { type: String, required: true },
    address: {
      street: String,
      number: Number,
      additionalInfo: String,
      postcode: String,
      city: String,
      country: String,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    contact: {
      phoneNr: String,
      mail: String,
      website: String,
      nameOrganizer: String,
    },
    followers: [String],
    status: { type: String, enum: ['pending', 'accepted', 'rejected'] }
  },
```

User model

```js
{
    userEmail: String,
    hashedPassword: String,
    type: ["admin", "user"]
}
```

​

## Links

​

### Git

​
The url to your repository and to your deployed project

​
[Repository Frontend Link](https://github.com/TashTenner/frontbailo)

​
[Repository Backend Link](https://github.com/TashTenner/backbailo)

​
[Deploy Link](http://heroku.com/)
​

### Wireframes

[InVision with Wireframes](https://invis.io/...)

### Slides

​
[Slides Link](https://slides.com/tashbcn/bailo-app)
