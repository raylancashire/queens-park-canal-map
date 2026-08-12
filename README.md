# Queen's Park Canal Water Quality Map

Interactive water-quality monitoring map for the **Greener Canalside /
FreshWater Watch project** on the Grand Union Canal.

The map is designed to be hosted using **GitHub Pages** and embedded
into a **Webador** website. Water-quality data is loaded from a CSV
file, so new sampling results can be published without rebuilding the
map.

------------------------------------------------------------------------

## Project files

The GitHub repository contains:

-   `index.html` --- the interactive Leaflet map
-   `analysis.html` --- water-quality occurrence charts for the Webador
    analysis section
-   `freshwater.csv` --- the water-quality sampling data
-   `README.md` --- project documentation
-   `images/` --- optional sampling-site photographs

Repository:

`RayLancashire/queens-park-canal-map`

GitHub Pages address:

`https://raylancashire.github.io/queens-park-canal-map/`

------------------------------------------------------------------------

## Map features

The map displays sampling locations from the CSV using the latitude and
longitude fields.

Current features include:

-   Interactive sampling-location markers
-   Automatic grouping of repeated samples by sampling site
-   Latest sample date and time
-   Nitrate result
-   Phosphate result
-   Turbidity result
-   Nutrient-level interpretation
-   Turbidity clarity description where available
-   Previous samples listed in each popup
-   Number of samples shown in the popup history
-   Sample counts shown beside each site in the sampling-site dropdown
-   Assessment symbols shown alongside historical results
-   UK date format
-   AM / PM time display
-   Site-selection dropdown
-   Reset map button
-   Reset returns to the default view containing all sampling results
-   Automatic zoom to all sampling results
-   Light, Street and Satellite basemap options
-   Responsive layout for desktop, tablet and mobile
-   Sampling-site photographs loaded automatically from the `images`
    folder
-   Summary panels showing:
    -   Sampling sites
    -   Samples in dataset
    -   Latest sample

------------------------------------------------------------------------

## Water-quality analysis charts

A separate `analysis.html` page provides occurrence charts using the
same `freshwater.csv` dataset as the map.

The analysis page is intended to be embedded directly below the map on
Webador. The Webador embed provides the outer **View nitrate and
phosphate occurrence charts** control; when opened, the analysis charts
are displayed immediately without a second internal collapsible panel.

Current analysis features include:

-   Nitrate occurrence chart
-   Phosphate occurrence chart
-   Turbidity occurrence chart
-   Tabs for switching between Nitrate, Phosphate and Turbidity
-   Summary counts for total samples and available Nitrate, Phosphate
    and Turbidity results
-   FreshWater Watch colour ranges for the Nitrate and Phosphate columns
-   Full turbidity scale: `<14`, `15`, `17`, `19`, `21`, `25`, `30`,
    `35`, `40`, `50`, `75`, `100`, `150`, `200`, `>240` NTU
-   Turbidity colours: dark green for `<14 NTU`, yellow for `15–40 NTU`,
    and red for `50–>240 NTU`
-   Zero-occurrence turbidity positions retained on the scale without
    displaying a `0` result label
-   Horizontal scrolling for the full turbidity scale on smaller screens
-   Automatic iframe-height messaging for the Webador embed
-   No duplicate result-list table beneath the charts

The analysis page reads the same `freshwater.csv` file, so replacing the
CSV updates both the map and the analysis charts.

## Map text

Current project description:

> Greener Canalside / FreshWater Watch project and citizen-science
> results from the Grand Union Canal.

Suggested Webador page introduction:

> Latest water quality testing results from Urbanwise London's Greener
> Canalside Project, collected as part of the Greener Canalside /
> FreshWater Watch citizen-science programme.

------------------------------------------------------------------------

## CSV data

The map reads:

`freshwater.csv`

The CSV can be replaced whenever new FreshWater Watch results are
available.

The map has been designed to recognise both original FreshWater Watch
field names and simplified field names.

### Main fields used by the map

  Information          Recognised field examples
  -------------------- -------------------------------------------
  Sampling site        `Site Name`, `site_name`
  Sample date          `Sample Date`, `sample_date`
  Sample time          `Sample Time`, `sample_time`
  Nitrate              `Nitrate (mg/L)`, `chemical_nitrate`
  Phosphate            `Phosphate (mg/L)`, `chemical_phosphate`
  Nitrate midpoint     `nitrate_mid`
  Phosphate midpoint   `phosphate_mid`
  Turbidity            `Water quality - Secchi Tube (Turbidity)`
  Latitude             `y`, `Latitude`, `latitude`
  Longitude            `x`, `Longitude`, `longitude`
  Notes                `notes`, `Notes`

The turbidity reader also looks for column names containing the words
**Secchi Tube** or **Turbidity**, making the import more tolerant of
small changes in FreshWater Watch exports.

------------------------------------------------------------------------

## Updating the water-quality data

To publish new sampling results:

1.  Prepare the latest FreshWater Watch CSV.

2.  Keep the filename as:

    `freshwater.csv`

3.  Open the GitHub repository.

4.  Replace the existing `freshwater.csv`.

5.  Commit the change.

6.  Wait for GitHub Pages to refresh.

7.  Refresh the live map or Webador page.

The HTML normally does not need to be edited when new records are added.

------------------------------------------------------------------------

## Updating the map

If `index.html` is changed:

1.  Open `index.html` in the GitHub repository.
2.  Click the edit icon.
3.  Replace or amend the HTML.
4.  Click **Commit changes**.
5.  Wait for GitHub Pages to rebuild.
6.  Refresh the live page.

On a Mac, a forced browser refresh can be performed using:

`Command + Shift + R`

------------------------------------------------------------------------

## Updating the analysis page

If `analysis.html` is changed:

1.  Replace the existing `analysis.html` file in the GitHub repository.
2.  Commit the change.
3.  Wait for GitHub Pages to refresh.
4.  Refresh the Webador page.

Keep `analysis.html` in the same repository folder as `freshwater.csv`.

## Sampling-site grouping

Samples are grouped by **site name**.

This means that repeat visits to the same sampling location appear as
one map marker with a history of previous samples inside the popup.

For example:

-   Ladbroke Grove Bridge
-   Meanwhile Gardens
-   Half Penny Steps Group

Each popup displays the latest reading first, followed by previous
samples.

The sampling-site dropdown also displays the number of records available
at each location, for example:

`Meanwhile Gardens (3 samples)`

The dropdown is sized to its content where supported, while remaining
constrained to the available page width on smaller screens.

------------------------------------------------------------------------

## Popup layout

Each sampling popup includes:

1.  Sampling-site name
2.  Latest sample date and actual sample time
3.  Water-quality assessment
4.  Nitrate
5.  Phosphate
6.  Turbidity
7.  Previous samples

The **Previous samples** table includes:

-   Date and time
-   Assessment symbol positioned immediately before the nitrate column
-   Nitrate
-   Phosphate
-   Turbidity

If turbidity was not recorded, the map displays:

`Not taken`

------------------------------------------------------------------------

## Sampling-site photographs

A photograph can be displayed automatically near the top of each
sampling-site popup.

Photographs are stored in:

`images/`

The image filename is generated from the sampling-site name. Site names
are converted to lower case, spaces and punctuation become hyphens, and
the prefix **Grand Union Canal -** is removed automatically.

Examples:

  -------------------------------------------------------------------------
  CSV site name                       Photograph filename
  ----------------------------------- -------------------------------------
  Half Penny Steps Group              `images/half-penny-steps-group.jpg`

  Grand Union Canal - Meanwhile       `images/meanwhile-gardens.jpg`
  Gardens                             

  Grand Union Canal - Ladbroke Grove  `images/ladbroke-grove-bridge.jpg`
  Bridge                              
  -------------------------------------------------------------------------

If a matching photograph is not available, the popup hides the image
area rather than displaying a broken-image symbol.

To add a photograph for a new site, upload a suitably named `.jpg` file
to the `images` folder. No CSV change is required.

## Accessibility

The map has been designed so that water-quality status is not
communicated by colour alone.

Assessment categories use a combination of:

-   Text
-   Colour
-   Shape

Current symbols:

  Assessment         Symbol
  ------------------ -------------------
  Excellent          Dark green circle
  Good               Emerald diamond
  Fair               Yellow triangle
  Poor               Red square
  Not yet assessed   Grey circle

The legend uses the same symbols and colours as the map and popup.

Other accessibility measures include:

-   Clear written assessment labels
-   High-contrast popup text
-   Larger popup text
-   Table headings
-   Screen-reader labels for assessment symbols
-   Responsive mobile layout

------------------------------------------------------------------------

## Water-quality interpretation

Nitrate and phosphate measurements can be displayed with a
plain-language interpretation such as:

-   Good
-   Moderate
-   Poor

The interpretation is calculated automatically from the midpoint values
supplied in the CSV.

Turbidity is displayed separately as a clarity measurement. Where an
applicable FreshWater Watch description is available, a descriptive
label such as **Very clear** can be shown rather than presenting
turbidity as an unsupported ecological-status classification.

------------------------------------------------------------------------

## Map types

Visitors can switch between:

-   **Light** --- clean map designed to make sampling markers stand out
-   **Street** --- OpenStreetMap
-   **Satellite** --- aerial imagery

The Light map is used as the default view.

------------------------------------------------------------------------

## Reset map

The reset button returns the map to a view containing all current
sampling results.

The reset view is calculated from the sampling-point coordinates in the
CSV rather than from a fixed location.

This means the reset function will continue to work if new sampling
sites are added later.

------------------------------------------------------------------------

## Webador embedding

Example Webador embed code:

``` html
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

The iframe height may need small adjustments depending on the Webador
page layout and screen size.

### Analysis embed

The analysis page is embedded separately below the map from:

`https://raylancashire.github.io/queens-park-canal-map/analysis.html`

For the cleanest Webador layout, the collapse/show button is placed in
the **Webador embed code**, rather than inside `analysis.html`. This
lets Webador completely hide the iframe when the analysis section is
collapsed and avoids leaving a large blank background area.

The Webador title button uses a fixed height so its boundary remains
consistent when open or closed. When opened, `analysis.html` reports its
content height to the parent page so the iframe can expand to fit the
charts.

------------------------------------------------------------------------

## Technology

The map uses:

-   HTML
-   CSS
-   JavaScript
-   Leaflet
-   OpenStreetMap
-   CARTO basemap tiles
-   Esri satellite imagery
-   GitHub Pages
-   Webador

------------------------------------------------------------------------

## Data source

Water-quality results are collected through the **Greener Canalside /
FreshWater Watch citizen-science project**.

The map is intended to provide an accessible public view of sampling
results over time and should be read as citizen-science monitoring data
rather than as a statutory water-quality classification.

------------------------------------------------------------------------

## Maintenance

For routine updates, only `freshwater.csv` should normally need
replacing.

If the FreshWater Watch export format changes substantially, the
field-name mappings in `index.html` and `analysis.html` may need to be
updated.

------------------------------------------------------------------------

## Project

**Queen's Park Canal Water Quality Monitoring Map**

Greener Canalside / FreshWater Watch project\
Grand Union Canal
