import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ajax } from "rxjs/ajax";

import { analytics } from "./index";

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
  const [submited, setsubmited] = useState<boolean>(false);
  const [enviado, setenviado] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sexo || !nascimento || !estado || !fone) return;

    const _fone = fone.replace(/\D+/g, "");
    const [dia, mes, ano] = nascimento.split("/");
    setsubmited(true);

    ajax({
      url: `https://minha-vacina.herokuapp.com/DiaDaVacina`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        telefone: Number(_fone),
        estado,
        DataNascimento: `${ano}-${mes}-${dia}`,
        sexo,
      },
    }).subscribe((n) => setenviado(true));

    console.log("passou aq");
    analytics.logEvent("enviou_dados");
  };

  useEffect(() => {
    analytics.logEvent("entrou_no_site");
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      {submited && (
        <Backdrop open={submited}>
          {enviado ? (
            <Dialog open>
              <DialogTitle>
                Deu tudo certo! agora só fechar esta página e aguardar o grande
                dia ;)
              </DialogTitle>
            </Dialog>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Backdrop>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Quer saber quando for a sua vez de ser vacinado contra Covid-19? Nós
          te avisamos! Coloque abaixo suas informações e aguarde nosso SMS.
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Data de nascimento"
            autoFocus
            // placeholder="DD/MM/AAAA"
            // type="date"
            inputProps={{ maxLength: 8 }}
            value={nascimento}
            onChange={(e) => {
              setnascimento(
                e.target.value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
              );
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputProps={{ maxLength: 11 }}
            label="Telefone celular com DDD"
            placeholder="(12) 93456-7890"
            // type="number"
            value={fone}
            // type="tel"
            onChange={(e) => {
              setfone(
                e.target.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
              );
            }}
            

            // return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
          />
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <InputLabel id="label">Estado</InputLabel>
              <Select
                labelId="label"
                id="select"
                value={estado}
                onChange={(e) => setestado(e.target.value as string)}
              >
                <MenuItem value="SP">SP</MenuItem>
                <MenuItem value="RJ">RJ</MenuItem>
                <MenuItem value="MG">MG</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <FormLabel>Sexo</FormLabel>
              <RadioGroup
                aria-label="sexo"
                name="sexo"
                value={sexo}
                defaultValue=""
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
            </Grid>
          </Grid>

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
          Após o final da campanha de vacinação, todos os dados serão excluídos;
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
