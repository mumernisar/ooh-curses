import { useRouteError } from "react-router-dom";
import LinkButton from "../ui/LinkButton";
import NotFound from "./../components/NotFound";
function Error({ message }) {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      {message ? <h1>{message}</h1> : <NotFound message={message} />}

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
