import React, { useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact, { InfoWindow } from "google-map-react";
import Button from "../standard/Button.jsx";
import { GOOGLE_MAPS_API_KEY } from "../../../../config.js";
import RedMarker from "../../../images/icons/redMarker.png";


const ChildComponent = (props) => {
  return props.children;
};

export const Marker = (props) => {
  const { lat, lng, name, onClick } = props;

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <div className="relative">
      {isPopUpOpen && (
        <div
          className="absolute -left-10 bottom-5 bg-white rounded cursor-pointer"
          style={{ minWidth: "100px" }}
        >
          <div
            onClick={() => setIsPopUpOpen(false)}
            className="absolute top-0 right-0 p-2"
          >
            X
          </div>
          <div className="p-2 flex flex-col gap-2">
            <div className="text-cardHeading">{name}</div>
            <Button label="View Details" onClick={onClick} />
          </div>
          <div class="absolute -bottom-6 left-6 right-6 w-12 overflow-hidden inline-block">
            <div class="h-6 w-6 bg-white -rotate-45 transform origin-top-left"></div>
          </div>
        </div>
      )}

      {/* <div
        className="absolute h-10 w-10 -top-5 -left-5 rounded-full bg-primary-50 flex justify-center items-center"
        onClick={() => setIsPopUpOpen(true)}
      >
        <div className="h-4 w-4 rounded-full bg-primary" />
      </div> */}

      <img
        src={RedMarker}
        alt=""
        style={{ width: "35px", height: "35px" }}
        onClick={() => setIsPopUpOpen(true)}
      />

    </div>
  );
};

const Map = (props) => {
  const { width, height, center, defaultZoom, children } = props;

  console.log(center);

  const fitMapwithBounds = (map, maps) => {
    var bounds = new maps.LatLngBounds();

    React.Children.forEach(children, (child) => {
      bounds.extend(new maps.LatLng(child.props.lat, child.props.lng));
    });

    map.fitBounds(bounds);
  };

  const onGoogleApiLoaded = (map, maps) => {
    fitMapwithBounds(map, maps);
  };

  return (
    <div style={{ height, width }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals={true}
        // onGoogleApiLoaded={({map, maps}) => onGoogleApiLoaded(map, maps)}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 26.8467,
    lng: 80.9462,
  },
  defaultZoom: 17,
  height: 300,
  width: "100%",
  children: () => null,
};

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  deafultZoom: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};

export default Map;
