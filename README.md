# Viz.ly

A web application to visualize the photos you love to take

![](./docs/doc1.png)

A web application to visualize the photos you love to take using Google Vision label detection. You authenticate through PassportJS, upload your favorite photos, and Google Vision will return the labels detected rendered in D3 bubble chart and bar chart.

Upload your pictures
:----------------------------------------------------------------------------------------------------:
![](./docs/doc2.png)

Bubble Chart View
:----------------------------------------------------------------------------------------------------:
![](./docs/doc3.png)

Bar Chart View
:----------------------------------------------------------------------------------------------------:
![](./docs/doc4.png)

## Team

  - Brandon Wong
  - Kai Yu
  - Tayo Jolaosho

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

Take your pictures,
Upload them to Viz.ly
Share your results with friends. Who you are with the world.

## Technologies

### Frontend
- React (ES6)
- D3

### Backend
- Node
- Express
- MongoDB

### Other
- Heroku
- Passport

## Requirements

- Google Cloud/Visions v0.10.0
- D3 v3.5.5
- React v15.4.x
- Node v6.4.x
- Express v4.15.2
- MongoDB v2.2.24
- Mongoose v4.9.0
- Nodemon v1.11.0
- passport-facebook v2.1.1
- passport v0.3.2
- webpack v2.2.1
- Babel v6.24.0
- jQuery v3.1.1
- url-loader v0.5.8
- body-parser v1.17.1
- parser v0.1.4
- path v0.12.7

## Development

### Installing Dependencies

From within the root directory:

```
npm install
```

### Roadmap

View the project roadmap [here](https://docs.google.com/spreadsheets/d/13ymrJ6f36_wVQgLU5XTUoTSA-I5PvN6kvzrhztGYcoA/edit?usp=sharing)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
Setup
---

```
npm install
```

To Run in Production mode:
```
npm run build
```
To Run in Dev mode:
```
npm run dev
```
