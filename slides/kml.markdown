### KML

KML is an open XML format for representing geographic information, like markers, polygons, polylines and overlays.

Lots of organizations publish interesting information in KML format. It's also a useful way to store and distribute information to other people.

Many applications (including Google Earth) can display KML files.

The code on the left is a simple KML document, with a single point.

### Code
<?xml version='1.0' encoding='UTF-8'?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
  <name>Simple Document</name>
  <Placemark>
     <name>A point</name>
     <Point>
       <coordinates>-90.86948943473118,48.25450093195546,0</coordinates>
     </Point>
  </Placemark>
</Document>
</kml>
