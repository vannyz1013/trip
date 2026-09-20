# Trip — personal travel planner

Built app only. The source is private.

Live: https://vannyz1013.github.io/trip/

## What this is

A personal trip planner for Malaysia (Kuala Lumpur first): plan the days, then know exactly
where to go — saved places, an itinerary, rail routing over open GTFS data, a Tomorrow Card,
a trip rail map, and an assistant that answers from your own trip data.

## Privacy

Opening the link gives you an empty planner, not anyone else's trip, and there is no analytics
or tracking of any kind.

**Without an account** — the default — everything you enter stays in your own browser, in
IndexedDB on your device, and none of it is sent anywhere.

**With an account**, which is optional, your trips, saved places, itinerary items and
preferences are stored in this project's Supabase database so they reach your other devices.
Each account can only read and write its own rows. Signing in for the first time asks before
copying anything already on the device, so local trips are never uploaded without your say-so,
and the planner keeps working offline either way.

The assistant runs with **no AI model configured**. It answers common questions from code, using
your trip, the open rail data and the sources you save — and says so plainly. It makes no network
requests.

## Data and attribution

Place data is a checked-in snapshot from OpenStreetMap and Wikidata. Map tiles come from
OpenFreeMap / OpenMapTiles, rendered with MapLibre GL JS. Rail data comes from data.gov.my GTFS
feeds. Attribution is shown in the app.

Route and schedule information is a planning aid, not a live service. Always check live service
information before travelling.
