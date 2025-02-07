import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
   
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};


export default Login;
