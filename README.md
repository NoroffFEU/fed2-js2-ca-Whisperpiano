[![Live Preview](https://img.shields.io/badge/Live-Preview-brightgreen)]([https://your-live-preview-link.com](https://noroffsocial.netlify.app))
[![Report Bug](https://img.shields.io/badge/Report-Bug-red)](https://github.com/NoroffFEU/fed2-js2-ca-Whisperpiano/issues)
[![Request Feature](https://img.shields.io/badge/Request-Feature-blue)](https://github.com/NoroffFEU/fed2-js2-ca-Whisperpiano/issues)



# JS2 Course Assignment - Noroff Social Media

This is a social network project developed using Vite, Vanilla JavaScript, and TypeScript in MPA (Multi-Page Application) mode. It includes features such as JWT authentication, comments, reactions, follow/unfollow users, and integrates with the Noroff and Imgur APIs for data management and image uploads.

## Features

- **Vite** for fast development and bundling.
- **Authentication**: User registration and login with JWT.
- **CRUD**: Create, read, update, and delete posts.
- **Comments and Reactions**: Users can comment and react to posts with emojis.
- **Follow/Unfollow Users**: Follow other users functionality.
- **Image Uploads**: Integration with Imgur API to upload images to posts.
- **Infinite Scrolling**: Dynamically loads posts when scrolling on the "Explore" page.

## Technologies Used

- **Vite**
- **TypeScript**
- **JavaScript**
- **Noroff API**
- **Imgur API**
- **HTML5/CSS3**

## Installation and Usage

### Requirements

- **Node.js** (>=14.x)
- **Vite** (>=5.4.4)

### Clone the Repository

```bash
git clone "https://github.com/NoroffFEU/fed2-js2-ca-Whisperpiano.git"
```
```bash
cd fed2-js2-ca-Whisperpiano
```

### Environment Variables Setup

Create a .env.local file in the root of your project with the following content:

```bash
VITE_API_NOROFF_URL="your-noroff-api-url"

VITE_API_IMGUR_CLIENT_ID="your-imgur-client-id"
```

### Install Dependencies

To install the necessary dependencies, run:

```bash
npm install
```

### Run in Development Mode

To start the development server:

```bash
npm run dev
```

### Build for Production

To create an optimized production build:


```bash
npm run build
```

### Deployment

The project can be deployed easily to platforms like Netlify or Vercel. For deploying on Netlify, make sure to select the correct branch and configure the environment variables in the Netlify dashboard.

- Select the correct branch for deployment (stable-v1).
- Set up the environment variables in the Netlify dashboard.

## Troubleshooting

- If you encounter issues with environment variables, ensure that .env.local is correctly set up and that you are using the appropriate API keys.
- For issues with image uploads, verify that your Imgur API client ID is valid and properly configured.
- Upload pictures does not run in dev mode.

## License

This project is licensed under the MIT License. This means you are free to use, modify, and distribute this software as long as the original license is included with any distributions or derivative works.

## Contact

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jes%C3%BAs-alberola-herrero-896b61189/) 
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:jesusalberola90@gmail.com) 
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white)](https://www.facebook.com/jesus.alberolaherrero/) 
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/whispers_piano/)





