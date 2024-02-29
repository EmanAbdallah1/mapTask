// MapContainer.js

import React, { Component } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import "./Map.css";
import BranchesComponent from "../Branches/BranchesAddress";

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeComponent: null,
    activeMarker: {},
    selectedPlace: {},
    branchAddresses: [],
    //countries and its branches data
    markers: [
      {
        lat: 26.8206,
        lng: 30.802498,
        title: "Egypt",
        branches: [
          {
            lat: "30.118834",
            lng: "31.349545",
            address: "Heliopolis",
          },
          {
            lat: "30.020940",
            lng: "31.454569",
            address: "New Cairo",
          },
          {
            lat: "30.061838",
            lng: "31.323496",
            address: "Nasr city",
          },
        ],
      },
      {
        lat: 37.7749,
        lng: -122.4194,
        title: "USA",
        branches: [
          {
            lat: "40.697983",
            lng: "-73.776651",
            address: "New York #1",
          },
          {
            lat: "40.877862",
            lng: "-74.045816",
            address: "New York #2",
          },
        ],
      },
      {
        lat: 51.509865,
        lng: -0.118092,
        title: "London",
        branches: [
          {
            lat: "51.485820",
            lng: "-0.054975",
            address: "London #1",
          },
          {
            lat: "51.525800",
            lng: "-0.214637",
            address: "London #2",
          },
        ],
      },
    ],
  };

  // Handler for marker click event
  onMarkerClick = (props, marker, e) => {
    // Find the selected country based on the clicked marker
    const selectedCountry = this.state.markers.find(
      (m) => m.title === props.name
    );

    // Create markers for the selected country and its branches
    const countryMarkers = [
      {
        lat: selectedCountry.lat,
        lng: selectedCountry.lng,
        title: selectedCountry.title,
        component: <div>{selectedCountry.title}</div>,
      },
    ];

    const branchMarkers = (selectedCountry.branches || []).map((branch) => ({
      lat: parseFloat(branch.lat),
      lng: parseFloat(branch.lng),
      title: branch.address,
      component: <div>{branch.address}</div>,
    }));

    // Extract branch addresses for display in BranchesComponent
    const branchAddresses = (selectedCountry.branches || []).map(
      (branch) => branch.address
    );

    // Update the state with selected place and markers
    this.setState((prevState) => ({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      markers: [...prevState.markers, ...countryMarkers, ...branchMarkers],
      branchAddresses: branchAddresses,
    }));
  };

  // Render the component
  render() {
    return (
      <div className="map-container">
        <h3 className="branches-title">Branches</h3>
        {/* Google Map component */}
        <Map
          className="map"
          initialCenter={{
            lat: 26.8206,
            lng: 30.802498,
          }}
          style={{
            width: "100%",
            height: "300px",
          }}
          google={this.props.google}
          zoom={2}
          onClick={this.onMapClicked}
        >
          {/* Render markers on the map */}
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              onClick={(props, m) => {
                this.onMarkerClick(props, m);
                this.setState({ activeComponent: marker.component });
              }}
              position={{ lat: marker.lat, lng: marker.lng }}
              name={marker.title}
            />
          ))}
          {/* Display additional information in an InfoWindow */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            {this.state.activeComponent}
          </InfoWindow>
        </Map>
        {/* Display branch addresses in BranchesComponent */}
        <BranchesComponent branchAddresses={this.state.branchAddresses} />
      </div>
    );
  }
}

// Wrap the component with GoogleApiWrapper and provide the API key
export default GoogleApiWrapper({
  apiKey: "AIzaSyDVcMmZ7QC4CvSgO72giQGQzqydEJIFlAY",
})(MapContainer);
