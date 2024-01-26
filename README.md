# Optimize HTTP Server

This project implements a simple HTTP server with the ability to respond to GET requests on the `/data` endpoint. It fulfills the following requirements:

## Implementation Requirements

- Set up an HTTP server in a language/framework of your choice.
- Respond to incoming GET requests on the endpoint `/data`.
- Accept two query parameters, `n` for the file name and `m` for the line number.
- Return the content of the file `/tmp/data/n.txt` at line number `m` if both `n` and `m` are provided.
- Return the entire contents of file `/tmp/data/n.txt` if only `n` is provided.
- Each file is around 100MB in size, and there are more than 30 different files (`1.txt`, `2.txt`, ..., `n.txt`).

## Sample Input and Output

- **Request:** `/data?n=1&m=30`
  - **Response:** `vyAF9kLDTIbqkv5R7hFqGDXaxezu3WMV5pcPd6RdudWMqMGJBQ9YLOoCQt`

- **Request:** `/data?n=1`
  - **Response:** (entire contents of `1.txt`)

## Runtime Requirements

- Bundle everything inside a Docker image (`Dockerfile` provided).
- Docker image should be compatible with ARM and x86 architectures.
- Expose port `8080`.
- Allocate a maximum of 1500 MB RAM and 2000m/2 Core CPU to the Docker container.

## Usage

1. Clone the repository:

   ```bash
   git clone <repository_url>
