"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export function EmailReactHookFormWithZodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com",
      password: "12345678",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", { message: "This email has already been" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ m: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("email")}
              type="text"
              placeholder="Email"
              variant="outlined"
              fullWidth
            />
            {errors.email && (
              <Typography
                color="red"
                variant="caption"
                display="block"
                gutterBottom
              >
                {errors.email.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("password")}
              type="password"
              placeholder="Password"
              variant="outlined"
              fullWidth
            />
            {errors.password && (
              <Typography
                color="red"
                variant="caption"
                display="block"
                gutterBottom
              >
                {errors.password.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              sx={{ px: 3, py: 2, mb: 2 }}
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
            {errors.root && (
              <Typography
                color="red"
                variant="caption"
                display="block"
                gutterBottom
              >
                {errors.root.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
