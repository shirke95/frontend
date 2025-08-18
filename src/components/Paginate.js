import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1]?.split("&")[0] || "";
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          const path = !isAdmin ? "/" : "/admin/productlist";
          const search = `?keyword=${keyword}&page=${x + 1}`;

          return (
            <LinkContainer
              key={x + 1}
              to={{
                pathname: path,
                search: search, // ✅ query params go here
              }}
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
}

export default Paginate;
