import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from 'nprogress';
import {Helmet} from "react-helmet";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    NProgress.start()
    window.scrollTo(0, 0);
    NProgress.done()
  }, [pathname]);

  return (<>
          {(pathname.startsWith("/book/")) ? (<Helmet>
                <meta property="og:description" content="An amazing photograph!"/>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={`https://cdn.nyde.online/${pathname.split("/")[2]}`}/>
                                              <Helmet/>) : (<Helmet>
                <meta property="og:description" content="Hello! I'm Nyde. I would like to introduce myself to you. You can know me on my website 😊."/>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="/image/banner/Nyde_7.png"/>
                                              <Helmet/>)}
         </>);
}
