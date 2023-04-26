import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

function Mapbox() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 21.0244246,
    longitude: 105.7938072,
    zoom: 16,
  });

  return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxAccessToken="pk.eyJ1IjoibXlydGlsbGVraW0iLCJhIjoiY2xndnJjYm5xMXFsZTNybzI5eXgyd280ciJ9.mQz7qQClNeBa4Usx1oFGGw"
      />
  );
}

export default Mapbox;
