# Queen's Park Canal Water Quality Map

Interactive water-quality monitoring map for the **Greener Canalside / FreshWater Watch project** on the Grand Union Canal.

The map is designed to be hosted using **GitHub Pages** and embedded into a **Webador** website. Water-quality data is loaded from a CSV file, so new sampling results can be published without rebuilding the map.

---

## Project files

The GitHub repository contains or may contain:

- `index.html` — the interactive Leaflet water-quality map
- `analysis.html` — sample-results analysis
- `further-analysis.html` — site comparison, trends and wider project analysis
- `assessment-builder.html` — visual canal assessment builder
- `freshwater.csv` — FreshWater Watch sampling data
- `additional-water-quality.csv` — additional water-quality results, including temperature, pH, dissolved oxygen, BOD and coliform where recorded
- `updates.csv` — dated Canal Watch website and project updates used by the floating Updates widget
- `updates-widget.html` — GitHub-hosted compact Updates widget loaded into the Webador floating panel
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

- **Light** — clean map designed to keep sampling markers prominent
- **Street** — OpenStreetMap
- **Satellite** — aerial imagery

The Light map is used as the default view.

---

## Grand Union Canal map-overlay trial

A dedicated highlighted **Grand Union Canal** route and label was tested on the Light basemap to make the waterway easier to identify.

The overlay successfully followed the canal corridor, but it also covered too much of the underlying canal and map detail. The live map was therefore **reverted to the previous Light-map presentation without the dedicated canal overlay**.

The trial is retained here as a development note in case a subtler canal treatment — such as a label-only approach — is considered later.

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

## Project

**Queen's Park Canal Water Quality Monitoring Map**

Greener Canalside / FreshWater Watch project  
Grand Union Canal

---

## Analysis pages

The project now includes two GitHub-hosted analysis pages that can be embedded into Webador using iframes.

### `analysis.html`

Used for the main sample-results analysis, including:

- Nitrate results
- Phosphate results
- Turbidity results
- Temperature
- pH
- Coliform
- **Biochemical Oxygen Demand (BOD)**
- **Dissolved Oxygen (DO)**
- Results over time by site, including an **All sites** comparison view with separate site lines and legend
- Responsive chart layout
- Automatic iframe-height messaging to Webador

Scientific notation is standardised as **pH**.

### `further-analysis.html`

Used for wider interpretation of the monitoring dataset.

Current features include:

- **Overall Water Quality Snapshot**
  - All sites or individual site
  - Latest survey or project average
  - Nitrate
  - Phosphate
  - Turbidity
  - Temperature
  - pH with Acidic / Neutral / Alkaline description
  - Dissolved Oxygen (DO)
  - Biochemical Oxygen Demand (BOD)
  - Coliform displayed as `> 20 coliforms/100ml` where the test is above its upper limit
  - Results to Watch
  - Key Takeaway

- **Change Since Previous Survey**
  - Previous and current values
  - Indicator-aware improvement / stability / deterioration logic
  - Separate handling for temperature, pH and dissolved oxygen
  - FreshWater Watch and additional-test dates shown separately when necessary
  - Interactive Overall Change wording: hovering over **improved**, **stable** or **deteriorated** highlights the corresponding result cards

- **Site comparison**
  - Nitrate
  - Phosphate
  - Turbidity

- **Site consistency**
  - Nitrate
  - Phosphate
  - Turbidity
  - Sample count
  - Consistency category
  - Typical level
  - Result range
  - Most consistent site
  - Most variable site
  - Hover / keyboard explanations for Typical Level
  - Consistency is calculated using the coefficient of variation: standard deviation ÷ mean

- **Project-wide trends**

- **Seasonal patterns**

- **Relationship between indicators**
  - Nitrate vs Phosphate
  - Phosphate vs Turbidity
  - Nitrate vs Turbidity
  - Separate indicator colours shown in the chart and legend
  - Correlation summary based on paired samples

### Analysis accordion behaviour

The Further Analysis page uses a single-open accordion pattern.

Only one analysis section is open at a time. The **Overall Water Quality Snapshot** opens by default.

Key Takeaway boxes are placed at the **end of the relevant analysis**, so visitors see the evidence before the concluding interpretation.

---

## Results to Watch

The Overall Water Quality Snapshot includes a **Results to Watch** section after the main result cards.

It:

- Shows only measurements that meet a reason to warrant closer attention
- Shows the indicator name, result and short explanation
- Displays a clear message when no results currently require particular attention
- Highlights the corresponding main result card when the watch item is hovered over or keyboard-focused
- Keeps the permanent coloured strip at the top of each result card to identify the measurement

The top strips identify indicators and are separate from improvement / deterioration highlighting.

---

## Indicator colours in analysis

The analysis pages use consistent indicator colours to help distinguish measurements.

The colour is supplementary: indicator names and result text remain visible so meaning is not communicated by colour alone.

The relationship charts also use separate colours for:

- Nitrate
- Phosphate
- Turbidity

On relationship scatter plots, the paired indicators are represented using the point fill and outline, with an in-chart legend.

---

## Assessment Builder

The **Canal Visual Assessment Builder** is hosted as:

`assessment-builder.html`

Hosting the builder on GitHub Pages and embedding it into Webador avoids Webador restrictions that prevented the builder's JavaScript-generated rows from appearing correctly when the complete script was placed directly inside a Webador HTML element.

The builder includes:

- Site
- Date
- Time
- Eight visual-assessment indicators
- Five assessment levels
- Automatic overall score
- Overall assessment description
- Generated blog HTML
- Accessible text, colour and status symbols

The builder is intended as an administrative tool rather than a public navigation item.

A CSV-export idea has been considered but is currently on hold.

---

## Canal Watch blog filters

The Webador Canal Watch blog uses an automatic assessment and date filter.

Assessment filters include:

- All
- Excellent
- Good
- Fair
- Poor
- Very Poor
- Critical

Date filtering includes:

- All dates
- A sliding window of three month buttons
- Automatic selection of the **current month** on first load
- `<` and `>` month navigation

The visible month buttons are displayed **newest to oldest**, with the current month first. For example, in August 2026 the initial button order is:

`Aug 2026 | Jul 2026 | Jun 2026`

The current month is selected automatically when the page first loads. If there are no blog entries for the current month yet, the filter falls back to the latest available month so the page does not open with an empty result set.

Because the buttons now run newest to oldest, the arrow behaviour is matched to that order:

- `<` moves towards **newer** months
- `>` moves towards **older** months

The arrow disabled states and accessibility labels follow the same direction logic.

The filter avoids rebuilding the date controls on every click, which prevents the pause and repeated-click failures seen in earlier versions.

### Blog filter styling

The filter container uses a pale grey-green background:

`#f2f6f3`

Individual controls remain white.

Unselected assessment, month and enabled navigation buttons receive a pale-green hover / keyboard-focus highlight. Selected buttons do not receive the extra hover treatment.

---

## Webador embedded analysis accordions

The Webador page uses separate accordion buttons for the GitHub-hosted analysis pages.

The two main embeds are:

- Sample Analysis — `analysis.html`
- Site comparison and relationships / Further Analysis — `further-analysis.html`

Opening one Webador accordion closes the other.

The iframe height is updated from the GitHub page using `postMessage`, allowing the Webador page to resize as internal accordions are opened and closed.

For consistency with the Canal Watch blog filters, closed Webador accordion buttons can use the same pale-green hover / keyboard-focus treatment. Open accordion buttons remain unchanged.

---

## Results over time by site — All sites comparison

The **Results over time by site** panel in `analysis.html` supports both individual-site and whole-project comparison views.

The **All sites** option has been corrected so it now renders the monitoring data instead of asking the visitor to select an individual sampling site.

When **All sites** is selected:

- Nitrate, phosphate and turbidity are displayed as separate results-over-time charts
- Each sampling location is shown as its own coloured line
- A sampling-site legend identifies the lines
- Survey dates share a common horizontal time axis to make changes between sites easier to compare
- Individual data points retain the recorded result for the relevant survey date
- Selecting an individual sampling site continues to show the existing single-site results-over-time view

Nitrate and phosphate continue to use the midpoint of the recorded FreshWater Watch result range for plotting. Turbidity continues to use the recorded NTU test value.

This makes **All sites** a genuine comparison view while retaining the individual-site option for closer examination of one monitoring location.

---

## Canal Watch Updates widget

A compact **Canal Watch Updates** widget has been added to provide visitors with recent project and website changes without taking up permanent page space.

### Data and hosting

The widget uses:

- `updates.csv` — stores the update date, title, summary, optional link and update type
- `updates-widget.html` — reads the CSV and displays the latest update plus expandable recent-update history
- GitHub Pages — hosts the widget and CSV
- Webador **Body – end** custom HTML — provides the floating frontmost container

The data flow is:

`updates.csv` → `updates-widget.html` → GitHub Pages → Webador floating panel

New entries can normally be published by adding a row to `updates.csv` and committing the updated CSV to GitHub.

### Floating Webador behaviour

The floating container:

- Appears only on the Canal Watch page at `/what-we-do/canal-watch`
- Uses `position: fixed` so it does not reserve space in the normal Webador page layout
- Is kept above the Canal Watch page content using a high stacking order
- Starts in a compact minimised state
- Expands and minimises using a keyboard-accessible `+` / `-` control
- Uses plain ASCII `+` and `-` characters to avoid character-encoding problems in Webador
- Displays the **NEW** badge inline with **Canal Watch Updates**
- Uses a **220px closed/minimised width**
- Retains a wider expanded panel for reading the latest update and update history
- Adapts to a bottom-width layout on smaller screens

### Update history

The GitHub-hosted widget displays the latest update first. Visitors can use **View recent updates** to reveal earlier entries and **Hide recent updates** to close the history again.

The widget and its Webador parent communicate using `postMessage` so the iframe height can be recalculated as the recent-update history opens and closes.

The Updates widget should be installed through Webador's site-level **Body – end** custom HTML rather than as a normal page Embed Code element. This avoids Webador reserving a large blank content block for the floating widget.

---

## Accessibility and interaction

Accessibility improvements now include:

- Text labels alongside colours
- Distinct assessment symbols
- Keyboard-accessible hover/focus effects
- Hover highlighting of result cards and table rows
- Selected controls remain visually distinct
- Unselected controls highlight on mouse hover and keyboard focus
- pH is written using correct scientific capitalisation
- Full names are used for specialist abbreviations where helpful:
  - **Dissolved Oxygen (DO)**
  - **Biochemical Oxygen Demand (BOD)**
- Acidic / Neutral / Alkaline wording accompanies pH results
- Key Takeaway summaries follow the detailed evidence
- Results to Watch provides a concise interpretation after the main results
- Colour is used as a supporting cue rather than the sole means of conveying meaning
- Responsive layouts support smaller screens

---


### Canal Visual Assessment improvements

The Canal Visual Assessment Builder has also been refined for easier reading and clearer blog output:

- Added subtle **alternate-row shading** to the visual assessment table to make Indicator, Observation and Assessment rows easier to follow.
- Retained a slightly stronger row highlight on hover.
- Added a conditional wildlife context note when **Wildlife activity** is set to **`N/A – none observed`**.
- The note appears inside the **Overall Visual Assessment** panel beneath the main assessment explanation:
  - *Not seeing wildlife during a short visit doesn't necessarily indicate poor ecological conditions.*
- The same wildlife note is automatically included in the **generated blog HTML**, so it can appear in the published Webador visual assessment without being added manually.
- The wildlife note is omitted automatically when wildlife activity is recorded.
- Presentation of the wildlife note is controlled through the shared CSS class `.qp-wildlife-note`, while the Assessment Builder JavaScript controls whether the note is included.

---

## Update — 18 August 2026

The following Canal Watch visual-condition and blog-filter changes were developed or refined on **18 August 2026**:

1. Reviewed the latest Queen's Park canalside visual survey photographs, including views from Ladbroke Grove Bridge, Queen's Park canalside and Ha'Penny Steps.
2. Confirmed **Good** as the overall visual-condition assessment for the survey, based on generally calm water, very little visible litter and no obvious signs of oil, foam, surface scum or significant algal growth.
3. Refined the wording used in Canal Watch updates to distinguish **good visual condition** from a formal water-quality classification.
4. Updated the Canal Watch blog date filter so the **current month is selected automatically on first load**.
5. Added a fallback to the latest available month when there are no blog entries for the current month.
6. Changed the three visible month buttons to display **newest to oldest**, placing the current month first.
7. Updated the month-navigation direction so `<` moves towards newer months and `>` moves towards older months.
8. Updated arrow disabled states and accessibility labels to reflect the revised month order.
9. Retained the existing assessment filtering, three-month window, hover/focus styling and responsive behaviour.

These changes make the most recent visual-condition updates easier to reach while keeping earlier months available through simple, predictable navigation.

---

## Update — 20 August 2026

The following Canal Watch refinements were made or confirmed on **20 August 2026**:

1. Corrected **Results over time by site → All sites** so nitrate, phosphate and turbidity can be compared across monitoring locations.
2. Added separate site lines and a site legend to the All sites results-over-time charts.
3. Added an **Overall site comparison** summary to `further-analysis.html`, where it now sits with **Site comparison and relationships**.
4. The Overall site comparison highlights **Strongest overall results** and **Results to watch**, and includes the number of samples for each location.
5. Removed the Overall site comparison summary from `analysis.html` so **Results over time by site** remains focused on chronological trends.
6. Tested a highlighted and labelled **Grand Union Canal** route on the Light map.
7. Reverted the dedicated canal overlay after testing because it obscured too much of the underlying canal and map detail.
8. Retained the previous clean Light-map presentation as the preferred current map view.

These refinements keep the analysis functions grouped more logically while avoiding unnecessary visual clutter on the main Canal Watch map.

---

## Update — 17 August 2026

The following Canal Watch interface and documentation changes were developed or refined on **17 August 2026**:

1. Added a CSV-driven **Canal Watch Updates** widget.
2. Added `updates.csv` as the simple source for dated update entries.
3. Added `updates-widget.html` to display the latest update and expandable recent-update history.
4. Converted the Updates widget to a floating Webador panel.
5. Moved the floating implementation to Webador **Body – end** so it does not reserve normal page-layout space.
6. Restricted the floating widget to the Canal Watch page only: `/what-we-do/canal-watch`.
7. Raised the floating widget above other Canal Watch page content.
8. Added expand / minimise behaviour and recent-update disclosure controls.
9. Refined iframe-height messaging for opening and closing the recent-update history.
10. Changed the floating control icons to plain `+` and `-` characters for reliable Webador display.
11. Kept the **NEW** badge inline with the **Canal Watch Updates** title.
12. Set the closed/minimised widget width to **220px**.
13. Updated `updates.csv` with the latest Canal Watch interface changes.
14. Enhanced the **Light** Canal Watch map with a dedicated highlighted **Grand Union Canal** route.
15. Added a darker canal outline and **Grand Union Canal** label to make the waterway easier to identify.
16. Limited the enhanced canal overlay to the **Light** basemap so the existing Street and Satellite views remain unchanged.
17. Corrected the **All sites** option in **Results over time by site**, which previously did not render the charts.
18. Added an all-sites comparison view for nitrate, phosphate and turbidity.
19. Added separate coloured lines and a sampling-site legend so monitoring locations can be compared on the same chart.
20. Kept the existing individual-site results-over-time view unchanged.

These changes keep recent project information visible and easy to reach while allowing the widget to remain compact when it is not being used.

---

## Update — 14 August 2026

The following changes were developed or refined on **14 August 2026**:

1. Added and expanded the **Overall Water Quality Snapshot**.
2. Put the Snapshot into its own accordion.
3. Added additional-test indicators to the Snapshot.
4. Standardised **pH** notation and added Acidic / Neutral / Alkaline descriptions.
5. Changed Dissolved Oxygen to **Dissolved Oxygen (DO)**.
6. Changed BOD to **Biochemical Oxygen Demand (BOD)**.
7. Standardised high coliform display as **`> 20 coliforms/100ml`**.
8. Added **Change Since Previous Survey** using both FreshWater Watch and additional water-quality results.
9. Added indicator-aware change interpretation rather than treating every increase or decrease the same way.
10. Added **Site Consistency**, including Typical Level explanations and consistency calculations.
11. Added separate indicator colours to the relationship comparison charts and legend.
12. Added hover highlighting to result cards and analysis controls.
13. Added interactive **Improved / Stable / Deteriorated** highlighting in the Overall Change summary while preserving the permanent indicator-colour strips.
14. Added **Key Takeaway** summaries and moved them to the end of each relevant analysis section.
15. Added additional spacing around Key Takeaway and Results to Watch sections.
16. Added **Results to Watch** after the main Snapshot result cards.
17. Added a pale grey-green background to the Webador Canal Watch blog-filter panel.
18. Added hover / keyboard-focus highlighting to unselected blog-filter controls.
19. Defined matching hover behaviour for closed Webador analysis accordion buttons.
20. Continued the GitHub Pages → iframe → Webador approach for JavaScript-heavy tools and analysis pages.
21. Added alternate-row highlighting to the **Canal Visual Assessment** table for easier scanning.
22. Added a conditional wildlife context note when **Wildlife activity = N/A – none observed**.
23. Added the same conditional wildlife note to the **generated blog HTML**, allowing it to appear automatically in the published Overall Visual Assessment.

These changes are intended to improve readability, interpretation and accessibility without making the public-facing analysis unnecessarily complicated.

