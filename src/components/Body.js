import React, { lazy, Suspense } from 'react';
import Spinner from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../styles/body.css'
const Messages = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./Messages")), 2000);
  });
});


function Body(props) {
  const { wsStatus, msgs, scrollTop, scrolling } = props;
  return (
    <main>
      {(wsStatus !== 1006) ? 
        <Suspense fallback={<Spinner
          className="spiner"
          type="Triangle"
          color="#000"
        />}>
          <Messages
            // ws={ws}
            msgs={msgs}
            scrollTop={scrollTop}
            scrolling={scrolling}
          />
        </Suspense>
        : <div className="error">
          <p>Error with your connection!</p>
          <p>You can send message, but it will be send after reconnection</p>
        </div>
      }
    </main>
  )
}

export default Body;
