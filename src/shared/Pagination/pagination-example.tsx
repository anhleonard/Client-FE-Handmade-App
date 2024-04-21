"use client";
import * as React from "react";
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { COLORS } from "@/enum/colors";

function Content() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  return (
    <Pagination
      page={page}
      count={100}
      defaultPage={1}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/search${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
      sx={{
        "& .Mui-selected": {
          backgroundColor: `${COLORS.primary.c800} !important`,
          color: `${COLORS.white} !important`,
          "&:hover": {
            backgroundColor: `${COLORS.primary.c800} !important`,
            color: `${COLORS.white} !important`,
          },
        },
        "& .MuiPaginationItem-root": {
          width: 40,
          height: 40,
          borderRadius: "50%",
          margin: "6px",
          fontWeight: 500,
          color: COLORS.grey.c900,
          "&:hover": {
            backgroundColor: COLORS.grey.c100,
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    />
  );
}

export default function PaginationExample() {
  return (
    <MemoryRouter initialEntries={["/search"]} initialIndex={0}>
      <Routes>
        <Route path="*" element={<Content />} />
      </Routes>
    </MemoryRouter>
  );
}
