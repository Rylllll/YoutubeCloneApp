# YouTube Clone Technical Assessment

This project is a YouTube-inspired web application that I built as part of a technical assessment. The goal wasn't to recreate every feature of YouTube, but rather to demonstrate how I approach building a modern frontend application—focusing on project structure, reusable components, state management, TypeScript usage, and responsive UI design.

For the video content, I used the Pexels Videos API. Since the API doesn't provide some of the metadata that YouTube normally has (such as view counts and upload dates), I generated fallback mock data to create a more realistic experience. I also tried to make the interface feel familiar by using the Roboto font, YouTube-inspired layouts, and responsive behavior.

## How to Run the Project

1. Install the dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL displayed in the terminal (usually `http://localhost:5173`).

### Environment Variables (Optional)

If you'd like to use the live Pexels API, create a `.env` file in the project's root directory and add:

You can generate your API key here:

https://www.pexels.com/api/key/

```env
VITE_PEXELS_API_KEY=your_api_key_here
```

If an API key is not provided, the application will automatically use deterministic mock data so the project can still be run and tested without any additional setup.

---

## Frameworks and Tools Used

* **React 18** – Used for building reusable and component-based user interfaces.
* **TypeScript** – Added for type safety, better maintainability, and improved developer experience.
* **Vite** – Used as the build tool and development server because of its fast startup and hot module replacement.
* **React Router v7** – Handles client-side routing between pages.
* **Tailwind CSS v4** – Utility-first CSS framework used for styling and responsive layouts.
* **TanStack Query (React Query)** – Handles data fetching, caching, loading states, and error management.
* **Lucide React** and **React Icons** – Used for icons throughout the application.
* **Roboto Font** – Used to closely match YouTube's typography.
* **Pexels Videos API** – Provides the video content displayed in the application.

---

## Approach and Technology Choices

I chose React, TypeScript, and Vite because they offer a good balance between developer experience, performance, and maintainability. Since this assessment emphasizes code organization and UI implementation, I focused on keeping the project structure clean and the components as reusable as possible.

The application is broken down into smaller components, such as video cards, the navigation bar, sidebar, search components, and the video player. This makes the code easier to understand, maintain, and extend with additional features in the future.

I used TypeScript throughout the project to define interfaces and types for API responses, component props, and application state. This helped make the code more predictable and reduced potential runtime errors, especially when working with external API data.

TanStack Query was used to manage API requests because it provides caching, loading states, and error handling out of the box. Since the Pexels API doesn't include YouTube-style metadata like view counts and upload dates, I generated deterministic mock values to make the experience feel more realistic while keeping the data consistent across renders.

Some of the features implemented include:

* Responsive video grid layouts
* Sticky navigation bar
* Slide-over sidebar
* Search functionality with suggestions
* YouTube-inspired typography and spacing
* Video detail page with related videos
* Deterministic mock view counts and publish dates
* Fully playable videos using the Pexels API

Overall, my goal was to build an application that feels familiar to users while demonstrating clean architecture, reusable components, TypeScript best practices, and an approach that is easy to explain and discuss during a technical interview.

---

