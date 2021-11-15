import React from "react";
import { MapContainer, Popup, TileLayer, Marker, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

export default class FoodMap extends React.Component {
    constructor () {
        super()
        this.state = {
            locations: [],
        }
    }

    componentDidMount() {
        fetch('/foodloc.json').then(r => r.json()).then(data => {
            this.setState({
                locations: data
            })
        })
    }

    render() {
        const atlPosition = [33.749, -84.388]

        let markers = this.state.locations.map((l, idx) => {
            // console.log(l)
            return (
                <Marker position={[l.lat, l.lon]} key={idx}>
                    <Popup>
                        <b>{l.name}</b><br/>
                        {l.address}
                    </Popup>
                </Marker>
            )
        })

        return (
            <MapContainer center={atlPosition} zoom={12} scrollWheelZoom={true}
                style={{height: '100%'}}>
                <TileLayer 
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </MapContainer>
        )
    }
}