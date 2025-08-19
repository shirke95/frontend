// import React from "react";

// function Rating({ value, text, color }) {
//   return (
//     <div className="rating">
//       <span>
//         <i
//           style={{ color: "#f8e825"  }}
//           className={
//             value >= 1
//               ? "fas fa-star"
//               : value >= 0.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>

//       <span>
//         <i
//           style={{ color: "#f8e825" }}
//           className={
//             value >= 2
//               ? "fas fa-star"
//               : value >= 1.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>

//       <span>
//         <i
//           style={{ color: "#f8e825" }}
//           className={
//             value >= 3
//               ? "fas fa-star"
//               : value >= 2.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>

//       <span>
//         <i
//           style={{ color: "#f8e825" }}
//           className={
//             value >= 4
//               ? "fas fa-star"
//               : value >= 3.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>

//       <span>
//         <i
//           style={{ color: "#f8e825" }}
//           className={
//             value >= 5
//               ? "fas fa-star"
//               : value >= 4.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>
//       <span>{text && text}</span>
//     </div>
//   );
// }

// export default Rating;

import PropTypes from "prop-types";

/**
 * Rating Component
 *
 * Displays star ratings dynamically.
 *
 * Props:
 * - value: number → rating value (0 to 5)
 * - text: string → optional text to display next to stars
 * - color: string → optional color of stars (default: "#f8e825")
 */
function Rating({ value, text, color = "#f8e825" }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          <i
            style={{ color }}
            className={
              value >= star
                ? "fas fa-star"
                : value >= star - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      {text && <span className="ms-2">{text}</span>}
    </div>
  );
}

// Prop type checking
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
