import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function App() {
  const classes = useStyles();
  const [sexo, setsexo] = useState("");
  const [nascimento, setnascimento] = useState("");
  const [estado, setestado] = useState("");
  const [fone, setfone] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Quer ser avisado quando for a hora de vacinar? Nós te lembramos!
          Coloque abaixo suas informações e aguarde nosso SMS.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Data de nascimento"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Telefone celular"
          />
          <InputLabel id="label">Estado</InputLabel>
          <Select labelId="label" id="select" value="20">
            <MenuItem value="SP">SP</MenuItem>
            <MenuItem value="RJ">RJ</MenuItem>
            <MenuItem value="MG">MG</MenuItem>
          </Select>
          <FormControl>
            <FormLabel>Sexo</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={sexo}
              onChange={(e) => setsexo(e.target.value)}
            >
              <FormControlLabel
                value="M"
                control={<Radio />}
                label="Masculino"
              />
              <FormControlLabel
                value="F"
                control={<Radio />}
                label="Feminino"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          Fique tranquilo, pois não iremos compartilhar seus dados;
          <br />
          Após o final da campanha de vacinação, todos os dados serão excluídos;¼
        </Typography>{" "}
      </Box>
    </Container>
  );
}

export default App;
