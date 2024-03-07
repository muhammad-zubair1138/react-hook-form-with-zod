"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  console.log(email, password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError({ email: "", password: "" });

    if (!email.includes("@")) {
      setError({ ...errors, email: "Email must include @" });
      return;
    }

    if (password.length < 8) {
      setError({ ...errors, password: "Password must be at least 8 charters" });
      return;
    }

    console.log("Form Submitted", e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ m: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              value={email}
              placeholder="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <Typography
                color="red"
                variant="caption"
                display="block"
                gutterBottom
              >
                {errors.email}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              value={password}
              placeholder="Password"
              variant="outlined"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <Typography
                color="red"
                variant="caption"
                display="block"
                gutterBottom
              >
                {errors.password}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" sx={{ px: 3, py: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
