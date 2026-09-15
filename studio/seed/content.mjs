/**
 * Vertex seed content — the single authored source of truth for the demo
 * dataset. Plain data only: the builder (build-ndjson.mjs) turns this into
 * Sanity documents (Portable Text, references, derived slugs), and the
 * resolver (resolve-videos.mjs) fills videos.json with real YouTube data
 * for every lesson query below.
 *
 * Consistency rule (AGENTS.md §8): modules are embedded in courses, lessons
 * are references — a course's totals are the sum of its modules, a module's
 * are the sum of its lessons. The builder validates this and refuses to emit
 * inconsistent output.
 */

// —───────────────────────────────────────────────────────────────────────────
// Instructors
// —───────────────────────────────────────────────────────────────────────────

export const instructors = [
  {
    key: 'sarah-chen',
    name: 'Sarah Chen',
    expertise: ['React', 'Next.js', 'Design Systems'],
    bio: 'Sarah has spent a decade building large React applications at design-system scale. She teaches the fundamentals the way she wishes she had learned them — by building real things, one layer at a time.',
  },
  {
    key: 'marcus-reid',
    name: 'Marcus Reid',
    expertise: ['Node.js', 'Data Fetching', 'Caching', 'APIs'],
    bio: 'Marcus is a staff engineer focused on the hard parts of the frontend/backend boundary: HTTP, caching, invalidation, and resilience under load. He has shipped APIs that serve hundreds of millions of requests a day.',
  },
  {
    key: 'priya-sharma',
    name: 'Priya Sharma',
    expertise: ['Machine Learning', 'NLP', 'LLMs'],
    bio: 'Priya worked on applied machine learning teams before moving into teaching. She explains models from the math up, but always lands the plane in working Python code.',
  },
  {
    key: 'emily-zhang',
    name: 'Emily Zhang',
    expertise: ['Python', 'TypeScript', 'Programming Fundamentals'],
    bio: 'Emily is a developer educator who specializes in first-principles explanations. Her courses assume you can install a code editor and nothing else.',
  },
  {
    key: 'diego-alvarez',
    name: 'Diego Alvarez',
    expertise: ['Git', 'CI/CD', 'Developer Workflow'],
    bio: 'Diego has been the person on his teams who untangles merge conflicts and fixes broken pipelines. He teaches the tools that make teams faster rather than scarier.',
  },
]

// —───────────────────────────────────────────────────────────────────────────
// Categories
// —───────────────────────────────────────────────────────────────────────────

export const categories = [
  {
    key: 'frontend',
    title: 'Frontend',
    description: 'Interfaces, frameworks, and the craft of the browser.',
  },
  {
    key: 'backend',
    title: 'Backend',
    description: 'Servers, APIs, and everything behind the network boundary.',
  },
  {
    key: 'data-apis',
    title: 'Data & APIs',
    description: 'Fetching, caching, and modeling the data your app runs on.',
  },
  {
    key: 'programming-foundations',
    title: 'Programming Foundations',
    description: 'Languages and core concepts every stack is built on.',
  },
  {
    key: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description: 'From classical models to large language models, explained properly.',
  },
  {
    key: 'developer-craft',
    title: 'Developer Craft',
    description: 'Git, tooling, testing, and the habits of productive teams.',
  },
]

// —───────────────────────────────────────────────────────────────────────────
// Courses
//
// Lesson shape: { key, title, query, notes[], keyPoints[], proTip?,
//                resources?, freePreview? }
// `query` is what resolve-videos.mjs searches YouTube with; `key` becomes
// lesson.<key> in the dataset and the videos.json lookup key.
// —───────────────────────────────────────────────────────────────────────────

export const courses = [
  {
    key: 'react-foundations',
    title: 'React Foundations',
    summary: 'Learn React the way it is actually written today — components, state, and events, building one real app.',
    instructor: 'sarah-chen',
    category: 'frontend',
    level: 'Beginner',
    price: 0,
    popular: true,
    studentCount: 128400,
    outcomes: [
      {icon: 'Code', title: 'Read and write JSX', description: 'Translate markup into components without reaching for a cheat sheet.'},
      {icon: 'Layers', title: 'Design component trees', description: 'Split UI into components that stay understandable as an app grows.'},
      {icon: 'Zap', title: 'Manage state and events', description: 'Use useState and event handlers confidently in real forms and lists.'},
      {icon: 'CheckCircle', title: 'Ship a working app', description: 'Finish with a polished todo application you built from scratch.'},
    ],
    modules: [
      {
        title: 'Getting Started',
        summary: 'What React is, what JSX is, and how a component tree renders your first screen.',
        lessons: [
          {
            key: 'rf-intro',
            title: 'What Is React and Why Does It Exist?',
            query: 'React tutorial for beginners what is React',
            freePreview: true,
            notes: [
              'React is a JavaScript library for building user interfaces out of small, reusable pieces called components. Instead of imperatively poking at the DOM, you describe what the UI should look like for a given state, and React keeps the real DOM in sync.',
              'This lesson covers why component-based rendering won over template strings and jQuery-style code, how React fits into a real project, and what "declarative" means in practice.',
            ],
            keyPoints: ['What a component actually is', 'Declarative vs imperative UI', 'How React updates the DOM'],
            resources: [{type: 'article', title: 'React docs: Thinking in React', url: 'https://react.dev/learn/thinking-in-react', description: 'The official mental model for component design.'}],
          },
          {
            key: 'rf-jsx',
            title: 'JSX: HTML That Is Actually JavaScript',
            query: 'JSX elements React tutorial',
            notes: [
              'JSX is a syntax extension that lets you write markup inside JavaScript. It compiles down to function calls, which means expressions, variables, and logic can sit right inside your UI code with curly braces.',
              'You will learn the rules that trip up everyone: className instead of class, self-closing tags, how to embed expressions, and why JSX is not a template language.',
            ],
            keyPoints: ['JSX compiles to function calls', 'Embedding expressions with {}', 'The naming rules that differ from HTML'],
          },
          {
            key: 'rf-components',
            title: 'Function Components and Props',
            query: 'React function components props tutorial',
            notes: [
              'A function component is just a JavaScript function that takes props and returns JSX. Props are the component’s API: everything the parent passes down, and everything the component reads without owning.',
              'We build a small profile-card component, pass it data, and discuss the one rule props must follow — a component may never change its own props.',
            ],
            keyPoints: ['Components are functions', 'Props as a read-only API', 'Composing components together'],
            proTip: 'If a component needs to change something, that something belongs in the parent that renders it, not in the component itself.',
          },
        ],
      },
      {
        title: 'State and Events',
        summary: 'The interactive half of React: handling user events and keeping state.',
        lessons: [
          {
            key: 'rf-state',
            title: 'The useState Hook',
            query: 'React useState hook tutorial',
            notes: [
              'useState is how a component remembers things between renders: input values, open/closed flags, list items. Calling it returns the current value and a setter that schedules a re-render.',
              'This lesson covers the state update cycle, why state changes appear to be async, and how objects and arrays in state must be replaced, not mutated.',
            ],
            keyPoints: ['Reading and updating state', 'Why re-renders happen', 'Never mutate state in place'],
            resources: [{type: 'article', title: 'React docs: Adding Interactivity', url: 'https://react.dev/learn/adding-interactivity', description: 'The reference for state-driven UI.'}],
          },
          {
            key: 'rf-events',
            title: 'Handling Events Like onClick',
            query: 'React event handling onClick onChange tutorial',
            notes: [
              'React event handlers are plain JavaScript functions passed to props like onClick and onChange. They receive a synthetic event that behaves like the native one, plus the usual closure over state and props.',
              'We wire buttons, text inputs, and forms, and learn the pattern of passing a function down as a prop so a child can tell its parent to update state.',
            ],
            keyPoints: ['Passing handlers as props', 'The synthetic event object', 'Lifting state up for child actions'],
          },
          {
            key: 'rf-lists',
            title: 'Rendering Lists and the key Prop',
            query: 'React map list rendering keys tutorial',
            notes: [
              'Lists in React are rendered with .map(): data in, array of elements out. The key prop tells React which items are which so it can move, add, or remove DOM nodes efficiently and correctly.',
              'You will see exactly what breaks when keys are missing or wrong, and why array indexes make unreliable keys for lists that reorder.',
            ],
            keyPoints: ['.map() to render collections', 'What keys are for', 'Why index-based keys backfire'],
            proTip: 'Use the stable identifier your data already has — database ids, slugs. If nothing is stable, the list will eventually confuse React.',
          },
        ],
      },
      {
        title: 'Putting It Together',
        summary: 'Forms, talking to the network, and building the todo app end to end.',
        lessons: [
          {
            key: 'rf-forms',
            title: 'Controlled Inputs and Forms',
            query: 'React controlled form input tutorial',
            notes: [
              'A controlled input is one whose value comes from React state and updates it back on every change. The render loop becomes the source of truth, which makes validation and formatting easy.',
              'We build an add-todo form, then extend it to editing existing items — one form component, reused in two places.',
            ],
            keyPoints: ['value + onChange round trip', 'Submitting without page reloads', 'Reusing a form for add and edit'],
          },
          {
            key: 'rf-fetch',
            title: 'Fetching Data in useEffect',
            query: 'React fetch data useEffect tutorial',
            notes: [
              'useEffect runs code after render — the right place to fetch data and subscribe to events. Fetched data is not state yet: you still need to load/error/data state and render all three cases.',
              'We fetch from a public API and render loading and error states honestly, including cleanup for effects that run twice in development.',
            ],
            keyPoints: ['Effect runs after paint', 'Loading, error, and success states', 'Cleanup and double-invocation'],
            resources: [{type: 'article', title: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect', description: 'When effects are the wrong tool.'}],
          },
          {
            key: 'rf-project',
            title: 'Build a Todo App From Scratch',
            query: 'React todo app tutorial beginner',
            notes: [
              'This build combines every prior lesson: a component tree, lifted state for the todo list, controlled inputs for adding items, handlers for completing and deleting, and conditional rendering for empty states.',
              'Finish with a complete, polished app — plus a checklist of the refactors you would do next as the feature set grows.',
            ],
            keyPoints: ['Plan a component tree', 'One source of truth for the list', 'Ship a complete interactive app'],
          },
        ],
      },
    ],
  },

  {
    key: 'advanced-react-patterns',
    title: 'Advanced React Patterns',
    summary: 'The patterns experienced teams reach for: composition, custom hooks, and performance.',
    instructor: 'sarah-chen',
    category: 'frontend',
    level: 'Intermediate',
    price: 79,
    popular: false,
    studentCount: 41200,
    outcomes: [
      {icon: 'Layers', title: 'Compose, don’t configure', description: 'Replace prop soup with compound components and children.'},
      {icon: 'Zap', title: 'Extract logic into hooks', description: 'Share stateful behavior between components cleanly.'},
      {icon: 'BarChart3', title: 'Reason about performance', description: 'Know when memoization helps and when it hurts.'},
      {icon: 'BookOpen', title: 'Use Suspense boundaries', description: 'Coordinate loading and lazy code with real boundaries.'},
    ],
    modules: [
      {
        title: 'Composition Patterns',
        summary: 'Building flexible component APIs the way polished libraries do.',
        lessons: [
          {
            key: 'ar-comp',
            title: 'Compound Components',
            query: 'React compound components pattern tutorial',
            freePreview: true,
            notes: [
              'A compound component is a family of components that implicitly communicate — Tab.List and Tab.Panel know which tab is active without the user wiring them together. The context is internal, the API is declarative.',
              'We build an accordion from scratch, moving shared state into a parent that children read through context.',
            ],
            keyPoints: ['Implicit communication via context', 'Owning state in the parent', 'Designing a family API'],
          },
          {
            key: 'ar-children',
            title: 'Children Over Configuration Props',
            query: 'React children prop composition pattern',
            notes: [
              'Boolean props like showHeader or renderFooter are a code smell — they turn every component into a configuration object. Passing JSX as children keeps layout decisions at the call site.',
              'We refactor a card component from eight props to two, and discuss when an explicit slot prop is still the right call.',
            ],
            keyPoints: ['children as the escape hatch', 'Named slots with object children', 'Deleting flag props'],
            proTip: 'If you are adding a boolean prop, ask whether a parent should just pass the JSX it wants instead.',
          },
          {
            key: 'ar-custom-hooks',
            title: 'Custom Hooks That Share Logic',
            query: 'custom hooks in React tutorial',
            notes: [
              'A custom hook is a function that uses other hooks — the primary mechanism React offers for reusing stateful logic. Rules of hooks apply inside them exactly as in components.',
              'We extract useLocalStorage, useFetch, and useClickOutside from real components, then test the extraction.',
            ],
            keyPoints: ['The "use" naming convention', 'Extracting stateful logic', 'Composing hooks from hooks'],
          },
        ],
      },
      {
        title: 'Performance and Boundaries',
        summary: 'When rendering is the bottleneck, and what React 18 offers instead.',
        lessons: [
          {
            key: 'ar-memo',
            title: 'React.memo, useMemo, useCallback',
            query: 'React memo useMemo useCallback performance tutorial',
            notes: [
              'Memoization is a cache, and like any cache it can be slower than the work it skips. React.memo stops re-renders when props are equal; useMemo and useCallback keep values referentially stable so memoization works at all.',
              'We profile a slow list, fix it with memo — then show how the fix silently did nothing until the props were actually stable.',
            ],
            keyPoints: ['Referential equality is everything', 'Profiling before memoizing', 'The cost of over-memoizing'],
          },
          {
            key: 'ar-context',
            title: 'Context Without the Re-render Tax',
            query: 'React context performance re-render tutorial',
            notes: [
              'Every change to a context value re-renders every consumer — great for a theme, dangerous for a user object that changes on every keystroke.',
              'We split read and write contexts, move state into a reducer, and measure the difference in a real settings page.',
            ],
            keyPoints: ['Why context changes re-render consumers', 'Splitting value objects', 'Reducer + dispatch context pattern'],
            proTip: 'A dispatch function from useReducer never changes identity — put it in its own context and most re-render problems vanish.',
          },
          {
            key: 'ar-suspense',
            title: 'Suspense, Lazy Loading, and Transitions',
            query: 'React Suspense lazy code splitting tutorial',
            notes: [
              'React.lazy and Suspense give you code splitting with a fallback UI, and startTransition lets you mark expensive updates as interruptible so the page stays responsive.',
              'We lazy-load a charting library behind a Suspense boundary and wrap a filter input in a transition.',
            ],
            keyPoints: ['Suspense fallbacks as loading UI', 'Bundle splitting with lazy()', 'Keeping input responsive with transitions'],
          },
        ],
      },
    ],
  },

  {
    key: 'nextjs-app-router',
    title: 'Next.js: The App Router Course',
    summary: 'Server components, file-based routing, caching and streaming — the full modern Next.js stack.',
    instructor: 'sarah-chen',
    category: 'frontend',
    level: 'Intermediate',
    price: 89,
    popular: true,
    studentCount: 63900,
    outcomes: [
      {icon: 'Layers', title: 'Think in the App Router', description: 'Layouts, nested routes, and where the server boundary sits.'},
      {icon: 'Code', title: 'Server and client components', description: 'Choose deliberately, not by trial and error.'},
      {icon: 'Zap', title: 'Control caching', description: 'Revalidation, tags, and why pages go stale.'},
      {icon: 'CheckCircle', title: 'Ship to production', description: 'Auth, deployment, and real-world gotchas.'},
    ],
    modules: [
      {
        title: 'Rendering and Routing',
        summary: 'The mental model: routes, layouts, and the server/client split.',
        lessons: [
          {
            key: 'nx-rsc',
            title: 'React Server Components Explained',
            query: 'React Server Components explained Next.js',
            freePreview: true,
            notes: [
              'Server components render on the server and send their output — not their code — to the browser. That means direct database access in a component, and zero bundle cost for what stays server-side.',
              'We look at what server components cannot do — state, effects, event handlers — and why the restriction list is the whole point.',
            ],
            keyPoints: ['Zero JavaScript on the client', 'Fetching directly in components', 'The rules server components follow'],
          },
          {
            key: 'nx-routes',
            title: 'File-based Routing and Layouts',
            query: 'Next.js App Router routing tutorial',
            notes: [
              'In the app directory, folders are routes: page.tsx is the screen, layout.tsx wraps it and survives navigation, route groups and dynamic segments ([id]) shape the URL without touching config.',
              'We build a blog: /, /blog, /blog/[slug], nested layouts for the sidebar, and loading states for free.',
            ],
            keyPoints: ['page, layout, loading, error files', 'Dynamic segments', 'Route groups and parallel paths'],
          },
          {
            key: 'nx-data',
            title: 'Data Fetching in the App Router',
          query: 'Next.js data fetching server components tutorial',
            notes: [
              'Server components fetch with plain async/await — no getServerSideProps, no API layer you have to stand between the page and your data.',
              'We fetch from a CMS, pass data down, and isolate the interactive pieces into client components at the leaves.',
            ],
            keyPoints: ['async components and await in render', 'Pushing "use client" to the leaves', 'Serializing data across the boundary'],
            proTip: 'A client component that is imported by server code only becomes a client boundary at its import site — keep heavy leaf components client-only and import them lazily.',
          },
        ],
      },
      {
        title: 'Production',
        summary: 'Caching, auth, and deploy — the parts that decide whether launch goes smoothly.',
        lessons: [
          {
            key: 'nx-cache',
            title: 'The Caching Model and Revalidation',
            query: 'Next.js caching revalidation tutorial',
            notes: [
              'Next.js caches request results, full route trees, and static assets — three layers that explain both the magic speed and the mysterious stale pages. Revalidation opts you out, per route or per tag.',
              'We set cache lifetimes, trigger on-demand revalidation from a webhook, and prove what actually got cached by watching response headers.',
            ],
            keyPoints: ['Request, router, and full-route cache', 'revalidate seconds vs tags', 'on-demand revalidation'],
          },
          {
            key: 'nx-auth',
            title: 'Authentication and Middleware',
            query: 'Next.js authentication middleware tutorial',
            notes: [
              'Auth in the App Router is a team sport: middleware guards routes before they render, server components read the session on every request, and only the client pieces trust nothing.',
              'We wire Clerk middleware, protect a dashboard route group, and render personalized UI from the session server-side.',
            ],
            keyPoints: ['Middleware for coarse protection', 'Per-page auth checks on the server', 'Signing in and out cleanly'],
          },
          {
            key: 'nx-deploy',
            title: 'Deploying a Next.js App',
            query: 'Next.js deploy to Vercel tutorial',
            notes: [
              'A production build decides static vs dynamic rendering per route — which is why a deploy log tells you more about your app than any router config does.',
              'We deploy to Vercel, configure environment variables, set up preview deploys per pull request, and check the build output report.',
            ],
            keyPoints: ['Reading the build output', 'Environment variables, prod vs preview', 'Preview deploy workflow'],
            resources: [{type: 'article', title: 'Deploying Next.js', url: 'https://nextjs.org/docs/app/guides/deployment', description: 'Official platform and provider guidance.'}],
          },
        ],
      },
    ],
  },

  {
    key: 'typescript-deep-dive',
    title: 'TypeScript Deep Dive',
    summary: 'From annotations to inference you trust: types, generics, and TypeScript in real React code.',
    instructor: 'emily-zhang',
    category: 'programming-foundations',
    level: 'Intermediate',
    price: 49,
    popular: false,
    studentCount: 87600,
    outcomes: [
      {icon: 'BookOpen', title: 'The type system as a language', description: 'Model states precisely instead of stringly-typed guessing.'},
      {icon: 'Zap', title: 'Generics that read well', description: 'Reusable types without losing inference.'},
      {icon: 'Layers', title: 'Narrowing and unions', description: 'Let the compiler follow your logic.'},
      {icon: 'Code', title: 'TypeScript with React', description: 'Props, hooks, and events typed without fighting the tool.'},
    ],
    modules: [
      {
        title: 'Fundamentals',
        summary: 'The type vocabulary and the inference that makes it usable.',
        lessons: [
          {
            key: 'ts-types',
            title: 'Types, Annotations, and Inference',
            query: 'TypeScript tutorial for beginners',
            freePreview: true,
            notes: [
              'You annotate function parameters and rarely annotate locals: TypeScript infers most of what you write, and annotation where inference is wrong is the professional move.',
              'We set up a project with strict mode and walk through the primitive types, arrays, and objects you will use every day.',
            ],
            keyPoints: ['strict mode is non-negotiable', 'Inference vs annotation', 'Objects, arrays, tuples'],
          },
          {
            key: 'ts-interfaces',
            title: 'Interfaces, Types, and Object Shapes',
            query: 'TypeScript interface vs type tutorial',
            notes: [
              'interface and type overlap almost completely, but they are not the same tool: interfaces extend and merge, types take unions and mapped shapes.',
              'We model a component’s props both ways, then choose one and explain the choice out loud — the interview version.',
            ],
            keyPoints: ['Extends vs intersection', 'Unions with type', 'Optional and readonly properties'],
          },
          {
            key: 'ts-generics',
            title: 'Generics Without the Gimmicks',
            query: 'TypeScript generics explained tutorial',
            notes: [
              'A generic is a type-level function parameter: write the shape once, let the caller fill in the specific type. Constraints like <T extends string> keep that power safe.',
              'We build a type-safe pluck, a generic fetch wrapper, and a result type every async function in your codebase can share.',
            ],
            keyPoints: ['Generic functions and types', 'The extends constraint', 'Real wrappers, not party tricks'],
            proTip: 'If two generic parameters do different jobs, name them — T and U are fine, but TData and TError tell the next reader what is going on.',
          },
        ],
      },
      {
        title: 'Advanced Patterns',
        summary: 'Utility types, narrowing, and typed React.',
        lessons: [
          {
            key: 'ts-utility',
            title: 'Utility Types: Partial, Pick, Record, Omit',
            query: 'TypeScript utility types tutorial',
            notes: [
              'Partial<T>, Pick<T, K>, Omit<T, K>, Record<K, V> — four generics you can derive thousands of shapes from without ever writing a duplicate interface.',
              'We take an API response type and derive exactly the three shapes our UI needs: the form draft, the patch payload, and the cached row.',
            ],
            keyPoints: ['Transforming existing types', 'Deriving not duplicating', 'When to write your own'],
          },
          {
            key: 'ts-narrow',
            title: 'Narrowing and Discriminated Unions',
            query: 'TypeScript type narrowing discriminated unions',
            notes: [
              'Narrowing is the compiler watching your if-statements: typeof, in, truthiness — and above all, the tagged union where one property decides everything.',
              'We refactor a messy nullable state into { status: "loading" | "error" | "success" } and delete a dozen impossible-case guards.',
            ],
            keyPoints: ['How narrowing flows through control flow', 'Tagged unions for state machines', 'never as an exhaustiveness check'],
          },
          {
            key: 'ts-react',
            title: 'Typing React: Props, Hooks, Events',
            query: 'TypeScript React tutorial hooks props events',
            notes: [
              'React code types itself surprisingly well once you know three patterns: a props interface, useState<...> where the initial value is empty, and React.ChangeEvent for inputs.',
              'We type a todo form end-to-end — children, refs, custom hooks, and the generic children type for component props.',
            ],
            keyPoints: ['Props interfaces and children', 'Typed event handlers', 'Generic custom hooks'],
            resources: [{type: 'article', title: 'TypeScript Cheat Sheets for React', url: 'https://react-typescript-cheatsheet.netlify.app/', description: 'The community reference for every edge case.'}],
          },
        ],
      },
    ],
  },

  {
    key: 'python-for-programmers',
    title: 'Python for Programmers',
    summary: 'A fast, honest tour of Python for people who can already program in something else.',
    instructor: 'emily-zhang',
    category: 'programming-foundations',
    level: 'Beginner',
    price: 0,
    popular: true,
    studentCount: 152300,
    outcomes: [
      {icon: 'Code', title: 'Write Pythonic code', description: 'Comprehensions, unpacking, and idioms that replace loops.'},
      {icon: 'BookOpen', title: 'Core data structures', description: 'Lists, dicts, and sets chosen well.'},
      {icon: 'Layers', title: 'Functions and modules', description: 'Structure a real script, not a 500-line notebook.'},
      {icon: 'Zap', title: 'Files and classes', description: 'Read real data and model it with a class when it earns it.'},
    ],
    modules: [
      {
        title: 'Language Basics',
        summary: 'Setup, control flow, and functions — the 20% you use daily.',
        lessons: [
          {
            key: 'py-start',
            title: 'Setup and Your First Script',
            query: 'Python tutorial for beginners full course',
            freePreview: true,
            notes: [
              'Python runs everywhere; the difference between a working environment and a frustrating one is virtual environments and knowing which python you just ran.',
              'We install Python, create a venv, run a first script, and set up VS Code with the right interpreter and linter.',
            ],
            keyPoints: ['venv from day one', 'Running scripts vs the REPL', 'Editor setup that catches bugs'],
          },
          {
            key: 'py-control',
            title: 'Booleans, Loops, and Control Flow',
            query: 'Python if statements for while loops tutorial',
            notes: [
              'Truthiness, for over iterables, while for the unknown-count case, and enumerate/zip so you stop writing index arithmetic.',
              'Small examples, but every one of them is a Python-specific trap: the empty container, the mutable default, the off-by-one range.',
            ],
            keyPoints: ['What counts as False', 'enumerate and zip', 'range semantics'],
          },
          {
            key: 'py-functions',
            title: 'Functions, Scope, and *args',
            query: 'Python functions tutorial *args **kwargs',
            notes: [
              'Functions are Python’s atoms: default arguments, keyword-only arguments, *args and **kwargs for the rare flexible signature, and the scoping rule that surprises newcomers.',
              'We cover why mutable defaults are a bug factory and what a function signature communicates when you read someone else’s code.',
            ],
            keyPoints: ['Default and keyword arguments', 'The mutable-default trap', 'LEGB scope lookup'],
            proTip: 'A bug fixed at 8am: def f(items=[]). The same bug shipped at 5pm: that default list is shared across every call.',
          },
        ],
      },
      {
        title: 'Data and Structure',
        summary: 'The container types, file handling, and when to write a class.',
        lessons: [
          {
            key: 'py-lists',
            title: 'Lists, Dicts, and Sets',
            query: 'Python lists dictionaries sets tutorial',
            notes: [
              'Three containers cover most of Python data: the list for sequences, the dict for keyed lookups, and the set for membership and dedupe.',
              'We pick the right one for real shapes of data and learn the performance difference between x in list and x in set.',
            ],
            keyPoints: ['Choosing the right container', 'Comprehensions for transforms', 'Set operations for diffs'],
          },
          {
            key: 'py-files',
            title: 'Reading and Writing Files',
            query: 'Python file handling tutorial with open',
            notes: [
              'with open(...) handles the close for you; Path from pathlib handles the strings; and a try/except around a directory walk handles the messy real world.',
              'We read a CSV line by line, count word frequencies with a Counter, and write the report back out.',
            ],
            keyPoints: ['The with statement', 'pathlib over string paths', 'Counter for quick aggregates'],
            resources: [{type: 'article', title: 'Python docs: Files and Exceptions', url: 'https://docs.python.org/3/tutorial/inputoutput.html', description: 'The official I/O chapter.'}],
          },
          {
            key: 'py-oop',
            title: 'Classes Only When You Need Them',
            query: 'Python classes objects tutorial',
            notes: [
              'Python classes earn their keep when data and behavior travel together. Until then a function and a dict are simpler.',
              'We write one class properly: __init__, methods, a __repr__ that makes debugging kind, and dataclasses for the boilerplate.',
            ],
            keyPoints: ['Methods vs plain functions', '__init__ and self', '@dataclass to kill boilerplate'],
          },
        ],
      },
    ],
  },

  {
    key: 'intro-machine-learning',
    title: 'Introduction to Machine Learning',
    summary: 'Classical ML from first principles in scikit-learn: regression, classification, and honest evaluation.',
    instructor: 'priya-sharma',
    category: 'ai-machine-learning',
    level: 'Intermediate',
    price: 99,
    popular: true,
    studentCount: 71500,
    outcomes: [
      {icon: 'BarChart3', title: 'Regression that fits', description: 'Linear models, residuals, and overfitting you can see.'},
      {icon: 'CheckCircle', title: 'Classification end to end', description: 'Trees, metrics, and confusion matrices.'},
      {icon: 'Layers', title: 'Pipelines that don’t leak', description: 'Preprocessing inside the pipeline, always.'},
      {icon: 'Search', title: 'Evaluate honestly', description: 'Cross-validation, held-out sets, and what the numbers mean.'},
    ],
    modules: [
      {
        title: 'Foundations',
        summary: 'What "learning" means, and the first model: a line.',
        lessons: [
          {
            key: 'ml-intro',
            title: 'What Machine Learning Actually Is',
            query: 'machine learning tutorial for beginners explained',
            freePreview: true,
            notes: [
              'Machine learning replaces hand-written rules with rules fitted to data: a model class, a loss function, and an optimizer — that trio is the entire subject.',
              'We map the territory — supervised vs unsupervised, classification vs regression — and set up the Python toolkit we use all course.',
            ],
            keyPoints: ['Model class, loss, optimizer', 'Supervised vs unsupervised', 'NumPy, pandas, scikit-learn setup'],
          },
          {
            key: 'ml-regression',
            title: 'Linear Regression Step by Step',
            query: 'linear regression python tutorial scikit-learn',
            notes: [
              'A line with a slope that minimizes squared error — we fit it, plot the residuals, and see exactly how regularization changes the fit when features get noisy.',
              'The important skill is reading a fit: which features carry weight, and when a good training score means nothing.',
            ],
            keyPoints: ['Fitting and predicting', 'Residual plots', 'Ridge and Lasso as regularization'],
          },
          {
            key: 'ml-classification',
            title: 'Classification: Predicting Categories',
            query: 'classification machine learning tutorial scikit-learn',
            notes: [
              'Classification answers which, not how much. Logistic regression, k-nearest neighbors, and support-vector machines all draw decision boundaries — we watch each one fail in its own way.',
              'Build intuition from boundary plots, then graduate to why linear boundaries need engineered features.',
            ],
            keyPoints: ['Decision boundaries', 'kNN and SVM in practice', 'Feature scaling matters'],
          },
        ],
      },
      {
        title: 'Models in Practice',
        summary: 'Trees, evaluation discipline, and reproducible pipelines.',
        lessons: [
          {
            key: 'ml-trees',
            title: 'Decision Trees and Random Forests',
            query: 'decision tree random forest tutorial python',
            notes: [
              'Trees split features to reduce impurity; forests average many decorrelated trees and fix the single tree’s overfitting habit.',
              'We compare tree depth against training score, then read feature importances — with a healthy suspicion of what they do and do not mean.',
            ],
            keyPoints: ['How a tree chooses splits', 'Bagging and decorrelation', 'Interpreting feature importance'],
            proTip: 'A random forest on raw text with default settings is a great way to report a 99% score that means nothing. Split train/test before any preprocessing.',
          },
          {
            key: 'ml-metrics',
            title: 'Evaluating Models Honestly',
            query: 'machine learning model evaluation metrics tutorial',
            notes: [
              'Accuracy is the metric to distrust: a 1% disease detector that always says "healthy" scores 99%. Precision, recall, ROC-AUC, and the confusion matrix tell the actual story.',
              'We pick a metric for a stated business cost, then evaluate with cross-validation to see whether that score holds up.',
            ],
            keyPoints: ['The confusion matrix', 'Precision vs recall trade-offs', 'Cross-validation done right'],
          },
          {
            key: 'ml-pipeline',
            title: 'Pipelines and Deployment',
            query: 'scikit-learn pipeline tutorial imblearn',
            notes: [
              'scikit-learn pipelines bundle preprocessing and model into one object that fits inside each cross-validation fold — leak-proof by construction.',
              'We wrap scaling plus a forest in a Pipeline, grid-search it with cross-validation, and save the fitted model for deployment.',
            ],
            keyPoints: ['Pipeline over manual steps', 'GridSearchCV with folds', 'Saving and shipping a model'],
            resources: [{type: 'article', title: 'scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', description: 'The reference we return to all course.'}],
          },
        ],
      },
    ],
  },

  {
    key: 'large-language-models',
    title: 'Large Language Models Explained',
    summary: 'Transformers, training, prompting, RAG, and agents — how LLMs work and how to use them well.',
    instructor: 'priya-sharma',
    category: 'ai-machine-learning',
    level: 'Intermediate',
    price: 129,
    popular: false,
    studentCount: 58700,
    outcomes: [
      {icon: 'Search', title: 'Attention, not magic', description: 'What a transformer actually computes.'},
      {icon: 'BookOpen', title: 'Tokenization and training', description: 'Why models make the mistakes they make.'},
      {icon: 'Zap', title: 'Prompt engineering that works', description: 'Instructions, examples, and structure.'},
      {icon: 'Layers', title: 'RAG and agents', description: 'Grounding models in your data and giving them tools.'},
    ],
    modules: [
      {
        title: 'How They Work',
        summary: 'The mechanism, from tokens to attention.',
        lessons: [
          {
            key: 'llm-transformers',
            title: 'The Transformer and Attention',
            query: 'transformer architecture attention mechanism explained',
            freePreview: true,
            notes: [
              'Attention lets every token look at every other token and decide what to read — that is the entire trick the architecture is named for. We build the intuition first and only then look at the equations.',
              'You will see how stacked attention blocks create context, and why model size alone does not explain the interesting behavior.',
            ],
            keyPoints: ['Query/key/value intuition', 'Positional information', 'Why depth creates capability'],
          },
          {
            key: 'llm-tokenizers',
            title: 'Tokenization: Reading at the Model’s Speed',
            query: 'tokenization large language models explained',
            notes: [
              'Models do not read words — they read tokens from a fixed vocabulary learned from text. This single fact explains weird arithmetic, spelling questions, and most "the model is dumb" moments.',
              'We tokenize live, inspect a tokenizer’s vocabulary, and count tokens against API pricing.',
            ],
            keyPoints: ['BPE and subwords', 'What tokenizers break', 'Tokens → cost → context limits'],
          },
          {
            key: 'llm-training',
            title: 'Pretraining, Fine-tuning, RLHF',
            query: 'how large language models are trained pretraining RLHF',
            notes: [
              'Three stages make a chat model: pretraining on text with next-token prediction, supervised fine-tuning on demonstrations, then preference training (RLHF or DPO).',
              'We discuss what each stage adds — and what each one cannot fix — so you can reason about model behavior like an engineer.',
            ],
            keyPoints: ['Next-token prediction objective', 'Instruction tuning', 'Preference learning and its limits'],
            proTip: 'A model that refuses a harmless request is usually RLHF overcorrection, not a policy you can prompt your way out of forever.',
          },
        ],
      },
      {
        title: 'Using Them Well',
        summary: 'Prompting, retrieval, and tools in production.',
        lessons: [
          {
            key: 'llm-prompting',
            title: 'Prompt Engineering for Reliability',
            query: 'prompt engineering tutorial best practices',
            notes: [
              'Reliable prompts are structured, specific, and tested — role and task, output format, examples for ambiguous cases, then a suite of checks on real inputs.',
              'We rewrite a vague prompt into a contract and compare the output distribution before and after.',
            ],
            keyPoints: ['Format constraints', 'Few-shot examples', 'Treating prompts as testable code'],
          },
          {
            key: 'llm-rag',
            title: 'Retrieval-Augmented Generation',
            query: 'retrieval augmented generation RAG explained tutorial',
            notes: [
              'RAG grounds answers in your documents: chunk the corpus, embed and index it, retrieve top passages for the question, and make the model answer from context with citations.',
              'The whole game is retrieval quality. We evaluate chunking strategies and show the failure mode of a bad chunk.',
            ],
            keyPoints: ['Chunking for retrieval', 'Embeddings and vector search', 'Answer-from-context with citations'],
          },
          {
            key: 'llm-agents',
            title: 'Tool Use and Agents',
            query: 'LLM agents tool use function calling explained',
            notes: [
              'Function calling turns a language model into a decision-maker: give it tools, let it choose one, feed the result back, loop until done.',
              'We build a small agent with two tools, discuss loop safety, and cover why structured output beats free-form text at every boundary.',
            ],
            keyPoints: ['The tool-calling loop', 'Structured output (Zod schemas)', 'Stopping conditions and guardrails'],
            resources: [{type: 'article', title: 'OpenAI Function Calling Guide', url: 'https://platform.openai.com/docs/guides/function-calling', description: 'Reference for the request/response loop.'}],
          },
        ],
      },
    ],
  },

  {
    key: 'backend-node-apis',
    title: 'Backend APIs with Node.js',
    summary: 'Design and build a real HTTP API: Express, databases, auth, and tests that catch regressions.',
    instructor: 'marcus-reid',
    category: 'backend',
    level: 'Beginner',
    price: 59,
    popular: false,
    studentCount: 45800,
    outcomes: [
      {icon: 'Code', title: 'HTTP from the ground up', description: 'Methods, status codes, and headers you can reason about.'},
      {icon: 'Layers', title: 'Express with structure', description: 'Routes, middleware, and controllers that scale past a weekend.'},
      {icon: 'Zap', title: 'Auth that is not DIY crypto', description: 'JWTs, password hashing, and sessions.'},
      {icon: 'CheckCircle', title: 'Tested end to end', description: 'Integration tests against real routes and real responses.'},
    ],
    modules: [
      {
        title: 'HTTP and Express',
        summary: 'The request/response loop, then a framework that respects it.',
        lessons: [
          {
            key: 'node-start',
            title: 'Node.js and the Event Loop',
            query: 'Node.js tutorial for beginners full course',
            freePreview: true,
            notes: [
              'Node runs JavaScript on one thread with a queue: callbacks and promises keep it busy without blocking. That model is why Node handles many concurrent connections and why one CPU-bound loop freezes everyone.',
              'We set up the runtime, write a server with no framework, and watch the event loop in action.',
            ],
            keyPoints: ['Single-threaded, non-blocking', 'Callback → promise → async/await', 'Why sync work stalls the loop'],
          },
          {
            key: 'node-express',
            title: 'REST APIs with Express',
            query: 'Express.js REST API tutorial',
            notes: [
              'Express maps verbs and paths to handler functions, with middleware as the universal extension point. REST here means resources, methods, and meaningful status codes.',
              'We build a task API: GET/POST/PATCH/DELETE with validation, 404 and 400 handling, and versioned routes.',
            ],
            keyPoints: ['Routing and status codes', 'Request validation', 'Versioned route design'],
          },
          {
            key: 'node-middleware',
            title: 'Middleware, Errors, and Logging',
            query: 'Express middleware tutorial error handling',
            notes: [
              'Middleware is the (req, res, next) chain: parse bodies, log every request, attach auth context, and funnel errors to one final handler that formats them for clients.',
              'We build a request-id logger, a central error handler, and the four-argument trap that silently breaks async error catching.',
            ],
            keyPoints: ['next() and ordering', 'Central error handler', 'Async errors and wrapping'],
            proTip: 'Express 4 will not catch a rejected promise from an async handler. Use Express 5 or wrap the handler — silently skipping this is how 500s become empty responses.',
          },
        ],
      },
      {
        title: 'Data, Auth, and Tests',
        summary: 'Persisting, protecting, and proving the API works.',
        lessons: [
          {
            key: 'node-db',
            title: 'Connecting a Database',
            query: 'Node.js MongoDB database tutorial',
            notes: [
              'A connection pool, a repository layer, and an index — that is the minimum for a database your API can trust. We choose between SQL and document stores based on access patterns.',
              'The rest is the discipline: never interpolate user input, and treat every query path as reachable.',
            ],
            keyPoints: ['Connection pools', 'Repository layer separation', 'Injection protection'],
          },
          {
            key: 'node-auth',
            title: 'JWT Authentication',
            query: 'JWT authentication Node.js Express tutorial',
            notes: [
              'JWTs sign a claim the client holds: identity, role, expiry — verified by the server on every request. Hashing with bcrypt protects stored passwords; signing protects issued tokens.',
              'We add signup, login, and a protected route, then discuss the refresh/short-lived-token trade-off that actually matters.',
            ],
            keyPoints: ['bcrypt for passwords', 'Signing and verifying tokens', 'Middleware-protected routes'],
            resources: [{type: 'article', title: 'JWT.io Introduction', url: 'https://jwt.io/introduction', description: 'The token format reference.'}],
          },
          {
            key: 'node-testing',
            title: 'Testing an API',
            query: 'REST API testing Node.js supertest tutorial',
            notes: [
              'Unit tests the handler logic; supertest hits the real routes in-process and asserts status, shape, and side effects. Every bug you ship becomes two tests.',
              'We set up a test database, write the happy path and the failure path for each endpoint, and wire the suite into CI.',
            ],
            keyPoints: ['Test isolation and fixtures', 'Asserting status and body', 'Running in CI'],
          },
        ],
      },
    ],
  },

  {
    key: 'data-fetching-caching',
    title: 'Data Fetching and Caching',
    summary: 'The browser half of the network: fetch, async, caching layers, and React Query.',
    instructor: 'marcus-reid',
    category: 'data-apis',
    level: 'Beginner',
    price: 49,
    popular: false,
    studentCount: 38400,
    outcomes: [
      {icon: 'Search', title: 'Fetch done right', description: 'Responses, JSON, errors, and aborts.'},
      {icon: 'Zap', title: 'Async reasoning', description: 'Waterfall spotting and fixing.'},
      {icon: 'Layers', title: 'HTTP caching', description: 'Cache headers, ETags, and CDN behavior.'},
      {icon: 'CheckCircle', title: 'Client cache tools', description: 'React Query with stale-while-revalidate.'},
    ],
    modules: [
      {
        title: 'The Fetch Layer',
        summary: 'Plain browser APIs before any library.',
        lessons: [
          {
            key: 'df-fetch',
            title: 'The Fetch API in Depth',
            query: 'fetch API javascript tutorial',
            freePreview: true,
            notes: [
              'fetch resolves headers and body separately: first await the response, then await .json(). A 404 resolves just as happily as a 200 — checking response.ok is your job.',
              'We call an API with options, parse JSON, and handle every failure mode: network, status, and schema.',
            ],
            keyPoints: ['Two-stage await', 'response.ok is not thrown', 'Request options and headers'],
          },
          {
            key: 'df-async',
            title: 'Promises and async/await',
            query: 'async await javascript tutorial explained',
            notes: [
              'async/await is promises with nicer syntax — Promise.all still composes awaits in parallel, and try/catch catches what .catch() would have.',
              'We profile a page load with three sequential fetches and fix it into one parallel waterfall without losing error handling.',
            ],
            keyPoints: ['await is sequential by default', 'Promise.all for parallelism', 'try/catch with async'],
          },
          {
            key: 'df-errors',
            title: 'Errors, Retries, and Aborts',
            query: 'javascript fetch retry abort controller tutorial',
            notes: [
              'Real networks fail: time out with AbortController.signal, retry with exponential backoff and jitter, and surface errors users can act on.',
              'We build a fetchWithRetry helper and prove the cancellation path — navigate away, and the in-flight request dies instead of setting state on a dead component.',
            ],
            keyPoints: ['AbortController for timeouts', 'Backoff with jitter', 'Idempotency and retry safety'],
            proTip: 'Only retry GETs by default. A retry without an idempotency key is a duplicate order.',
          },
        ],
      },
      {
        title: 'Caching',
        summary: 'The layers between your API and the user’s screen.',
        lessons: [
          {
            key: 'df-cache',
            title: 'HTTP Caching: Headers, ETags, Staleness',
            query: 'HTTP caching explained cache-control headers',
            notes: [
              'Cache-Control decides who caches and for how long; ETags make revalidation cheap. The browser cache is the first CDN you already own — most apps never configure it.',
              'We inspect real response headers, force 304s, and debug the cache that "will not clear" — which is always a misread header.',
            ],
            keyPoints: ['max-age and s-maxage', 'Validation with ETags', 'Reading cache state in devtools'],
          },
          {
            key: 'df-cdn',
            title: 'CDNs and Cache Invalidation',
            query: 'CDN caching explained edge',
            notes: [
              'A CDN caches per edge location; purge APIs and versioned URLs are how you decide when those copies die. Cache keys determine what counts as the same resource.',
              'We walk through a deploy story: immutable hashed assets, an HTML page at short TTL, and why that pair almost never needs a manual purge.',
            ],
            keyPoints: ['Per-edge copies', 'Purge vs versioned URLs', 'Cache keys and variants'],
          },
          {
            key: 'df-react-query',
            title: 'React Query and Stale-While-Revalidate',
            query: 'React Query tutorial react-query',
            notes: [
              'TanStack Query owns server state: keys that dedupe requests, background refetch on focus, and a cache you invalidate by query key instead of refetching by hand.',
              'We convert a useEffect-fetching component to useQuery, add mutations with optimistic updates, and delete about half the state code.',
            ],
            keyPoints: ['Query keys as cache identity', 'staleTime vs gcTime', 'Mutations and invalidation'],
            resources: [{type: 'article', title: 'TanStack Query Docs', url: 'https://tanstack.com/query/latest', description: 'The reference for everything in this lesson.'}],
          },
        ],
      },
    ],
  },

  {
    key: 'git-github-developers',
    title: 'Git and GitHub for Developers',
    summary: 'Version control that makes sense: commits, branches, merges, pull requests, and CI.',
    instructor: 'diego-alvarez',
    category: 'developer-craft',
    level: 'Beginner',
    price: 0,
    popular: false,
    studentCount: 96100,
    outcomes: [
      {icon: 'Layers', title: 'Git’s object model', description: 'Snapshots, refs, and HEAD — so every command stops being magic.'},
      {icon: 'Zap', title: 'Branch and merge with intent', description: 'Workflows that keep history readable.'},
      {icon: 'Search', title: 'Conflicts without fear', description: 'Read, resolve, and continue.'},
      {icon: 'CheckCircle', title: 'GitHub teamwork', description: 'PRs, reviews, and GitHub Actions.'},
    ],
    modules: [
      {
        title: 'Git',
        summary: 'The model, everyday work, and the scary part: conflicts.',
        lessons: [
          {
            key: 'git-start',
            title: 'How Git Actually Works',
            query: 'git tutorial for beginners explained',
            freePreview: true,
            notes: [
              'Git stores snapshots and points at them: add stages a proposed commit, commit writes it, and a branch is just a movable pointer. That one sentence removes most Git mystery.',
              'We initialize a repo, watch the staging area change in git status, and inspect commit objects directly.',
            ],
            keyPoints: ['Working tree, index, HEAD', 'What a commit actually stores', 'git log as a map'],
          },
          {
            key: 'git-branch',
            title: 'Branching and Merging',
            query: 'git branching explained tutorial',
            notes: [
              'Branching is a bookmark on history; merging finds a common ancestor and combines the two sides. Fast-forwards and merge commits reflect the shape of the graph, not a preference.',
              'We build a feature branch, merge it back, and read the resulting graph in a visualizer until the commands feel like notes on a diagram.',
            ],
            keyPoints: ['Creating and switching branches', 'Merge vs rebase (honestly)', 'Reading the graph'],
            proTip: 'Rebase is for commits nobody else has; merge is for commits everybody has. That single rule prevents the incident everyone argues about.',
          },
          {
            key: 'git-merge',
            title: 'Resolving Merge Conflicts',
            query: 'git merge conflicts tutorial resolve',
            notes: [
              'A conflict is Git telling you two changes claim the same line — nothing more. Read the <<<< ==== >>>> markers, decide the final content, stage the file, and continue.',
              'We create conflicts on purpose, resolve them both by hand and with a tool, then run the one git bisect command that finds which commit broke the build.',
            ],
            keyPoints: ['Anatomy of conflict markers', 'Resolve, stage, continue', 'git bisect for regressions'],
            resources: [{type: 'article', title: 'Pro Git: Branching and Merging', url: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging', description: 'The classic chapter — free.'}],
          },
        ],
      },
      {
        title: 'On GitHub',
        summary: 'Pull requests, reviews, and pipelines.',
        lessons: [
          {
            key: 'gh-pr',
            title: 'Pull Requests and Code Review',
            query: 'GitHub pull request tutorial workflow',
            notes: [
              'A pull request is a review conversation attached to a diff: small scopes, a description that explains why, and responding to comments with fixes or reasons.',
              'We open a PR from a fork, request changes, push the round-two commits, and merge with squash so main’s history stays one line per feature.',
            ],
            keyPoints: ['Fork vs branch workflow', 'PRs that get reviewed fast', 'Squash vs merge strategy'],
          },
          {
            key: 'gh-actions',
            title: 'Continuous Integration with GitHub Actions',
            query: 'GitHub Actions CI tutorial',
            notes: [
              'Workflows are YAML in .github/workflows that run jobs on events — push and pull_request most of all. Tests, lint, and build on every PR makes "CI is red" the most honest status in the repo.',
              'We set up Node test and build jobs, add a matrix over versions, and cache dependencies without breaking the workflow.',
            ],
            keyPoints: ['Events, jobs, steps', 'Matrix and caching', 'Required status checks'],
          },
          {
            key: 'gh-releases',
            title: 'Releases, Tags, and the Git Flow of Real Teams',
            query: 'git tagging releases best practices',
            notes: [
              'Tags mark a point in history as a version; releases attach notes and artifacts to those points. Trunk-based teams ship from main with feature flags, and tag on deploy.',
              'We version a project with tags, create a GitHub release, and connect it to a deploy workflow that only runs on publish.',
            ],
            keyPoints: ['Annotated vs lightweight tags', 'Semver as a contract', 'Release-driven deploy'],
            proTip: 'The deploy workflow should consume the tag, not the branch. "main is deployed" is folklore; "v2.3.0 is deployed" is in the audit log.',
          },
        ],
      },
    ],
  },
]

// Search-scoped agent config (AGENTS.md §10) — carried into the seed so a
// reimport always leaves the Context MCP correctly scoped.
export const agentContext = {
  key: 'vertex-search',
  slug: 'vertex-search',
  instructions: [
    'Return every relevant match, ranked best first, with a count — never a cap of a few.',
    'Two result kinds: video moments (tie each to the lesson that uses that video) and lessons matched on topic.',
    'Match chapters first, transcript chunks only if no chapter fits. Fetch a few chunks per video, never the whole array.',
    'Wildcard text match on tokens; OR multiple keywords; match Portable Text via plain-text projection, never raw.',
    'Say only what the data returns: never invent a course, lesson, price, duration, or timestamp.',
  ].join('\n'),
  groqFilter: '_type in ["course", "lesson", "instructor", "category"]',
}
