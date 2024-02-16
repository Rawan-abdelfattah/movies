import React from "react";

export default function Mediaitem({ item }) {
  return (
    <>
      {/* img-thumbnail */}
      <div className="col-md-3   card card-bg shadow gy-4 ">
        {item.poster_path ? 
          <img
            className="  w-100 rounded"
            src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
            alt="Card image cap"
          />
        : 
          <img
            className="  w-100 rounded"
            src={"https://image.tmdb.org/t/p/w500" + item.profile_path}
            alt="Card image cap"
          />
        }
        <h5 className="text-white mt-4 text-center">
          {item.title} {item.name}
        </h5>

        {/* <div className="card text-center card-bg shadow w-100"  >
  <div className="card-body">
  </div>
</div> */}
      </div>
    </>
  );
}
