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
  const { isActiveWindow, wsStatus, from, ws, msgs, scrollTop, scrolling, addToMsg } = props;
  return (
    <main>
      {(wsStatus === 1) ? 
        <Suspense fallback={<Spinner
          className="spiner"
          type="Triangle"
          color="#000"
        />}>
          <Messages
            isActiveWindow={isActiveWindow}
            wsStatus={wsStatus}
            ws={ws}
            from={from}
            msgs={msgs}
            scrollTop={scrollTop}
            scrolling={scrolling}
            addToMsg={addToMsg}
          />
        </Suspense>
        : <div className="error">
          <p>Error with connection!</p>
        </div>
      }
    </main>
  )
}

export default Body;
