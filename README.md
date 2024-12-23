# AI-Powered Visual Web Scraper Builder

This Full Stack SaaS application allows users to visually build, manage, and schedule web scrapers using a workflow builder powered by AI. Users can create, modify, and delete workflows with an intuitive drag-and-drop interface. The integration of AI simplifies the web scraping process, making it accessible to both technical and non-technical users.

## Features

### 🌟 Key Features

-   **Visual Workflow Builder**: Drag-and-drop interface to design scraping workflows effortlessly.
-   **AI Assistance**: AI-powered suggestions for selectors, workflow optimization, and error handling.
-   **Credential Management**: Securely manage login credentials for scraping protected websites.
-   **Scheduling System**: Set up automatic scraping schedules for periodic data extraction.
-   **Workflow Management**: Create, modify, delete, and duplicate workflows with ease.
-   **Data Export**: Export scraped data in various formats (e.g., CSV, JSON).

### ⚡ Built with Next.js

-   **Server-Side Rendering (SSR)** for optimized SEO and performance.
-   **API Routes** to handle backend logic.
-   **Dynamic Routing** for user-specific workflows.
-   **Built-in Authentication** using Clerk Authentication for secure user sessions.

---

### Prerequisites

-   **Node.js** (v16 or later)
-   **PostgreSQL** database
-   API Key for OpenAI

### Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/BernieTv/Workflows-App.git
    cd Workflows-App
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:

    ```env
    NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
    DATABASE_URL=postgresql://username:password@localhost:5432/yourdb
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_secret
    CLERK_SECRET_KEY=sk_
    ```

4. **Run database migrations**

    ```bash
    npx prisma migrate dev
    ```

5. **Start the development server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

---

## Usage

### 1. **Sign Up/Log In**

-   Use Clerk Authentication to sign up or log in to your account.

### 2. **Create a Workflow**

-   Drag and drop nodes to define scraping tasks.
-   Use AI suggestions for selector optimization.

### 3. **Set Credentials**

-   Securely store website login credentials if required.

### 4. **Schedule Scraping**

-   Use the scheduling feature to automate scraping tasks.

### 5. **Export Data**

-   Download scraped data in the desired format.

---

## Development

### Scripts

-   **Start development server**: `npm run dev`
-   **Build for production**: `npm run build`
-   **Run production server**: `npm start`

### Linting and Formatting

-   **Lint code**: `npm run lint`
-   **Format code**: `npm run format`
