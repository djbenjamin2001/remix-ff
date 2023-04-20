import { Link } from "@remix-run/react";


export const meta = () => {
  return [{ title: "New Remix App" }];
};
import homeStyles from "~/styles/home.css"
export default function Index() {
  return (
  <main id="content">
<h1>en bedre måde at holde styr på dine noter</h1>
<p id="cta">
  <Link to="/notes">Try now!</Link>
</p>
  </main>
  );
}

export const links = () => [
  { rel: "stylesheet", href: homeStyles },
];