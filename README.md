# Queen's Park Canal Water Quality Map

Interactive water-quality monitoring map for the **Greener Canalside / FreshWater Watch project** on the Grand Union Canal.

The map is designed for **GitHub Pages** and embedding into a **Webador** website. Water-quality data is loaded from CSV files so new sampling results can be published without rebuilding the map.

## Project files

- `index.html` — interactive Leaflet survey map
- `freshwater.csv` — FreshWater Watch sampling data
- `additional-water-quality.csv` — additional water-quality test results
- `analysis.html` — Sample analysis and Results over time by site
- `further-analysis.html` — Site comparison and Relationship between indicators
- `README.md` — project documentation

Repository: `RayLancashire/queens-park-canal-map`

## Analysis structure

The analysis is now split into **two separate HTML pages**, each controlled by its own Webador disclosure button.

### View Nitrate, Phosphate and Turbidity charts

The first Webador disclosure loads `analysis.html`.

It contains:

- **Sample analysis**
  - Nitrate occurrence chart
  - Phosphate occurrence chart
  - Turbidity occurrence chart
  - summary result panels
  - additional water-quality analysis
- **Results over time by site**
  - sampling-site selector
  - Nitrate results through time
  - Phosphate results through time
  - Turbidity results through time

Occurrence-chart height represents the **number of samples**. The percentage of samples in each result band is shown above the corresponding column.

Nitrate and phosphate results over time use the midpoint of the FreshWater Watch result range. Turbidity uses the recorded NTU result.

### Site comparison and relationships

The second Webador disclosure loads `further-analysis.html`.

It contains:

- **Site comparison**
- **Relationship between indicators**

**Site comparison opens automatically** when `further-analysis.html` loads.

The Site comparison panel provides Nitrate, Phosphate and Turbidity views and compares the latest available result from each sampling site. Nitrate and phosphate use the midpoint of the FreshWater Watch result range while retaining the original result band for context. Turbidity uses the recorded NTU value.

The **Relationship between indicators** panel has been created as a separate area for future relationship/scatter analysis, such as Nitrate vs Phosphate or Phosphate vs Turbidity.

## Webador accordion behaviour

The outer disclosure controls are kept in **Webador** rather than inside the GitHub HTML pages.

There are two outer Webador disclosures:

1. **View Nitrate, Phosphate and Turbidity charts**
2. **Site comparison and relationships**

Each embed uses unique button, content-area, icon and iframe IDs. This prevents conflicts caused by duplicating Custom HTML containing identical IDs.

The two Webador disclosures behave as a single accordion: opening one closes the other, while either open disclosure can also be closed manually.

Iframe resize listeners check that resize messages come from the correct iframe. Both analysis pages use the `canal-chart-resize` message to report changing content height and reduce unused space.

## CSV data

The main map and analysis pages read `freshwater.csv`.

Additional water-quality tests are read from `additional-water-quality.csv`.

Recognised FreshWater Watch fields include:

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

The turbidity reader also recognises headings containing **Secchi Tube** or **Turbidity** to tolerate small changes in FreshWater Watch exports.

## Updating water-quality data

For routine FreshWater Watch updates:

1. Prepare the latest data.
2. Keep the filename `freshwater.csv`.
3. Replace the existing file in the GitHub repository.
4. Commit the change.
5. Wait for GitHub Pages to refresh.
6. Refresh the Webador page.

The HTML should not normally need changing simply because new sampling records have been added.

## Accessibility

Water-quality status is not communicated by colour alone. Assessment displays use combinations of text, colour and shape.

Other measures include written assessment labels, high-contrast text, table headings, screen-reader labels where applicable, responsive layouts, and distinct active/hover states for interactive controls.

## Technology

HTML, CSS, JavaScript, Leaflet, OpenStreetMap, CARTO basemap tiles, Esri satellite imagery, GitHub Pages and Webador.

## Data source

Water-quality results are collected through the **Greener Canalside / FreshWater Watch citizen-science project**.

The map and analysis pages provide an accessible public view of citizen-science monitoring data and should not be read as a statutory water-quality classification.

## Change log

### 13 August 2026

- Split analysis into `analysis.html` and `further-analysis.html`.
- Retained **Sample analysis** and **Results over time by site** in `analysis.html`.
- Moved **Site comparison** to `further-analysis.html`.
- Added a separate **Relationship between indicators** panel.
- Added a second Webador outer disclosure for **Site comparison and relationships**.
- Renamed the first Webador disclosure **View Nitrate, Phosphate and Turbidity charts**.
- Gave the two Webador embeds unique IDs to prevent duplicated-code conflicts.
- Restricted resize handling to messages from the corresponding iframe.
- Made the two Webador outer disclosures mutually exclusive: opening one closes the other.
- Set **Site comparison** to open automatically when the second analysis embed loads.
- Corrected first-load behaviour so the Site comparison chart renders immediately after `freshwater.csv` loads.
- Site comparison now provides Nitrate, Phosphate and Turbidity views comparing the latest available result at each site.
- Retained dynamic iframe-height reporting when analysis content expands or collapses.

### 12 August 2026

- Renamed the main analysis panel **Sample analysis**.
- Added **Results over time by site** for Nitrate, Phosphate and Turbidity.
- Added/refined Temperature, pH, Coliform, BOD and Dissolved Oxygen displays.
- Changed occurrence-chart vertical axes to number of samples.
- Added sample-count guide lines and percentage-above-column labels.
- Reformatted Turbidity to match the Nitrate and Phosphate occurrence charts.
- Made result summary panels clickable.
- Improved chart hover/active states.
- Changed the map reset control to a Home icon.
- Improved iframe height reporting and analysis spacing.

## Project

**Queen's Park Canal Water Quality Monitoring Map**

Greener Canalside / FreshWater Watch project  
Grand Union Canal
