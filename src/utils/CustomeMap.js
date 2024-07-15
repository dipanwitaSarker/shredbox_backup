import React from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import markerIcon from 'assets/images/marker.png';
function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}
const Map = ({ lat, lng, lebel }) => {
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  let map;

  function initMap() {
    const mapOptions = {
      zoom: 8,
      center: lat ? new google.maps.LatLng(Number(lat), Number(lng)) : new google.maps.LatLng(33.247875, -83.441162)
    };

    const icon = {
      url: markerIcon, // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      // The below line is equivalent to writing:
      position: new google.maps.LatLng(Number(lat), Number(lng)),
      // position: { lat: Number(lat), lng: Number(lng) },
      icon: icon,
      map: map
    });
    // You can use a LatLng literal in place of a google.maps.LatLng object when
    // creating the Marker object. Once the Marker object is instantiated, its
    // position will be available as a google.maps.LatLng object. In this case,
    // we retrieve the marker's position using the
    // google.maps.LatLng.getPosition() method.
    const infowindow = new google.maps.InfoWindow({
      content: '<p>Machine Location : ' + lebel + '</p>'
    });

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.open(map, marker);
    });
  }
  useEffect(() => {
    setTimeout(function () {
      initMap();
    }, 1000);
  }, [initMap]);

  return (
    <section className="googleMapCustome">
      <div id="map"></div>
    </section>
  );
};

const CustomeMap = ({ machineLatLng }) => {
  const WrappedMap = useMemo(() => Map, []);
  return (
    <React.StrictMode>
      <WrappedMap lat={machineLatLng.lat} lng={machineLatLng.lng} lebel={machineLatLng.label} />
    </React.StrictMode>
  );
};

export default React.memo(CustomeMap);
