import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { shortstay } from "../../config";
import SingleList from "./SingleList";
import ListFilter from "./ListFilter";
import Pagination from "./Pagination";
import MapView from "./map/MapView2";
import styled from "styled-components";

const List = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  ///// 숙소유형 /////
  const [placeOpen, setPlaceOpen] = useState(false);
  const [place, setPlaceType] = useState([]);
  const [place_query, setPlaceQuery] = useState("");

  ///// 요금 /////
  const [priceOpen, setPriceOpen] = useState(false);
  const [price, setPrice] = useState([]);
  const [price_query, setPriceQuery] = useState("");

  ///// 필터추가 /////
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filters_query, setFiltersQuery] = useState("");

  const [property_type, setPropertyType] = useState([]);
  const [property_query, setPropertyQuery] = useState("");

  const [language, setLanguage] = useState([]);
  const [language_query, setLanguageQuery] = useState("");

  /////////////////////// fetch data  //////////////////////
  //     //`${shortstay}/room/list?location=서울&${place_query}`,
  //component did update `${shortstay}/room/list${this.props.location.search}&${place_query}&${amenities_query}&${property_query}&${language_query}`

  // useEffect(() => {
  //   fetch(
  //      `${shortstay}/room/list${props.location.search}`,
  //
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     // .then((res) => console.log(res.rooms));
  //     .then((res) => {
  //       setData(res.rooms);
  //     });
  // }, []);

  useEffect(() => {
    fetch("/data/data_seoul.json")
      .then((res) => res.json())
      // .then((res) => console.log(res));
      .then((res) => {
        setData(res.rooms);
      });
  }, []);

  // pagination
  const limit = 10;
  const [offset, setOffset] = useState(0);

  const prevPage = () => {
    const prevOffset = offset - limit;

    if (offset >= limit) {
      fetch(
        // `${api}/room/list${this.props.location.search}&${place_query}&${amenities_query}&${property_query}&${language_query}&limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.rooms);
        });
      setOffset(prevOffset);
    }
  };

  const nextPage = () => {
    const nextOffset = limit + offset;

    fetch(
      //   `${api}/room/list${this.props.location.search}&${place_query}&${amenities_query}&${property_query}&${language_query}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.rooms);
      });
    setOffset(nextOffset);
  };

  // useEffect(() => {
  //   console.log(amenities);
  // }, [amenities]);

  // const submitForm = (e) => {
  //   e.preventDefault();

  //   // update fetch?
  // };

  ///// 숙소유형 /////

  // toggle dropdown
  const TogglePlace = () => {
    setPlaceOpen(!placeOpen);
  };

  // save user selection
  const savePlaceType = (e) => {
    const { value } = e.target;
    let selected = [...place];
    if (selected.includes(value)) {
      selected = selected.filter((s) => s !== value);
    } else {
      selected = [...selected, value];
    }
    setPlaceType(selected);
  };

  const submitPlace = () => {
    const query = place.map((item) => {
      return `place_type=${item}`;
    });
    const placeQuery = query.join("&");
    setPlaceQuery(placeQuery);
  };

  ///// 요금 /////

  // toggle dropdown
  const TogglePrice = () => {
    setPriceOpen(!priceOpen);
  };

  ///// 편의시설 /////

  const ToggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const saveFilterType = (e) => {
    const { value } = e.target;
    let selected = [...filters];
    if (selected.includes(value)) {
      selected = selected.filter((s) => s !== value);
    } else {
      selected = [...selected, value];
    }
    setFilters(selected);
  };

  ///// 건물유형 /////

  const savePropertyType = (e) => {
    const { value } = e.target;
    let selected = [...property_type];
    if (selected.includes(value)) {
      selected = selected.filter((s) => s !== value);
    } else {
      selected = [...selected, value];
    }
    setPropertyType(selected);
  };

  ///// 호스트 언어 /////

  const saveLanguage = (e) => {
    const { value } = e.target;
    let selected = [...language];
    if (selected.includes(value)) {
      selected = selected.filter((s) => s !== value);
    } else {
      selected = [...selected, value];
    }
    setLanguage(selected);
  };

  // submit form
  const submitFilter = (e) => {
    e.preventDefault();
    const filtersQuery = filters.map((item) => {
      return `amenities=${item}`;
    });
    const filtersQueryString = filtersQuery.join("&");
    setFiltersQuery(filtersQueryString);

    const propertyQuery = property_type.map((item) => {
      return `property_type=${item}`;
    });
    const propertyQueryString = propertyQuery.join("&");
    setPropertyQuery(propertyQueryString);

    const languageQuery = language.map((item) => {
      return `language=${item}`;
    });
    const languageQueryString = languageQuery.join("&");
    setLanguageQuery(languageQueryString);

    setFilterOpen(false);
  };

  console.log(filters_query);
  console.log(property_query);
  console.log(language_query);

  const clearPlace = (e) => {
    e.preventDefault();
    setPlaceType([]);
  };

  const goToDetail = () => {
    // const queryProductId = this.props.productID
    //console.log("query Product ID:", queryProductID)
    //this.props.history.push(`detail/${queryProductID}`)
    history.push("/reservation");
  };

  return (
    <Container>
      <ListWrapper>
        <header>
          <p>300개 이상의 숙소 · 12월 3일 - 12월 5일 · 게스트 2명</p>
          <h1>제주도의 숙소</h1>
        </header>
        <ListFilter
          rooms={data}
          placeOpen={placeOpen}
          TogglePlace={TogglePlace}
          savePlaceType={savePlaceType}
          submitPlace={submitPlace}
          priceOpen={priceOpen}
          TogglePrice={TogglePrice}
          filterOpen={filterOpen}
          ToggleFilter={ToggleFilter}
          saveFilterType={saveFilterType}
          submitFilter={submitFilter}
          savePropertyType={savePropertyType}
          saveLanguage={saveLanguage}
          handleClearPlace={clearPlace}
        />
        <Listings>
          <Alert>
            <div>
              <img
                src="https://a0.muscache.com/airbnb/static/packages/icon-uc-alarm.e0a2b02f.gif"
                alt=""
              />
            </div>
            <p>
              예약에 앞서 여행 제한 사항을 확인하세요.에어비앤비 커뮤니티의
              건강과 안전이 최우선입니다. 정부 지침을 준수하고 꼭 필요한
              경우에만 여행하실 것을 부탁드립니다.자세히 알아보기
            </p>
          </Alert>
          {/* <Link to={"./detail/${}"}> */}
          <SingleList rooms={data} goToDetail={goToDetail} />
          <Pagination prevPage={prevPage} nextPage={nextPage} />
        </Listings>
      </ListWrapper>
      <MapWrapper>
        <MapView rooms={data} />
      </MapWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
`;

const ListWrapper = styled.div`
  width: 840px;
  height: 100vh;
  overflow: scroll;
  padding: 2em;
  z-index: 1;

  header {
    color: ${(props) => props.theme.color.black};
    z-index: 1;

    p {
      font-size: 0.875em;
    }

    h1 {
      font-size: 2em;
      margin: 0.25em 0;
    }
  }
`;

const Listings = styled.div`
  height: 600px;
  z-index: -1;
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;

  div {
    width: 40;
    height: 40;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    font-size: 0.875em;
    color: ${(props) => props.theme.color.black};
    line-height: 1.125rem;
    padding: 0 1.5em;
  }
`;

const MapWrapper = styled.div`
  width: calc(100vw - 840px);
  height: 100vh;
  background-color: gainsboro;
  z-index: 0;
`;

export default List;
