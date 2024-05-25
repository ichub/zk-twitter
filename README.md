#### todo

- environment variable for deployed url
- endpoint for uploading a new tweet
  - authenticated via token which was exchanged for login PCD
- fully integrated authentication
  - login state should be distinct from logged out state
  - watermark should be unique per user
- make UI pretty
- purchase domain
- associate domain with production deployed app
- landing page that explains what's going on
- deploy to production

#### done

- environment variable for private key
- ui for creating a new tweet
  - image field
  - title field
  - text field
- persistent storage for tweets on the backend
  - probably just redis kv
- logout
