# JSON Placeholder Posts

A modern web application for browsing, searching, and testing posts data, built with Vite, TypeScript, and Vitest.

## Features

- Fetches and displays posts from an API (JSONPlaceholder API)
- Search and filter posts by title or content
- Paginate through posts
- Responsive and accessible UI

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm

### Installation

```bash
# Install dependencies
yarn install
# or
npm install
```

### Development

Start the development server:

```bash
yarn dev
# or
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

```bash
yarn build
# or
npm run build
```

### Running Tests

This project uses [Vitest](https://vitest.dev/) and [@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro/) for unit and integration tests.

```bash
yarn test
# or
npm test
```

#### Test Features

- Mocks API requests and global fetch
- Tests for loading states, API errors, and UI rendering
- Search and filter logic tested in isolation

### Project Structure

```
src/
  pages/
    PostsPage.ts         # Main posts page logic
    __tests__/
      PostsPage.test.ts  # Integration tests for PostsPage
  utils/
    searchAndFilter.ts   # Utility functions for searching/filtering posts
    __tests__/
      searchAndFilter.test.ts # Unit tests for utils
  api/
    apiService.ts        # API interaction logic (mocked in tests)
  test/
    setup.ts             # Vitest and Testing Library setup
vitest.config.ts         # Vitest configuration
```

### Customization

- To change the API endpoint or mock data, edit `src/api/apiService.ts` and related mocks in the test files.
- UI and styles can be adjusted in the respective component files and CSS.

### Troubleshooting

- If you see verbose HTML in test errors, the test configuration and assertions have been optimized to minimize this. If you encounter issues, check `vitest.config.ts` and use more specific assertions in your tests.
- For missing types (e.g., Node.js globals), ensure `@types/node` is installed.
