// import { Spinner } from "react-bootstrap";

// function Loader() {
//   return (
//     <Spinner
//       animation="border"
//       role="status"
//       style={{
//         width: "100px",
//         height: "100px",
//         margin: "auto",
//         display: "block",
//       }}
//     >
//       <span className="visually-hidden">Loading...</span>
//     </Spinner>
//   );
// }
// export default Loader;
import { Spinner } from "react-bootstrap";

/**
 * Loader Component
 *
 * Displays a centered loading spinner.
 * Props:
 * - size: number (default 80) → controls spinner size
 * - variant: string (default "primary") → spinner color
 */
function Loader({ size = 80, variant = "primary" }) {
  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <Spinner
        animation="border"
        role="status"
        variant={variant}
        style={{ width: size, height: size }}
        aria-label="Loading..."
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
