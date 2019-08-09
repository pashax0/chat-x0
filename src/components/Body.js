import React, { lazy, Suspense } from 'react';
import Spinner from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../styles/body.css'
const Messages = lazy(() => import('./Messages'));

function Body(props) {
  const { msgs, scrollTop, scrolling } = props;
  return (
    <main>
      <Suspense fallback={<Spinner
        type="Triangle"
        color="#00BFFF"
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
