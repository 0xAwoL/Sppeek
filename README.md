<p align="left">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/PrzemyslawKiryluk/Sppeek/assets/61840719/d3b52217-2678-4b5a-b405-13df57340be9" width=500 height=300 >
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/PrzemyslawKiryluk/Sppeek/assets/61840719/36662d0c-f47c-4bc5-a828-98124b2c60e0" width=500 height=300 >
      <img alt="Shows a black logo in light color mode and a white one in dark color mode.">
    </picture>
</p>

**Welcome to my real-time web chat application. Offers a straightforward chat experience within a single room. User authentication is included for a secure and interactive chat environment and introduces essential features such as email verification and password management.**

### Live demo https://www.sppeek.online


![test1](https://github.com/PrzemyslawKiryluk/Sppeek/assets/61840719/4475a6e7-206b-4bd5-8b54-1801e80ec4eb)


**This project is built using:**

- Node.js
- React.js
- Express.js
- Socket.io
- PostgreSQL

> **Whole application is dockerized and devided into 3 separate services, hosted using AWS ECS.**
# Try on your own machine
## 1. Docker-compose
  > Make sure you have Docker and Docker Compose installed on your machine.  
  ```
  1. git clone https://github.com/PrzemyslawKiryluk/Sppeek/
  2. cd ./Sppeek
  3. ./buildDockerImages.sh // make sure to change .env file in every service folder!
  4. docker-compose up -d
  ```
  Navigate to localhost:8080
  
  Enjoy!

