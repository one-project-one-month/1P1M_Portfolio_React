// import React from "react";
// // import "../../../styles/NotFound.css"

// const Notfound = () => {
//   return (
//     <div>
//       <a href="https://codepen.io/uiswarup/pen/qBebRpq" target="_blank">
//         <header class="top-header"></header>

//         <div>
//           <div class="starsec"></div>
//           <div class="starthird"></div>
//           <div class="starfourth"></div>
//           <div class="starfifth"></div>
//         </div>

//         <div class="lamp__wrap">
//           <div class="lamp">
//             <div class="cable"></div>
//             <div class="cover"></div>
//             <div class="in-cover">
//               <div class="bulb"></div>
//             </div>
//             <div class="light"></div>
//           </div>
//         </div>
//         <section class="error">
//           <div class="error__content">
//             <div class="error__message message">
//               <h1 class="message__title">Page Not Found</h1>
//               <p class="message__text">
//                 We're sorry, the page you were looking for isn't found here. The
//                 link you followed may either be broken or no longer exists.
//                 Please try again, or take a look at our.
//               </p>
//             </div>
//             <div class="error__nav e-nav">
//               <a
//                 href="https://codepen.io/uiswarup/pen/qBebRpq"
//                 target="_blanck"
//                 class="e-nav__link"
//               ></a>
//             </div>
//           </div>
//         </section>
//       </a>
//     </div>
//   );
// };

// export default Notfound;

import React from "react";
// import "../../../styles/NotFound.css"

const Notfound = () => {
  return (
    <div>
      {/* Outer link kept if needed */}
      <a
        href="https://codepen.io/uiswarup/pen/qBebRpq"
        target="_blank"
        rel="noopener noreferrer"
      >
        <header className="top-header"></header>

        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>

        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>

        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <p className="message__text">
                We're sorry, the page you were looking for isn't found here. The
                link you followed may either be broken or no longer exists.
                Please try again, or take a look at our.
              </p>
            </div>
            <div className="error__nav e-nav">
              {/* Changed inner <a> to a span to avoid nested <a> */}
              <span className="e-nav__link">Go to CodePen</span>
            </div>
          </div>
        </section>
      </a>
    </div>
  );
};

export default Notfound;
