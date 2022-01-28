import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxODA1MiwiZXhwIjoxOTU4ODk0MDUyfQ.qDYaDWX59dsHnJLLgkELyQrRlO8SQ6UcUX75mrmcD_k";
const SUPABASE_URL = "https://urtpobduhofgubgntosa.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  // Sua lógica vai aqui
  // Usuário
  // Usuário digita no campo textarea
  // Aperta enter para enviar
  // Tem que adicionar o texto na listagem

  // Dev
  // [X] Campo criado
  // [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variável)
  // [X] Lista de mensagens

  // ./Sua lógica vai aqui

  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  // const url = fetch();

  React.useEffect(() => {
    supabaseClient
      .from("messages")
      .select("*")
      .order('id', { ascending: false })
      .then(({ data }) => {
        console.log("Dados da consulta", data);
        setMessageList(data);
      });
  }, []);

  function handleNewMessage(newMessage) {
    const message = {
      // Esta id está vindo automaticamente do supabase
      // id: messageList.length + 1,
      from: "alexandrejs777",
      text: newMessage,
    };

    supabaseClient
    .from("messages")
    .insert([
      // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu nu supabase
      message
    ])
    .then(({ data }) => {
      setMessageList([data[0], ...messageList]);
    });

  setMessage("");

  }

  

  function handleDeleteMessage(id) {
    const filteredMessageList = messageList.filter((filteredMessage) => {
      return filteredMessage.id != id;
    });
    setMessageList(filteredMessageList);
  }

  return (
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
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          {/* Usuário: {mensagem} */}
          <MessageList
            messages={messageList}
            handleDeleteMessage={handleDeleteMessage}
          />
          {/* {messageList.map((currentMessage) => {
              console.log(currentMessage);
              return (
                  <li key={currentMessage.id}>
                      {currentMessage.from}: {currentMessage.text}
                  </li>
              )
          })} */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              type="submit"
              label="Enviar"
              onClick={(event) => {
                event.preventDefault();
                handleNewMessage(message);
              }}
              styleSheet={{
                minHeight: "34px",
                padding: "12px 12px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[700],
                mainColorLight: appConfig.theme.colors.primary[900],
                mainColorStrong: appConfig.theme.colors.primary[800],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="dark"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log("MessageList", props);
  const handleDeleteMessage = props.handleDeleteMessage;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                {/* <a href={`https://api.github.com/users/${username}`}> */}
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/${message.from}.png`}
                />{/* </a> */}
                <Text tag="strong">{message.from}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleTimeString()} -{" "}
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Button
                type="submit"
                label="x"
                onClick={() => {
                  handleDeleteMessage(message.id);
                }}
                styleSheet={{
                  padding: "4px",
                  border: "none",
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.neutrals[700],
                  mainColorLight: appConfig.theme.colors.primary[700],
                  mainColorStrong: appConfig.theme.colors.primary[700],
                }}
              />
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
