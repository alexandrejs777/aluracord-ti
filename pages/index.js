import appConfig from "../config.json";
import { Box, Button, Text, Image, TextField } from "@skynexui/components";
import React from "react";
import { useRouter } from 'next/router';

// Componente React

function Title(props) {
  console.log(props);
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>

      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals["000"]};
            font-size: 24px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}

// Component React
/* function HomePage() {
  // JSX
  return (
    <div>
      <GlobalStyle />
      <Title tag="h2">Boas vindas de volta!</Title>
      <h2>Discord - Alura Matrix</h2>
    </div>
  );
}

export default HomePage; */

export default function PaginaInicial() {
  // const username = "alexandrejs777";
  const [username, setUsername] = React.useState('alexandrejs777');
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[700],
          backgroundImage:
            "url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/futuristic-office-1024x576.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={event => {
              event.preventDefault();
              roteamento.push('/chat');
              console.log("Alguém submeteu o form");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input 
              type="text"
              value={username}
              onChange={function (event){
                console.log('Usuário digitou', event.target.value);
                // Onde está o valor?
                const valor = event.target.value;
                // Trocar o valor da variável através do React e avisa quem precisa
                setUsername(valor);
              }}
            /> */}
            <TextField
            value={username}
            onChange={function (event){
              // Onde está o valor?
              const valor = event.target.value;
              // Trocar o valor da variável através do React e avisa quem precisa
              setUsername(valor);
            }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[800],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[700],
                mainColorLight: appConfig.theme.colors.primary[900],
                mainColorStrong: appConfig.theme.colors.primary[800],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "10%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
