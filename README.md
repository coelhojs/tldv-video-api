# tl;dv Video API

[![CI/CD Staging](https://github.com/coelhojs/tldv-video-api/actions/workflows/staging.yml/badge.svg?branch=develop)](https://github.com/coelhojs/tldv-video-api/actions/workflows/staging.yml)
[![CI/CD Production](https://github.com/coelhojs/tldv-video-api/actions/workflows/production.yml/badge.svg?branch=main)](https://github.com/coelhojs/tldv-video-api/actions/workflows/production.yml)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=coelhojs_tldv-video-api&metric=bugs)](https://sonarcloud.io/summary/new_code?id=coelhojs_tldv-video-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=coelhojs_tldv-video-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=coelhojs_tldv-video-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=coelhojs_tldv-video-api&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=coelhojs_tldv-video-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=coelhojs_tldv-video-api&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=coelhojs_tldv-video-api)

This is an API to manage video data. The data is stored in a MongoDB database and the REST API is implemented using NodeJS. The available endpoints can be explored through the Swagger UI in the route `/api/docs`.

## Usage

The project can be executed in Docker containers, that are orchestrated by Docker Compose. To start the project, open a Terminal and, in the project root directory, run the following command: `docker-compose up -d`. To stop the project, run: `docker-compose down`.

## Public access

The project is also available online, in GitHub Actions there are 2 CI/CD pipelines for testing and deploying the API's `staging` and `production` environments at the following URLs, respectively: https://tldv-video-api-staging.herokuapp.com and https://tldv-video-api.herokuapp.com. The data is stored online at MongoDB Atlas.

## Quality assessment

In order to assess the quality of the project, SonarCloud is integrated. Some of the available quality metrics are shown in the badges above. For more information, please visit the [SonarCloud analysis report](https://sonarcloud.io/summary/overall?id=coelhojs_tldv-video-api).

## References

[Dockerizing NodeJS applications](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)

[Swagger UI examples](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v2.0/json/)

[The twelve-factor app](https://12factor.net/)
