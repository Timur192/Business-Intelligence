import { useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { GitHubIcon, GoogleIcon } from "../../components/ButtonIcon";
import { Link } from "react-router-dom";
import Registration from "./Registration";
import useToasts from "../../hooks/useToast";
import useAuthentication from "../../hooks/useAuthentication";

function RegistrationView() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { ShowToast } = useToasts();
  const { serviceLogin } = useAuthentication();
  const handleClick = () => setShow(!show);

  const RegistrationNewUser = (): void => {
    Registration({ email, password })
      .then(() => ShowToast({ status: "success" }))
      .catch((error) => ShowToast({ status: "error", error: error }));
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Registration</h1>
        <div className="input">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="input">
          <InputGroup size="md">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
        <div className="groupBTN">
          <Button onClick={RegistrationNewUser} width="300px" colorScheme="blue">
            Registration
          </Button>
          <Button
            leftIcon={<GoogleIcon />}
            colorScheme="blue"
            variant="outline"
            onClick={() => serviceLogin("googleProvider")}
          >
            Google
          </Button>
          <Button
            leftIcon={<GitHubIcon />}
            colorScheme="blue"
            variant="outline"
            onClick={() => serviceLogin("githubProvider")}
          >
            GitHub
          </Button>
        </div>
        <div className="link">
          Already have an account? 
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default RegistrationView;
