#### todo

- watermark should be unique per user
- tokens should be unique per user
- make UI pretty
- landing page that explains what's going on

#### done

- add link to subscribe to the feed
- deploy to production
- associate domain with production deployed app
- purchase domain
- fully integrated authentication
  - login state should be distinct from logged out state
- endpoint for uploading a new tweet
  - authenticated via token which was exchanged for login PCD
- environment variable for deployed url
- environment variable for private key
- ui for creating a new tweet
  - image field
  - title field
  - text field
- persistent storage for tweets on the backend
  - probably just redis kv
- logout
