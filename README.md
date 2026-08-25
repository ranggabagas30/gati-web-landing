
  # GATI Website Landing Page

  This is a code bundle for GATI Website Landing Page. The original project is available at https://www.figma.com/design/tai0EnSVMtozMoDTQeOmYB/GATI-Website-Landing-Page.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server (http://localhost:5173).

  ## Stopping the dev server / checking a port

  Find what's listening on a specific port (e.g. the Vite dev server on 5173):

  ```bash
  lsof -nP -iTCP:5173 -sTCP:LISTEN
  ```

  See all listening ports:

  ```bash
  lsof -nP -iTCP -sTCP:LISTEN
  ```

  Stop it once you have the PID:

  ```bash
  kill <PID>          # graceful (SIGTERM) — try this first
  kill -9 <PID>       # force (SIGKILL) — only if it won't die
  ```

  Kill by name without looking up the PID:

  ```bash
  pkill -f vite
  ```

  One-liner to kill whatever is on a port directly:

  ```bash
  lsof -ti tcp:5173 | xargs kill
  ```
  