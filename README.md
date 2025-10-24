# Campaign Play Processor

The entire stack is containerized using Docker and can be run with a single command.

## Tech Stack

- **Framework**: Next.js (with React)
- **Language**: TypeScript
- **Database / Caching**: Redis (via Upstash in production)
- **Deployment**: Fly.io
- **Containerization**: Docker & Docker Compose

---

### Prerequisites

- **For Docker Setup (Recommended)**:
  - [Docker]

- **For Manual Setup**:
  - [Node.js] (v18 or later)
  - A running [Redis] instance. If on windows this instance must be ran through docker.

### Running with Docker (Recommended)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/christen2512/CampaignPlayProcessor.git
    cd campaignplayprocessor
    ```

2.  **Start the application stack:**
    ```bash
    docker-compose up --build
    ```
    Running the app through docker ensures all dependencies and processes are setup correctly.

3.  **Access the application:**
    Once the build is complete and the containers are running, open your web browser and navigate to:
    [http://localhost:3000]

### Running Manually

1.  **Clone the repository and install dependencies:**
    ```bash
    git clone https://github.com/christen2512/CampaignPlayProcessor.git
    cd campaignplayprocessor
    npm install
    ```

2.  **Configure Environment Variables:**
    No env variables need to be set as redis uses the default 6379 port if in development, otherwise uses the Upstash URL.

3.  **Start the services (each in a separate terminal):**
    -   **Terminal 1/Docker: Start Redis** 
    -   **Terminal 2: Start the Next.js Development Server:**
        ```bash
        npm run dev
        ```
    -   **Terminal 3: Start the Background Worker:**
        ```bash
        npx ts-node src/worker.ts
        ```

4.  **Access the application:**
    Open your web browser and navigate to [http://localhost:3000].

---

## Application Usage

Once the application is running you can interact with the dashboard:

-   **Simulate Event**: Clicking this button generates a single random event from a predefined list of campaigns and screens. This event is sent to the backend, processed by the worker, and the stats on the dashboard will update every 1.5 seconds.
-   **Load Bulk Events**: This button sends a predefined batch of 15 mock events to the backend at once allowing you to quickly populate the dashboard with initial data.
-   **View Campaign Breakdown**: Click on any campaign row in the main table to see a detailed breakdown of impressions per screen for that specific campaign.
