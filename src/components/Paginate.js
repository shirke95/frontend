// import { Pagination } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// function Paginate({ pages, page, keyword = "", isAdmin = false }) {
//   if (keyword) {
//     keyword = keyword.split("?keyword=")[1]?.split("&")[0] || "";
//   }

//   return (
//     pages > 1 && (
//       <Pagination>
//         {[...Array(pages).keys()].map((x) => {
//           const path = !isAdmin ? "/" : "/admin/productlist";
//           const search = `?keyword=${keyword}&page=${x + 1}`;

//           return (
//             <LinkContainer
//               key={x + 1}
//               to={{
//                 pathname: path,
//                 search: search, // ✅ query params go here
//               }}
//             >
//               <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
//             </LinkContainer>
//           );
//         })}
//       </Pagination>
//     )
//   );
// }

// export default Paginate;

// import { Pagination } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// /**
//  * Paginate Component
//  *
//  * Displays pagination links for product listing pages.
//  *
//  * Props:
//  * - pages: number → total number of pages
//  * - page: number → current active page
//  * - keyword: string → search keyword for filtering (optional)
//  * - isAdmin: boolean → whether admin view (changes path)
//  */
// function Paginate({ pages, page, keyword = "", isAdmin = false }) {
//   if (pages <= 1) return null; // No pagination needed for 1 or 0 pages

//   // Clean keyword for query params
//   const cleanKeyword = keyword.split("?keyword=")[1]?.split("&")[0] || "";

//   // Base path depending on admin or user
//   const basePath = isAdmin ? "/admin/productlist" : "/";

//   return (
//     <Pagination className="justify-content-center my-3">
//       {[...Array(pages).keys()].map((x) => (
//         <LinkContainer
//           key={x + 1}
//           to={{
//             pathname: basePath,
//             search: `?keyword=${cleanKeyword}&page=${x + 1}`,
//           }}
//         >
//           <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
//         </LinkContainer>
//       ))}
//     </Pagination>
//   );
// }

// export default Paginate;
// {/* <Paginate pages={10} page={3} keyword="iphone" />
// <Paginate pages={5} page={2} isAdmin={true} /> */}

import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/**
 * Paginate Component
 *
 * Displays pagination links for product listing pages.
 *
 * Props:
 * - pages: number → total number of pages
 * - page: number → current active page
 * - keyword: string → search keyword for filtering (optional)
 * - isAdmin: boolean → whether admin view (changes path)
 */
function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  if (pages <= 1) return null; // No pagination needed for 1 or 0 pages

  // Extract keyword safely
  const cleanKeyword = keyword.split("?keyword=")[1]?.split("&")[0] || "";

  // Base path depending on admin or user
  const basePath = isAdmin ? "/admin/productlist" : "/";

  return (
    <Pagination className="justify-content-center my-3">
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={{
            pathname: basePath,
            search: `?keyword=${cleanKeyword}&page=${x + 1}`,
          }}
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
}

export default Paginate;
