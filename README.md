<!-- LATEST ANNOUNCEMENTS -->

# 📣 Latest Announcements

🆕 22-02-2022: We now have a discord server, I strongly encourage all of you to join the server. [Join Server](https://discord.gg/gf9EzqZBe7)

🆕 21-02-2022: Vita is participating in GirlScript Summer of Code 2022 🥳

---

<br/>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Build Test][actions-badge]][actions-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://vitaa-app.netlify.app/">
    <img src="client/public/logo192.png" alt="Logo" width="256" height="256">
  </a>

  <strong>
    <h3 align="center" >Vita</h3>
  </strong>
  <p align="center">
    <strong>
      SEACH SCHEDULE & MEET
    </strong>
    <br />
    <a href="https://github.com/Rishabh-malhotraa/Vita"><strong>Explore the project »</strong></a>
    <br />
    <br />
    <a href="https://vitaa-app.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Rishabh-malhotraa/Vita/issues">Report Bug</a>
    ·
    <a href="https://github.com/Rishabh-malhotraa/Vita/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#demonstration">Demonstration</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation">Setting up Database</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

- During the pandemic, we all were homebound; the campus culture of each college withered away. Watercooler conversation after class mentoring or Gyan sessions from seniors has become a tail of the past. So to bridge the gap of loss of engagement, I present to you, Vita.
- A SAAS product to _connect college graduates, alumni, and faculty_ to revive the culture of mentorship and foster a more connected and **ENGAGED**(pardon the pun) community.

---

## Design Doc and Video Demonstration

Vita Case Study : [Case Study](https://rishabh-malhotra.notion.site/Vita-Case-Study-110f30b9278649768ead22affc53c5ed)

Vite Application Flow : [User Journey](https://rishabh-malhotra.notion.site/Vita-User-Journey-7495dd0612ec4de1902fce62cc02ddb5)

Video Demonstration : [Video Link](https://drive.google.com/drive/u/0/folders/1uXQ53ieJK1gcbtpfYYxVthMXN5X9SpbM)

---

### Demonstration

![vita-hld]

<br/>

### VITA APP

![product-screenshoti]

|      Mentors Page       |       Topics Page        |
| :---------------------: | :----------------------: |
| ![product-screenshotii] | ![product-screenshotiii] |

|      Submit Form       |   Scheduler Component   |
| :--------------------: | :---------------------: |
| ![product-screenshotv] | ![product-screenshotiv] |

<br />

---

### Built With

- [React](https://reactjs.org/docs/getting-started.html)
- [NodeJS](https://material-ui.com/getting-started/installation/)

Written in TypeScript ♥

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

4. Start the react and nodejs server concucrrently

   ```sh
   npm run dev
   ```

### Setting up DATABASE

To setup the database with mockdata, follow this [guide](/Setting%20up%20Database.md)

## Roadmap

See the [open issues](https://github.com/Rishabh-malhotraa/Vita/issues) for a list of proposed features (and known issues).

### Things To do

- [x] Inital Landing Page
- [x] Linking MongoDB Database with the backend
- [x] Sprinkling global state with Recoil (highly recommend it as compared to redux if there are no complex state transactions happening)
- [x] Vita Meet
- [x] Linking Vita Meet with caucus
- [x] Infinite Scrolling on Search for Topics
- [x] Deploy on Netlify and Heroku
- [x] Design Doc
- [x] Add github workflows

### Future Goals

- [ ] Add Google Oauth
- [ ] Add a login page and a way to add mentors from the Frontend (send form data to the backend, which after validation add user in mentors collection)
- [ ] Add an admin panel to monitor all meetings.
- [ ] If a mentor/mentee does not show up, report as a no-show, and restrict their account.
- [ ] Improve Filters & add more topics
- [ ] Add Full-text Search Functionality for finding mentors!
- [ ] Add bookings page for each signed-in user, which allows the mentor to accept, deject and reschedule his appointments
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

## License

Distributed under the MIT License. See [`LICENSE`][license-url] for more information.

---

## Contact

Rishabh malhotraa - [@rish_bishhh](https://twitter.com/rish_bishhh) - rishabhmalhotraa01@gmail.com

Join Discord Server : https://discord.gg/gf9EzqZBe7

Discord : rishabh.malhotra#4193

Project Link: [https://vitaa-app.netlify.app/](https://vitaa-app.netlify.app/)

---

## Acknowledgements

- [react-query](https://react-query.tanstack.com/)
- [mui](https://mui.com/)
- [emotion](https://emotion.sh/)
- [sokcet-io](https://www.heroku.com/)
- [simple-peer](https://www.npmjs.com/package/simple-peer)
- [Heroku](https://www.heroku.com/)
- [Netlify](https://www.netlify.com/)
- [axios](https://www.npmjs.com/package/axios)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [MIT License](https://opensource.org/licenses/MIT)

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[all-contributors-shield]: https://img.shields.io/badge/all_contributors-8-orange.svg?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/Rishabh-malhotraa/Vita.svg?style=for-the-badge
[contributors-url]: https://github.com/Rishabh-malhotraa/Vita/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Rishabh-malhotraa/Vita.svg?style=for-the-badge
[forks-url]: https://github.com/Rishabh-malhotraa/Vita/network/members
[stars-shield]: https://img.shields.io/github/stars/Rishabh-malhotraa/Vita.svg?style=for-the-badge
[stars-url]: https://github.com/Rishabh-malhotraa/Vita/stargazers
[issues-shield]: https://img.shields.io/github/issues/Rishabh-malhotraa/Vita.svg?style=for-the-badge
[issues-url]: https://github.com/Rishabh-malhotraa/Vita/issues
[license-shield]: https://img.shields.io/github/license/Rishabh-malhotraa/Vita.svg?style=for-the-badge
[license-url]: https://github.com/Rishabh-malhotraa/Vita/blob/main/LICENSE.txt
[actions-url]: https://github.com/Rishabh-malhotraa/Vita/actions/workflows/build.yaml
[actions-badge]: https://github.com/Rishabh-malhotraa/Vita/actions/workflows/build.yaml/badge.svg?branch=main
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rishabh-malhotra-4536a418b
[product-demo]: images/Vita-demonstation.gif
[product-screenshoti]: assets/user-page.png
[product-screenshotii]: assets/mentors.png
[product-screenshotiii]: assets/topics.png
[product-screenshotiv]: assets/scheduler.png
[product-screenshotv]: assets/confirm-booking.png
[vita-hld]: assets/vita-hld.png

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Stargazers over time

[![Stargazers over time](https://starchart.cc/Rishabh-malhotraa/Vita.svg)](https://starchart.cc/Rishabh-malhotraa/Vita)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://rishabh-malhotraa.github.io/Rishabh-Portfolio-main/"><img src="https://avatars.githubusercontent.com/u/54576074?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rishabh Malhotra</b></sub></a><br /><a href="#infra-Rishabh-malhotraa" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#data-Rishabh-malhotraa" title="Data">🔣</a> <a href="#design-Rishabh-malhotraa" title="Design">🎨</a> <a href="https://github.com/Rishabh-malhotraa/Vita/commits?author=Rishabh-malhotraa" title="Code">💻</a> <a href="#video-Rishabh-malhotraa" title="Videos">📹</a></td>
    <td align="center"><a href="http://muzam1l.com"><img src="https://avatars.githubusercontent.com/u/52374648?v=4?s=100" width="100px;" alt=""/><br /><sub><b>muzamil</b></sub></a><br /><a href="https://github.com/Rishabh-malhotraa/Vita/commits?author=muzam1l" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Sahaj-Srivastava24"><img src="https://avatars.githubusercontent.com/u/72143774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mad1ad</b></sub></a><br /><a href="https://github.com/Rishabh-malhotraa/Vita/commits?author=Sahaj-Srivastava24" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Gurdeep475"><img src="https://avatars.githubusercontent.com/u/32095032?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gurdeep Singh</b></sub></a><br /><a href="#maintenance-Gurdeep475" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://linkedin.com/in/hzmessam"><img src="https://avatars.githubusercontent.com/u/49886457?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hazem Essam</b></sub></a><br /><a href="#maintenance-hazemessam" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/Lalit3716"><img src="https://avatars.githubusercontent.com/u/84276404?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lalit</b></sub></a><br /><a href="https://github.com/Rishabh-malhotraa/Vita/commits?author=Lalit3716" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/indraantoor"><img src="https://avatars.githubusercontent.com/u/64259328?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Indraan S. Toor</b></sub></a><br /><a href="https://github.com/Rishabh-malhotraa/Vita/commits?author=indraantoor" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://harshiljani2002@gmail.com"><img src="https://avatars.githubusercontent.com/u/79367883?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Harshil Jani</b></sub></a><br /><a href="#infra-Harshil-Jani" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
