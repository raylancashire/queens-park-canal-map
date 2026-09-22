# Queen's Park Canal Water Quality Map

Interactive water-quality monitoring map for the **Greener Canalside / FreshWater Watch project** on the Grand Union Canal.

The map is designed to be hosted using **GitHub Pages** and embedded into a **Webador** website. Water-quality data is loaded from a CSV file, so new sampling results can be published without rebuilding the map.

---

## Project files

The GitHub repository contains:

- `index.html` — the interactive Leaflet map
- `analysis.html` — sample analysis, participation analysis and water-pollution incident register
- `freshwater.csv` — the water-quality sampling data
- `water-pollution-incidents.csv` — optional/fallback incident-register data
- `README.md` — project documentation

Repository:

`RayLancashire/queens-park-canal-map`

GitHub Pages address:

`https://raylancashire.github.io/queens-park-canal-map/`

---

## Map features

The map displays sampling locations from the CSV using the latitude and longitude fields.

Current features include:

- Interactive sampling-location markers
- Automatic grouping of repeated samples by sampling site
- Latest sample date and time
- Nitrate result
- Phosphate result
- Turbidity result
- Nutrient-level interpretation
- Turbidity clarity description where available
- Previous samples listed in each popup
- Number of samples shown in the popup history
- Assessment symbols shown alongside historical results
- UK date format
- AM / PM time display
- Site-selection dropdown
- Reset map button
- Automatic zoom to all sampling results
- Light, Street and Satellite basemap options
- Responsive layout for desktop, tablet and mobile
- Summary panels showing:
  - Sampling sites
  - Samples in dataset
  - Latest sample

---

## Map text

Current project description:

> Greener Canalside / FreshWater Watch project and citizen-science results from the Grand Union Canal.

Suggested Webador page introduction:

> Latest water quality testing results from Urbanwise London’s Greener Canalside Project, collected as part of the Greener Canalside / FreshWater Watch citizen-science programme.

---

## CSV data

The map reads:

`freshwater.csv`

The CSV can be replaced whenever new FreshWater Watch results are available.

The map has been designed to recognise both original FreshWater Watch field names and simplified field names.

### Main fields used by the map

| Information | Recognised field examples |
|---|---|
| Sampling site | `Site Name`, `site_name` |
| Sample date | `Sample Date`, `sample_date` |
| Sample time | `Sample Time`, `sample_time` |
| Nitrate | `Nitrate (mg/L)`, `chemical_nitrate` |
| Phosphate | `Phosphate (mg/L)`, `chemical_phosphate` |
| Nitrate midpoint | `nitrate_mid` |
| Phosphate midpoint | `phosphate_mid` |
| Turbidity | `Water quality - Secchi Tube (Turbidity)` |
| Latitude | `y`, `Latitude`, `latitude` |
| Longitude | `x`, `Longitude`, `longitude` |
| Notes | `notes`, `Notes` |

The turbidity reader also looks for column names containing the words **Secchi Tube** or **Turbidity**, making the import more tolerant of small changes in FreshWater Watch exports.

---

## Updating the water-quality data

To publish new sampling results:

1. Prepare the latest FreshWater Watch CSV.
2. Keep the filename as:

   `freshwater.csv`

3. Open the GitHub repository.
4. Replace the existing `freshwater.csv`.
5. Commit the change.
6. Wait for GitHub Pages to refresh.
7. Refresh the live map or Webador page.

The HTML normally does not need to be edited when new records are added.

---

## Updating the map

If `index.html` is changed:

1. Open `index.html` in the GitHub repository.
2. Click the edit icon.
3. Replace or amend the HTML.
4. Click **Commit changes**.
5. Wait for GitHub Pages to rebuild.
6. Refresh the live page.

On a Mac, a forced browser refresh can be performed using:

`Command + Shift + R`

---

## Sampling-site grouping

Samples are grouped by **site name**.

This means that repeat visits to the same sampling location appear as one map marker with a history of previous samples inside the popup.

For example:

- Ladbroke Grove Bridge
- Meanwhile Gardens
- Half Penny Steps Group

Each popup displays the latest reading first, followed by previous samples.

---

## Popup layout

Each sampling popup includes:

1. Sampling-site name
2. Latest sample date and actual sample time
3. Water-quality assessment
4. Nitrate
5. Phosphate
6. Turbidity
7. Previous samples

The previous-sample table includes:

- Date and time
- Assessment symbol
- Nitrate
- Phosphate
- Turbidity

If turbidity was not recorded, the map displays:

`Not taken`

---

## Accessibility

The map has been designed so that water-quality status is not communicated by colour alone.

Assessment categories use a combination of:

- Text
- Colour
- Shape

Current symbols:

| Assessment | Symbol |
|---|---|
| Excellent | Dark green circle |
| Good | Emerald diamond |
| Fair | Yellow triangle |
| Poor | Red square |
| Not yet assessed | Grey circle |

The legend uses the same symbols and colours as the map and popup.

Other accessibility measures include:

- Clear written assessment labels
- High-contrast popup text
- Larger popup text
- Table headings
- Screen-reader labels for assessment symbols
- Responsive mobile layout

---

## Water-quality interpretation

Nitrate and phosphate results are displayed with a plain-language interpretation such as:

- Good
- Moderate
- Poor

The assessment is calculated automatically from the midpoint values supplied in the CSV.

Turbidity is displayed separately as a clarity result. Where appropriate, a descriptive label such as **Very clear** is shown.

---

## Map types

Visitors can switch between:

- **Light** — clean map designed to make sampling markers stand out
- **Street** — OpenStreetMap
- **Satellite** — aerial imagery

The Light map is used as the default view.

---

## Reset map

The reset button returns the map to a view containing all current sampling results.

The reset view is calculated from the sampling-point coordinates in the CSV rather than from a fixed location.

This means the reset function will continue to work if new sampling sites are added later.

---

## Webador embedding

Example Webador embed code:

```html
<div class="canal-map-embed">
  <iframe
    src="https://raylancashire.github.io/queens-park-canal-map/"
    title="Queen's Park Canal Water Quality Monitoring Map"
    loading="lazy">
  </iframe>
</div>

<style>
.canal-map-embed {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.canal-map-embed iframe {
  display: block;
  width: 100%;
  height: 950px;
  border: 0;
  border-radius: 8px;
}

@media (max-width: 900px) {
  .canal-map-embed iframe {
    height: 1000px;
  }
}

@media (max-width: 600px) {
  .canal-map-embed iframe {
    height: 1200px;
    border-radius: 0;
  }
}
</style>
```

The iframe height may need small adjustments depending on the Webador page layout and screen size.

---

## Technology

The map uses:

- HTML
- CSS
- JavaScript
- Leaflet
- OpenStreetMap
- CARTO basemap tiles
- Esri satellite imagery
- GitHub Pages
- Webador

---

## Data source

Water-quality results are collected through the **Greener Canalside / FreshWater Watch citizen-science project**.

The map is intended to provide an accessible public view of sampling results over time and should be read as citizen-science monitoring data rather than as a statutory water-quality classification.

---

## Maintenance

For routine updates, only `freshwater.csv` should normally need replacing.

If the FreshWater Watch export format changes substantially, the field-name mappings in `index.html` may need to be updated.


---

## Update — 15 September 2026

A new **Water pollution incidents** register has been added to `analysis.html` so pollution incidents, suspected pollution and environmental events can be recorded separately from routine FreshWater Watch sample results.

### Water pollution incident register

Current features include:

- A dedicated collapsible **Water pollution incidents** section.
- Summary cards showing:
  - incidents in view
  - locations affected
  - open / unresolved incidents
- Filtering by incident classification.
- A public incident table showing:
  - date
  - location
  - classification
  - pollution / event type
  - severity and official category
  - status
  - extent
  - wildlife impact
  - description
- Wider presentation of the **Type** field to improve readability.
- Support for optional latitude and longitude fields in incident records.
- A separate Supabase table, `water_pollution_incidents`, for the live incident register.
- A CSV fallback using `water-pollution-incidents.csv` where the Supabase incident table is not available.

### Incident administration

Incident editing is restricted to an authenticated administrator account. Public visitors can view the incident register but cannot change it.

When signed in, the administrator can:

- **Add incident** manually.
- **Edit** an existing incident.
- **Delete** an incident.
- **Import CSV** for batch entry.
- **Set / change password** and sign out.
- Cancel a new entry or edit without saving.
- Automatically close the incident form after saving, cancelling or deleting.

The expanded incident form supports:

- Date
- Location
- Latitude
- Longitude
- Classification
- Pollution / event type
- Severity
- Official category / classification
- Suspected source
- Extent
- Description
- Response / action taken
- Wildlife impact
- Wildlife impact details
- Organisations involved
- Source
- Reported to
- Reference
- Status
- Resolved date
- Notes

The wording allows uncertain information to be recorded appropriately, for example by describing a source as **suspected** or **believed** rather than confirmed.

### Batch CSV import

The signed-in **Import CSV** panel now includes a **Download CSV template** button.

The template is generated directly by `analysis.html`, helping to keep the batch-import format aligned with the current incident form. It includes the current incident fields plus a guidance row showing expected formats and examples.

The batch-import workflow is:

1. Sign in as an authorised administrator.
2. Select **Import CSV**.
3. Select **Download CSV template**.
4. Add one incident per row.
5. Choose the completed CSV.
6. Review the validation / preview results.
7. Import the valid incident records into Supabase.

Records are checked before import, including required fields and duplicate handling.

### Initial historic incident

The register has been tested with the **29 February 2024 Grand Union Canal cooking-oil pollution incident**, recorded as a pollution incident affecting the canal from Alperton towards Little Venice / Paddington Basin. The incident record demonstrates the use of the expanded fields for official category, suspected source, extent, response, wildlife impact and organisations involved.

### Authentication improvements

The incident administration interface now uses the existing Supabase authenticated account rather than relying on a separate magic-link workflow for each incident-management session. This provides a clearer signed-in state and avoids the redirect and email-rate-limit problems encountered during initial testing.

These additions keep routine citizen-science sampling results and exceptional pollution events distinct while allowing both to be analysed within the wider Canal Watch project.

---

## Update — 22 September 2026: Water-quality time-lapse

This session developed the **time-lapse in `index.html`**. These changes apply to the Canal Watch water-quality map, **not** the separate Survey Scheduler.

### Time-lapse timeline and navigation

- The timeline displays survey dates beneath the slider where space permits.
- **Every available survey date has a tick mark**, even if its text label is hidden to prevent overlapping dates. Fewer date labels are displayed on narrower screens.
- Each tick mark, including an unlabelled one, is clickable. Selecting it pauses playback, moves the slider to that survey date and refreshes the map markers.
- Hovering over a tick shows its full date; tick controls can also receive keyboard focus.
- The existing playback, previous/next survey, speed and indicator-selection controls remain available.

### Map layout

- Opening the time-lapse expands the canal map area; closing it returns the map to its normal height.
- Leaflet's `invalidateSize()` is called when the map changes size so map tiles and markers can be redrawn in the resized viewport.
- The layout includes responsive adjustments for smaller screens.

### Image and video export

The time-lapse export controls offer:

- **PNG** — saves the current time-lapse view.
- **WebM** — records the time-lapse as a video, where browser recording is supported.
- **MP4** — records an MP4 directly **only where the browser supports MP4 through `MediaRecorder`**. If unsupported, use WebM and convert it separately.

Exports are designed to show the map, survey markers, selected indicator, survey date and a colour key. The export colour key was moved to the **bottom of the image/video** and made **slimmer**, with a compact single row where width permits and wrapping when necessary.

**Basemap limitation:** The exporter attempts to draw map tiles into the recording canvas. If the browser or tile provider blocks access to the tile images, the exporter can fall back to a plain background. A consistent light basemap in every exported file is therefore **not guaranteed** without testing or a tile source that explicitly permits canvas use. Retain the required map attribution when publishing exports.

### Data handling

- Time-lapse frames use the available survey dates. A site's last recorded result can be carried forward until a newer result is available; the sampling date remains distinct from the playback date.
- These interface and export changes do **not** require changes to `freshwater.csv` or existing survey records.

### Deployment

1. Back up the currently published `index.html` and `README.md` in `RayLancashire/queens-park-canal-map`.
2. Replace `index.html` with the updated map file and `README.md` with this document.
3. Keep the existing `freshwater.csv`, `analysis.html` and other repository files unchanged.
4. Allow GitHub Pages to publish the update, then refresh the embedded map in Webador.
5. Test opening and closing the time-lapse, clicking labelled and unlabelled ticks, moving through all survey dates, mobile layout and PNG/WebM/MP4 export in your intended browser. Check that the basemap and attribution appear in exported files.

**Verification:** The earlier map builds were checked for JavaScript syntax and ZIP integrity. Browser behaviour, MP4 availability and map-tile inclusion in exports require testing on the published site.

---

## Project

**Queen's Park Canal Water Quality Monitoring Map**

Greener Canalside / FreshWater Watch project  
Grand Union Canal
