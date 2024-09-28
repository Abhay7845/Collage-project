import React, { useState, useEffect } from "react";
import Footer from "../HomePage/Footer";
import Pagination from "./Pagination";
import AppLoader from "../Common/AppLoader";
import axios from "axios";
import VideoLoader from "../Common/VideoLoader";

const Products = () => {
  const [videosList, setVideosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPerPage, setShowPerPage] = useState(8);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPagination = (startValue, endValue) => {
    setPagination({ start: startValue, end: endValue });
  };
  console.log("videosList==>", videosList);
  const GetVideosList = () => {
    axios
      .get(
        "https://ai-server-c9ws.onrender.com/api/user/get/uploded/public/video"
      )
      .then((res) => res)
      .then((response) => setVideosList(response.data.data))
      .catch((error) => {});
  };
  useEffect(() => {
    GetVideosList();
  }, [setShowPerPage]);

  return (
    <div>
      {videosList.length > 0 ? (
        <div className="container">
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center my-3">
            <h3 className="fw-bold text-info">Our Products</h3>
            <p className="fs-5">
              Quickly build an effective pricing table for your potential
              customers with this Bootstrap example. It’s built with default
              Bootstrap components and utilities with little customization.
            </p>
          </div>
          <div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
              {videosList
                .slice(pagination.start, pagination.end)
                .map((item, i) => {
                  const { description, videoUrl, id } = item;
                  return (
                    <div key={i}>
                      <h6 className="card-title my-2">
                        {id}.{" "}
                        {description.charAt(0).toUpperCase() +
                          description.slice(1)}
                      </h6>
                      <div style={{ position: "relative" }}>
                        {loading === true && <VideoLoader />}
                        <video
                          className="w-100"
                          controls
                          autoPlay="off"
                          onWaiting={() => setLoading(true)}
                          onCanPlay={() => setLoading(false)}
                          onPlaying={() => setLoading(false)}
                        >
                          <source src={videoUrl} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  );
                })}
            </div>
            <Pagination
              showPerPage={showPerPage}
              onPagination={onPagination}
              setShowPerPage
            />
          </div>
        </div>
      ) : (
        <AppLoader />
      )}
      {videosList.length > 0 && <Footer />}
    </div>
  );
};

export default Products;
