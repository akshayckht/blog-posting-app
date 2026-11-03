

export const mockPosts = [
  {
    id: "post-001",
    title: "Understanding React Reconciliation",
    content: `React reconciliation is the process React uses to determine what changes need to be applied to the DOM.When a component's state or props change, React creates a new virtual representation of the UI and compares it with the previous one.This comparison process helps React identify which elements need updating, adding, or removing.Understanding reconciliation helps developers write more predictable and performant React applications.`,

    authorId: "user-001",
    authorName: "Alex Morgan",
    createdAt: "2026-11-03T08:30:00.000Z",
    updatedAt: "2026-11-03T08:30:00.000Z",
  },

  {
    id: "post-002",
    title: "Building Better Software Architecture",
    content: `Good software architecture is not about using the most advanced technologies. It is about making the system understandable, maintainable, and adaptable.Separating responsibilities between components, services, and data-access layers helps developers manage complexity.A well-designed architecture allows an application to evolve without requiring unnecessary changes throughout the codebase.`,
    authorId: "user-002",
    authorName: "Jordan Lee",
    createdAt: "2026-11-02T14:15:00.000Z",
    updatedAt: "2026-11-02T16:45:00.000Z",
  },

  {
    id: "post-003",
    title: "Why Every Developer Should Understand HTTP",
    content: `HTTP is the foundation of communication between clients and servers.

Understanding HTTP methods, status codes, headers, and request-response cycles makes it easier to design and debug APIs.

Developers working with frontend frameworks and backend technologies should understand how these concepts fit together.

A strong understanding of HTTP also makes API integration and troubleshooting much easier.`,
    authorId: "user-003",
    authorName: "Sarah Wilson",
    createdAt: "2026-11-02T09:00:00.000Z",
    updatedAt: "2026-11-02T09:00:00.000Z",
  },

  {
    id: "post-004",
    title: "Getting Started with Material UI and React",
    content: `Material UI provides a collection of reusable React components that follow Material Design principles.

It includes components such as Buttons, Cards, Dialogs, TextFields, AppBars, and many more.

The sx prop provides a convenient way to customize component styling using theme values and responsive breakpoints.

Using a consistent theme across an application helps maintain a unified design system.`,
    authorId: "user-001",
    authorName: "Alex Morgan",
    createdAt: "2026-11-01T12:20:00.000Z",
    updatedAt: "2026-11-01T12:20:00.000Z",
  },

  {
    id: "post-005",
    title: "The Importance of Clean Code",
    content: `Clean code is not simply about writing fewer lines of code. It is about making code easier to understand, test, and maintain.

Meaningful variable names, small functions, clear component responsibilities, and consistent conventions improve collaboration.

Writing clean code today reduces the effort required to understand and modify the application in the future.`,
    authorId: "user-004",
    authorName: "Michael Chen",
    createdAt: "2026-10-31T10:45:00.000Z",
    updatedAt: "2026-10-31T10:45:00.000Z",
  },

  {
    id: "post-006",
    title: "My Journey Learning Full-Stack Development",
    content: `Learning full-stack development requires patience, consistency, and practical experience.

Starting with HTML, CSS, and JavaScript provides the foundation for frontend development. Learning React introduces component-based UI development.

On the backend, understanding Java, Spring Boot, databases, and REST APIs helps developers build complete applications.

The most valuable lessons often come from building projects, debugging problems, and improving existing implementations.

Consistency matters more than trying to learn everything at once.`,
    authorId: "user-003",
    authorName: "Sarah Wilson",
    createdAt: "2026-10-30T07:30:00.000Z",
    updatedAt: "2026-10-30T07:30:00.000Z",
  },
];