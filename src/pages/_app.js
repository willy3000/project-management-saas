import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";
import { fetchUser } from "../slices/user";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {

  let persistor = persistStore(store)

  const theme = createTheme({
    palette: {
      primary: {
        main: "#89043d",
      },
      secondary: {
        main: "#FFCA55",
      },
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={ persistor}>
        <Component {...pageProps} />
          </PersistGate>
      </Provider>
      <ToastContainer />
    </ThemeProvider>
  );
}
