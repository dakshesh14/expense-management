# Expense manager

This is an expense manager app built using Django and React(Nextjs). The way it's build it's best for family use. Self-host it and use it with your family members. It's a great way to keep track of your expenses and see where your money is going. Make 'admin' account for yourself and 'user' accounts for your family members.

## Features

- Create, update and delete expenses
- SAP
- JWT authentication
- Admin and user accounts

## Installation

Make sure both python and nodejs are installed on your system. This is a monorepo so you will need to install dependencies for both backend and frontend.

### Backend

```bash
  cd backend
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver
```

### Frontend

```bash
  cd frontend
  npm install
  npm run dev
```

## Environment Variables

Apart from installing dependencies you will also need to set some environment variables. You can do that by creating a `.env` file in the root of the project. You can use `.env.example` as a template.

## Acknowledgements

- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [Nextjs](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Django REST framework](https://www.django-rest-framework.org/)
- [Vercel](https://vercel.com/)
