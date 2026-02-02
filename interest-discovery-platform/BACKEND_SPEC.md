# Backend Specification: AI Content Curation Microservice

> **Status**: Design Phase
> **Target Stack**: Python 3.11+, LangGraph, LangChain, FastAPI, Gemini 1.5 Pro

## 1. Overview
This microservice is responsible for the autonomous discovery, curation, and validation of educational content. It replaces the simulated `CurationAgent` in the frontend with a robust, server-side agentic workflow.

## 2. Architecture

### 2.1 Service Boundaries
- **Frontend (React)**: Consumes content via REST API.
- **Content Service (Python)**:
    - **API Layer**: FastAPI for managing requests.
    - **Agent Core**: LangGraph state machine for orchestration.
    - **Vector Store**: ChromaDB / Pinecone for caching retrieved knowledge.
    - **LLM Provider**: Google Vertex AI (Gemini 1.5 Pro).

### 2.2 LangGraph Workflow Design
The agent is modeled as a State Graph with the following nodes:

```mermaid
graph TD
    Start([Request: "Space"]) --> Retrieve
    Retrieve[Retrieval Node] -->|Docs Found| Filter[Filter Node]
    Filter -->|Valid Sources| Synthesize[Synthesis Node]
    Synthesize -->|Draft Content| Validate[Safety/Validation Node]
    
    Validate -->|Pass 0.95+| Publish[Publish Node]
    Validate -->|Fail| Refine[Refine Search]
    Refine --> Retrieve
    
    Publish --> End([JSON Response])
```

#### Node Details:
1.  **Retrieval Node**:
    - **Tool**: Google Search API (Custom Search JSON API).
    - **Constraint**: Strict domain allowlist (NASA, Smithsonian, NatGeo, etc.).
    - **Output**: Raw text chunks + metadata.

2.  **Filter Node**:
    - **Logic**: Remove content that is too complex (PhD level), commercial (ads), or irrelevant.
    - **Model**: Gemini 1.5 Flash (for speed).

3.  **Synthesis Node**:
    - **Prompt**: "Summarize for Grade 6 reading level. Extract 3 key bullet points and 1 fun fact."
    - **Model**: Gemini 1.5 Pro (for reasoning).

4.  **Validation Node (Red Team)**:
    - **Role**: The "Critic" agent.
    - **Checks**: Safety violations, hallucination checks (cross-reference with source), complexity score.

## 3. API Contract

### `GET /api/v1/content/{interest_id}`
Returns curated content for a specific interest.

**Response:**
```json
{
  "summary": "Space is...",
  "key_points": ["Point 1", "Point 2"],
  "fun_fact": "...",
  "metadata": {
    "last_updated": "2024-05-20",
    "sources": ["nasa.gov/mars", "esa.int/kids"],
    "trust_score": 0.98,
    "execution_log": [
      {"step": "retrieval", "status": "success", "details": "Found 5 docs"}
    ]
  }
}
```

## 4. Source Allowlist Policy
To ensure **Sanctity of Content**, the Retrieval Node must ONLY index:

| Category | Allowed Domains |
| :--- | :--- |
| **Space** | `nasa.gov`, `esa.int`, `space.com/science` |
| **Nature** | `nationalgeographic.com`, `wwf.org`, `biography.com` |
| **History** | `si.edu` (Smithsonian), `history.com/topics`, `britannica.com` |
| **Science** | `science.org`, `nature.com`, `nsf.gov` |

## 5. Deployment
- **Container**: Docker
- **Orchestration**: Kubernetes (K8s) or Cloud Run
- **Auth**: Service-to-Service authentication (JWT)
