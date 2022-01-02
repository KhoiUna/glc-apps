import Router from "next/router";
import Layout from "../containers/layout";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "../lib/useAuth";
import { useState } from "react";

export default function Login() {
  useAuth({ redirectIfFound: true });

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target }) =>
    setUser((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((r) => r.json())
        .then((r) => Router.push("/"));
    } catch (err) {
      console.error("Error logging in user");
    }
  };

  return (
    <Layout componentName="Login">
      <form
        onSubmit={handleSubmit}
        style={{ margin: "2rem auto", textAlign: "center", maxWidth: 500 }}
        onChange={handleChange}
      >
        <Typography variant="h4">Login</Typography>

        <Stack sx={{ margin: "1rem 2rem" }}>
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="filled"
            required
            value={user.username}
          />
        </Stack>
        <Stack sx={{ margin: "1rem 2rem" }}>
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="filled"
            required
            value={user.password}
            type="password"
          />
        </Stack>

        <Button variant="contained" type="submit" sx={{ margin: "0.5rem" }}>
          Login
        </Button>
      </form>
    </Layout>
  );
}
