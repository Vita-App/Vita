## Getting Started

Follow the instructions to set up the project on your local machine.

Read the Vita [Case Study](https://rishabh-malhotra.notion.site/Vita-Case-Study-110f30b9278649768ead22affc53c5ed)
and [User Journey](https://rishabh-malhotra.notion.site/Vita-User-Journey-7495dd0612ec4de1902fce62cc02ddb5) doc.

### Prerequisites

Install [NodeJS LTS](https://nodejs.org/en/)

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Fork the repo(required), a star is also appretiated but optional :P

2. Clone the forked repo

   ```sh
   git clone https://github.com/{your-github-username}/Vita.git
   ```

   example : `git clone https://github.com/Rishabh-malhotraa/Vita.git`

3. Install NPM packages

   ```sh
   npm run install-modules
   ```

4. Install MongoDB for your OS.
   For windows you can also follow [this video guide](https://www.youtube.com/watch?v=FwMwO8pXfq0) to set up MongoDB

   For mac you can also follow [this video guide](https://www.youtube.com/watch?v=MIByvzueqHQ) to set up MongoDB

5. **This step is only required if you are using WSL/Linux and only once when setting up the project. (WINDOWS USERS SKIP THIS!!!)**

   ```sh
   cd api
   npm run build
   ```

6. **ONLY FOR WIDNOWS USER**. Install `nodemon` and `ts-node` globally

   ```sh
   npm install -g nodemon ts-node
   ```

7. Start the react and nodejs server concucrrently. Make sure you have `mongod` running in the background before running this command! Also run this command from main project folder.
   if you are using **WSL/Linux**, run this command from the main project folder

   ```sh
   npm run dev
   ```

   If you are using **Windows**, run this command from the main project folder

   ```sh
   npm run dev:ts
   ```

8. Go to [http://localhost:3000](http://localhost:3000).

**NOTE: Do not use [http://127.0.0.1:3000](http://127.0.0.1:3000)**

### Setting up DATABASE

Run the following command to setup the DB

```sh
curl -X GET http://localhost:5000/api/seed-data
```

The following command will create a Password for admin panel access

```sh
curl -X POST http://localhost:5000/api/admin/create --header 'Content-Type: application/json' \
--data-raw '{
    "name": "Rishabh Malhtora",
    "email": "rishabhmalhotraa01@gmail.com",
    "password": "password"
}'
```

**DEPRECATED**: To setup the database with mockdata, follow this [guide](/Setting%20up%20Database.md)

## Roadmap

See the [open issues](https://github.com/Rishabh-malhotraa/Vita/issues) for a list of proposed features (and known issues).

### Things done

- [x] Inital Landing Page
- [x] Linking MongoDB Database with the backend
- [x] Sprinkling global state with Recoil (highly recommend it as compared to redux if there are no complex state transactions happening)
- [x] Infinite Scrolling on Search for Topics
- [x] Design Doc
- [x] Add github workflows

### Future Goals

- [x] Add Google Oauth
- [x] Add a login page and a way to add mentors from the Frontend (send form data to the backend, which after validation add user in mentors collection)
- [x] Add an admin panel to monitor all meetings.
- [ ] If a mentor/mentee does not show up, report as a no-show, and restrict their account.
- [ ] Improve Filters & add more topics
- [ ] Add Full-text Search Functionality for finding mentors!
- [x] Add bookings page for each signed-in user, which allows the mentor to accept, deject and reschedule his appointments
- [ ] Use Redis Adapter instead of Node Cache :3
- [ ] Write Unit Test

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Refer to this [article](https://medium.com/swlh/guide-to-git-a-practical-approach-27926a1ff564?sk=b54ca413a142c275f5d2901d0384a0db) if you have any difficulty in making a pull request
