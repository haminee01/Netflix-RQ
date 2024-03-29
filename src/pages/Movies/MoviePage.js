import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");
  const pageRange = window.innerWidth < 768 ? 2 : 7;

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  console.log("ddd", data);

  if (isLoading) {
    return (
      <div className="spinner">
        <ClipLoader color="#ffff" loading={isLoading} size={150} />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className="dropdown-area">
          <div>
            <DropdownButton id="dropdown-basic-button" title="Sort">
              <Dropdown.Item>Popularity</Dropdown.Item>
              <Dropdown.Item>Rating</Dropdown.Item>
              <Dropdown.Item>Latest</Dropdown.Item>
            </DropdownButton>
          </div>
          <div>
            <DropdownButton id="dropdown-basic-button" title="Genre">
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Adventure</Dropdown.Item>
              <Dropdown.Item>Animation</Dropdown.Item>
              <Dropdown.Item>Comedy</Dropdown.Item>
              <Dropdown.Item>Crime</Dropdown.Item>
              <Dropdown.Item>Documentary</Dropdown.Item>
              <Dropdown.Item>Drama</Dropdown.Item>
              <Dropdown.Item>Family</Dropdown.Item>
              <Dropdown.Item>Fantasy</Dropdown.Item>
              <Dropdown.Item>History</Dropdown.Item>
              <Dropdown.Item>Horror</Dropdown.Item>
              <Dropdown.Item>Music</Dropdown.Item>
              <Dropdown.Item>Mystery</Dropdown.Item>
              <Dropdown.Item>Science Fiction</Dropdown.Item>
              <Dropdown.Item>TV Movie</Dropdown.Item>
              <Dropdown.Item>Thriller</Dropdown.Item>
              <Dropdown.Item>War</Dropdown.Item>
              <Dropdown.Item>Western</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12} className="card-area">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={pageRange}
            marginPagesDisplayed={1}
            pageCount={data?.total_pages} //전체페이지
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1} //현재페이지
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
