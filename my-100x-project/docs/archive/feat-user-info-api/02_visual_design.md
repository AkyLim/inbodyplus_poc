# Visual Design / Interface Design

## Overview
This feature is a **Backend API** implementation (`GET /users/:id`).
No explicit UI (Figma/Wireframes) is required as this is a data-provider endpoint for future or existing consumers.

## Data Requirement
- **Input**: UID (URL Parameter)
- **Output**: JSON Object representing the User Profile.
    - Fields: UID, LoginID, Email, PhoneNumber, CountryCode, ProfileType, Gender, BirthDay, Height, Name, ProfileIMG_URL, CreateAccountDate, RecentMeasureDate, RecentLoginDate.
    - **Excluded**: LoginPW.

## Interaction
- Frontend makes a GET request to `/api/users/:uid`.
- Backend returns 200 OK with data or error code.
