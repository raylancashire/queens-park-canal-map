# Queen's Park Canal Water Quality Map

Interactive water-quality monitoring map for the **Greener Canalside / FreshWater Watch project** on the Grand Union Canal.

The map is designed to be hosted using **GitHub Pages** and embedded into a **Webador** website. Water-quality data is loaded from a CSV file, so new sampling results can be published without rebuilding the map.

---

## Project files

The GitHub repository contains:

- `index.html` — the interactive Leaflet map
- `freshwater.csv` — FreshWater Watch sampling data
- `additional-water-quality.csv` — additional water-quality test results
- `analysis.html` — sample-analysis and results-over-time charts
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

## Home map control

The map reset control now uses a **Home (house) icon**. Selecting it returns the map to a view containing all current sampling results.

The Home view is calculated from the sampling-point coordinates in the CSV rather than from a fixed location.

This means the Home function will continue to work if new sampling sites are added later.

---

## Sample analysis and results over time

`analysis.html` provides the chart-based analysis for the project and is designed to sit below the survey map on the Webador page.

The analysis interface now uses two accordion panels.

### Sample analysis

**Sample analysis** is open by default. It contains:

- FreshWater Watch occurrence charts for Nitrate, Phosphate and Turbidity
- Summary counts for total samples and available Nitrate, Phosphate and Turbidity results
- FreshWater Watch result-band colours
- The complete turbidity test scale, with zero-occurrence result labels suppressed
- Additional water-quality testing for Temperature, pH, Coliform, Biochemical Oxygen Demand (BOD) and Dissolved Oxygen

The additional tests are loaded from `additional-water-quality.csv`.

pH results use the supplied test-kit colour scale and identify readings as **acidic, neutral or alkaline**.

Coliform results display the recorded **total coliform colonies per 100 mL**, together with the test-kit positive/negative indication and the project assessment.

Dissolved Oxygen results use the supplied **0, 4 and 8 ppm** test-kit colours. Percent oxygen saturation is calculated using the recorded water temperature and the supplied temperature/oxygen table.

### Sample-analysis chart refinements

The Nitrate and Phosphate occurrence charts in **Sample analysis** have been refined to make the distribution easier to read:

- The left-hand vertical scale now represents the **number of samples**, rather than a percentage scale.
- The initial sample-count scale runs from **0 to 10** in single-sample increments.
- The scale is designed to expand automatically as more surveys are added; above 10 samples it can extend to higher values as required.
- Faint horizontal guide lines align with each sample-count value, making individual column heights easier to compare.
- Column heights are plotted against the same sample-count scale, so a column representing one sample aligns with the **1** guide line, two samples with **2**, and so on.
- The separate sample-count label above each column has been removed because it duplicated the information already provided by the vertical scale and guide lines.
- The **percentage of samples** in each result band is retained and displayed immediately above its coloured column.
- FreshWater Watch result-band colours and the result-range labels beneath each column remain unchanged.

This means each chart now communicates three things without duplicating labels: **column height = number of samples**, **percentage above the column = share of samples**, and **column colour/result label = FreshWater Watch result band**.

### Turbidity chart formatting

The **Turbidity** occurrence chart now follows the same visual format as the Nitrate and Phosphate occurrence charts:

- The left-hand vertical scale shows the **number of samples**.
- The scale starts at **0–10 samples** and can expand automatically as more survey results are added.
- Faint horizontal guide lines correspond to individual sample-count values.
- Column height represents the number of samples recorded in each turbidity result band.
- The **percentage of samples** is displayed immediately above each coloured column.
- The existing FreshWater Watch turbidity colours and the complete NTU result scale are retained.
- On larger screens the full turbidity scale is fitted across the available panel width.
- On smaller devices the chart becomes **horizontally scrollable**, preventing the full NTU scale and labels from becoming cramped or unreadable.

This gives the Nitrate, Phosphate and Turbidity occurrence charts a consistent visual language while preserving the larger number of categories in the turbidity scale.

### Results over time by site

The second accordion panel is **Results over time by site**. It provides a sampling-site selector and three line charts showing the recorded results through time for:

- Nitrate — mg/L
- Phosphate — mg/L
- Turbidity — NTU

Nitrate and phosphate are plotted using the midpoint of the FreshWater Watch result range. Turbidity uses the recorded NTU test value.

The explanatory note for these charts is positioned directly below the **Sampling site** selector so visitors can understand the charts before viewing them.

### Accordion behaviour

Only one main analysis panel is displayed at a time:

- **Sample analysis** opens automatically when the page loads.
- Opening **Results over time by site** closes **Sample analysis**.
- Reopening **Sample analysis** closes **Results over time by site**.
- The currently open panel can also be collapsed.

The analysis page reports its content height to the parent Webador iframe when accordion or chart content changes, helping the embed resize to the displayed content instead of retaining unnecessary grey space.

The outer analysis spacing has also been made symmetrical so the top and bottom margins match.

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

## Project

**Queen's Park Canal Water Quality Monitoring Map**

Greener Canalside / FreshWater Watch project  
Grand Union Canal

---

## Change log

### 12 August 2026

- Renamed the main analysis panel from **Result occurrences** to **Sample analysis**.
- Split the analysis into **Sample analysis** and **Results over time by site** accordion panels.
- Set **Sample analysis** to open by default; opening either main panel closes the other.
- Added line charts showing Nitrate, Phosphate and Turbidity results over time for each sampling site.
- Moved the results-over-time explanatory note directly below the sampling-site selector.
- Improved iframe height reporting when accordion content expands or collapses.
- Equalised the top and bottom spacing around the analysis panels.
- Added and refined displays for Temperature, pH, Coliform, BOD and Dissolved Oxygen.
- Added pH test-kit colours and acidic / neutral / alkaline descriptions.
- Added total coliform colony results and interpretation.
- Added Dissolved Oxygen test-kit colours and percent-saturation calculation based on water temperature.
- Changed the survey-map reset control from a circular reset arrow to a **Home (house) icon**, retaining the same return-to-all-results behaviour.
- Changed the Nitrate and Phosphate occurrence-chart vertical axis to **number of samples**.
- Set the initial chart scale to **0–10 samples** in one-sample increments, with automatic expansion for future surveys.
- Added faint horizontal sample-count guide lines and aligned column heights precisely with them.
- Removed duplicate sample-count labels from above the columns.
- Positioned each result-band percentage immediately above its coloured column.
- Reformatted the Turbidity occurrence chart to match the Nitrate and Phosphate charts.
- Added the same sample-count axis, faint guide lines and percentage-above-column presentation to Turbidity.
- Retained the full FreshWater Watch turbidity/NTU scale and existing result colours.
- Made the Turbidity chart fit the available width on larger screens and scroll horizontally on smaller devices.
