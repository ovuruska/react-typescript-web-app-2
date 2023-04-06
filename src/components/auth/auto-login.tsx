import React, {useState, useEffect} from 'react';
import {HttpClientSymbol} from "@domain/types/TYPES";
import {HttpClient} from "@quicker/common/http-client";
import {useInjection} from "inversify-react";
import SpinnerOverlay from "@components/loading/spinner-overlay";

interface AutoLoginProps {
  children: React.ReactNode
}

const AutoLogin = ({children}: AutoLoginProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const client = useInjection<HttpClient>(HttpClientSymbol);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    client.login().then(() => {

    });
    client.verify().then(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    });
  }, []);


  if (isLoading || !isLoggedIn) {
    return <SpinnerOverlay/>;
  } else {
    return <>
      {children}
    </>
  }
};

export default AutoLogin;
