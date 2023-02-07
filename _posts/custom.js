


// Initialize the map
var center = [38.9926, -76.8398];

var map = L.map('map', {
                                    center: center,
                                            zoom: 3,
                                            minZoom: 2
                                                });

// load a tile layer
//basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//basemap = L.tileLayer('https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
basemap = L.esri.basemapLayer('Gray', {
                                          attribution: '<a href="https://leafletjs.com/">Leaflet</a> | Powered by <a href="https://www.esri.com/en-us/home">Esri</a>',
                                          //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                          maxZoom: 17,
                                          minZoom: 2
                                          })
// Add basemap
basemap.addTo(map)
L.esri.basemapLayer('GrayLabels', {
                                    maxZoom: 17,
                                    minZoom: 3
                                    }).addTo(map);

var wmsLayer = L.tileLayer.wms('https://ds.nccs.nasa.gov/thredds2/wms/GMAO/GEOS-CF/forecast/Y2021/M05/D25/H12/GEOS-CF.v01.fcst.chm_tavg_1hr_g1440x721_v1.20210525_12z+20210530_1030z.nc4?SERVICE=WMS&REQUEST=GetMap',{//+
                               //'&LAYERS=AOD550_DST5&STYLES=boxfill/occam&FORMAT=image/png&TRANSPARENT=true&VERSION=1.1.1&FORMAT_OPTIONS=dpi:180&MAXRESOLUTION=auto&TIME=2021-05-30T10:30:00.000Z&COLORSCALERANGE=2.8260917E-8,0.20507814&NUMCOLORBANDS=254&LOGSCALE=false&WIDTH=512&HEIGHT=512&SRS=EPSG:3857&BBOX=-5009377.085697311,0,0,5009377.085697314',{
    layers: 'NO2',
    opacity: 0.5
    })
//wmsLayer.addTo(map);

// Set bounds
map.setMaxBounds([[-90, -180],[90, 180]]);

var newMarker = {}

// Add click functionality
map.on('click', function(ev){
                        // Check to see it an old marker exists, if so, remove it.
                        if (newMarker != undefined) {
                                        map.removeLayer(newMarker);
                        }

                        // Get lat lon variables to 3 decimal places
                        var lat = ev.latlng.lat.toFixed(2)
                        var lng = ev.latlng.lng.toFixed(2)

                        if (lng < -180) {
                                    lng = parseFloat(lng)
                                    lng += 360
                                    lng = String(lng)
                        }

                        if (lng > 180) {
                                        lng -= 360
                        }

                        // Add a new marker
                        newMarker = L.marker(ev.latlng).addTo(map)
            var popupContent = '<form action="/cf_map/gram/" id="popup-form" method="POST">'
                                + '<p>Coordinates: <br>Latitude: '+lat+'<br>Longitude: '+lng+'</p>'
                                + '<input type="hidden" id="lat" name="lat" value="'+lat+'" />'
                                + '<input type="hidden" id="lon" name="lon" value="'+lng+'" />'
                                + '<input type="hidden" id="product" name="product" value="no2" />'
                                + '<input type="hidden" id="plot_type" name="plot_type" value="surf_plot" />'
                                + '<input type="submit" value="Get Forecast Data" onclick="showLoader();">'
                                + '</form>'
                                + '<form action="/cf_map/hist/" method="POST">'
                                + '<input type="hidden" id="lat" name="lat" value="'+lat+'" />'
                                + '<input type="hidden" id="lon" name="lon" value="'+lng+'" />'
                                + '<input type="hidden" id="product" name="product" value="no2" />'
                                + '<input type="hidden" id="num_days" name="num_days" value="30"/>'
                                + '<br><input type="submit" value="Get Historical Data" onclick="showLoader();">'
                                + '</form>';

                        newMarker.bindPopup(popupContent).openPopup();
});

map.attributionControl.setPrefix('');


// Add data

var dataLayer = L.leafletGeotiff(url="/wxmaps/static/plots/cf_map_grams/no2_20230206_1230.tif",{renderer: new L.LeafletGeotiff.Plotty({displayMin: 0, displayMax: 10, domain: [0, 10], colorScale: 'viridis'})});


dataLayer.addTo(map);
dataLayer.setOpacity(0.5);

// Add colorbar
// Tryiing to place an img on top of the map div

L.Control.Watermark = L.Control.extend({
onAdd: function(map) {
var img = L.DomUtil.create('img');

img.src = '/wxmaps/static/plots/cf_map_grams/map_bars/cbar_no2_viridis.png';
img.style.width = '30em';
img.style.height = '6em';

return img;
},

onRemove: function(map) {
// Nothing to do here
}
});

L.control.watermark = function(opts) {
return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomleft' }).addTo(map);

function station_select(val, name){
        var lat = parseFloat(val.split(',')[0]);
        var lon = parseFloat(val.split(',')[1]);
        
        if (name == 'national_dd'){
                        $('#world_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#aero_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#mc_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#ac_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        yesnoCheck('None');
        }

        if (name == 'world_dd'){
                        $('#national_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#aero_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#mc_stations option').prop('selected', function() {
                        return this.defaultSelected;
                        });
                        $('#ac_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        yesnoCheck('None');
        }

        if (name == 'aero_dd'){
        $('#national_stations option').prop('selected', function() {
                return this.defaultSelected;
                });
        $('#world_stations option').prop('selected', function() {
                return this.defaultSelected;
                });
        $('#mc_stations option').prop('selected', function() {
                return this.defaultSelected;
                });
        $('#ac_stations option').prop('selected', function() {
                        return this.defaultSelected;
                        });
        }
        if (name == 'mc_dd'){
                        $('#national_stations option').prop('selected', function() {
                return this.defaultSelected;
                });
                        $('#world_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#aero_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#ac_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        yesnoCheck('None');
        }

        if (name == 'ac_dd'){
                        $('#national_stations option').prop('selected', function() {
                return this.defaultSelected;
                });
                        $('#world_stations option').prop('selected', function() {
                                        return this.defaultSelected;
                                        });
                        $('#aero_stations option').prop('selected', function() {
                return this.defaultSelected;
                });
                        $('#mc_stations option').prop('selected', function() {
                return this.defaultSelected;
                });
        }

        var latlngPoint = new L.LatLng(lat, lon)
        map.fireEvent('click', {
                                        latlng: latlngPoint,
                                        layerPoint: map.latLngToLayerPoint(latlngPoint),
                            containerPoint: map.latLngToContainerPoint(latlngPoint)
                                        });
        map.setView(latlngPoint, 9);
                                        };
