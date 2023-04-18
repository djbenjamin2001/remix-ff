import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
  
} from "@remix-run/react";

import MainNavigation from "~/components/MainNavigation"
import styles from '~/styles/main.css'
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation/>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/*export function ErrorBoundary({error}) {
  console.log(error)
  return (
    <html lang="dk">
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}*/
export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="dk">
      <head>
        <Meta />
        <Links />
        <title>{error.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{error.statusText}</h1>
          <p>
         {error.data?.message || "something went horribly wrong"}
          </p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
    );
  } else if (error instanceof Error) {
    return (
      <html lang="dk">
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
          <p>{error.message}</p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
export const links = () => [
  { rel: "stylesheet", href: styles },
];