<img src="https://github.com/PrzemyslawKiryluk/Sppeek/assets/61840719/e42168b3-d495-4d12-b46d-ae249a3105e2" width="500" height="300" padding="0"/>

**Welcome to my real-time web chat application. Offers a straightforward chat experience within a single room. User authentication is included for a secure and interactive chat environment and introduces essential features such as email verification and password management.**

### Live demo https://www.sppeek.online

![test1](https://github.com/PrzemyslawKiryluk/Sppeek/assets/61840719/c3608245-daed-45f2-a551-9df14a430f44)


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
  Nagivate to localhost:8080
  
  Enjoy!

