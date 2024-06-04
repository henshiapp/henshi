<div align="center">
    <a alt="Henshi logo" href="https://henshi.neumanf.com" target="_blank" rel="noreferrer">
        <img src="docs/assets/images/logo.svg" width="400">
    </a>
    <p>Building better memory, one click at a time.</p>
</div>

## About

Henshi is a webapp based on microservices architecture, it uses Vue.js as its primary frontend framework and Nest.js on the backend.

## Features

- [PostgreSQL](https://postgresql.org) as its SQL database
- [Redis](https://redis.io) as cache and key-value database
- [Nginx](https://nginx.org) as a reverse proxy
- [gRPC](https://grpc.io) as an synchronous method of communication between the services (🚧 **In progress**)
- [RabbitMQ](https://rabbitmq.com) as an asynchronous method of communication between the services (🚧 **In progress**)
- [Docker](https://docker.com) as its container management tool 
- [Kubernetes](https://kubernetes.io) as its container orchestration tool (🚧 **In progress**)
- [Github Actions](https://github.com/features/actions) as its CI/CD platform (🚧 **In progress**)

## Architecture

```mermaid
flowchart LR
%% Styles
    classDef app fill:#f7e081,stroke:#333,stroke-width:1px

%% Entities
    FE(fa:fa-twitter Frontend)
    LB(Reverse proxy)
    A(Auth API)
    U(Users API)
    U-P[(PostgreSQL)]
    N(Notification API)
    MMB(MMB API)
    MMB-P[(PostgreSQL)]
    MMB-R[(Redis)]
    RMQ(RabbitMQ)

%% Flow
    FE -->|HTTP| LB
    LB --->|HTTP| AS & US & MMBS
    AS <-.->|gRPC| US & MMBS
    US <-.->|gRPC| MMBS
    subgraph Backend
        RMQ <-.->|AMQP| AS
        subgraph AS [Auth service]
            direction LR
            A
        end
        subgraph US [Users service]
            direction LR
            U --> U-P
        end
        subgraph MMBS [Muscular Memory Builder service]
            direction LR
            MMB --> MMB-P
            MMB --> MMB-R
        end
    end
```

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md).
