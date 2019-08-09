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
  const { msgs, scrollTop, scrolling } = props;
  return (
    <main>
      <Suspense fallback={<Spinner
        className="spiner"
        type="Triangle"
        color="#000"
      />}>
        <Messages
          msgs={msgs}
          scrollTop={scrollTop}
          scrolling={scrolling}
        />
      </Suspense>
    </main>
  )
}

export default Body;
