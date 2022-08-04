import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { CountryData, MapData } from "./@types";
import Modal from "react-modal";

const Map = () => {
  const [data, setData] = useState<MapData[]>();
  const [countryData, setCountryData] = useState<CountryData[]>();
  const [showDetailsData, setShowDetailsData] = useState<string[]>();
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://peaceful-inlet-29134.herokuapp.com/https://s3.ap-south-1.amazonaws.com/hire.isimplexity/data.js"
      );
      const body: MapData[] = await res.json();
      setData(body);
      const countryData = await fetch(
        "https://peaceful-inlet-29134.herokuapp.com/https://jsonkeeper.com/b/9VFW"
      );
      const result: CountryData[] = await countryData.json();
      setCountryData(result);
    }
    fetchData();
  }, []);
  if (!data || !countryData) return <></>;
  return (
    <div>
      <ComposableMap>
        <Geographies geography={"./worldmap.json"}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} stroke="#fff" />
            ))
          }
        </Geographies>
        {data.map(({ id, region, data }) => (
          <Marker
            key={id}
            coordinates={[
              countryData.find((country) => country.alpha2 === region)
                ?.longitude || 0,
              countryData.find((country) => country.alpha2 === region)
                ?.latitude || 0,
            ]}
          >
            <circle
              r={data / 100}
              fill="blue"
              stroke="#000"
              opacity={"50%"}
              strokeWidth={1}
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() =>
                setShowDetailsData(
                  [countryData.find((country) => country.alpha2 === region)
                    ?.country || "", data.toString()]
                )
              }
            />
          </Marker>
        ))}
      </ComposableMap>
      <Modal isOpen={isOpen} style={customStyles}>
        {showDetailsData?.map((data) => <h3>{data}</h3>)}
        <button onClick={() => setIsOpen(!isOpen)}>Close</button>
      </Modal>
    </div>
  );
};

export default Map;
