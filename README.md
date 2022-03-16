## Housekeeping Rules

### Branch

Manage branches by `features`, except for those who is in charge of a whole page can create their own branch to work on.

Naming convention: `page`-`feature`
Eg: dashboard-navbar | dashboard-projectgrid for 2 developers working on a same page

### Commit

File commits: Try to split pack of commits according to a completion of one functionality.

Naming convention: `dev name` - `number` - `content`
Eg. Minh - 1 - Project Grid skeleton

_Note: Number can be divided further if there's any bug or followed up context.
Eg. Minh - 1.1 - [Fix] Add margin between items_

### Pull Request (PR)

Make sure to PR after completing a single function. PR will be reviewed by others but try to make sure there is no unannounced bug. If there is, please include in the PR for other to solve (in case there's an urgent need for that feature)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
