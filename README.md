![Focus-Trends-and-Data-analysis-panel](https://user-images.githubusercontent.com/7908577/117548233-6cda0880-b051-11eb-8b1b-d45b799fca0d.png)


# Focus-Case-analysis

In this case study I have implemented below features:
1. Enhanced Focus Search Page
2. Data analysis panel 
3. Data visualization patterns.
4. Data filtering and grouping. 

## Installation

```bash
npm install
```

## Usage

```bash
npm run start
```

##  Search page and Focus labeling - Possible UI improvements

1. Table view - instead of showing all the details for all the patents in one shot to the user I propose using table view which will only show required details initially. Once the user is interested in any particular entry user will click on that element and will see all the details in a collapsible panel.

2. Filtering  - The user should be provided the functionality to search for a particular entry. (i.e. search by owner name, patent title, country, etc.)

3. Sorting and Paginations - Sorting and pagination of all the results is also a must to have functionality.

4. CheckBoxes for multiple selections- so that the user can mark relevant or irrelevant multiple entries in one go.

5. positive and negative buttons should be within the patent area.

##  Search panel - Possible UI improvements

1. Layout Enhancements: in the page layout there is a section on the right side which is occupying a lot of real estate. I would suggest not to keep that in the right side instead either display contact us in a dialog box or pop up. (or a separate page for this)

2. Left menu changes - instead of using the left side menu Breadcrumbs can be easily used and space can be saved over here as well.

## Approach for Statistics - UI changes

1. I have added one collapsible panel on the top of the search page where users can select from various options for data analysis and visualizations.

## Approach for Statistics - features


1. Trend viewer: Added one line chart for checking the trend in the number of patents in last year. i.e. increasing or decresing.
Future Enhancements: This was just a Proof of concept view further it can be enhanced with options like:
   1. No of months when the patents for Graphene are more to analyze 
      the seasonal demands and cyclical related to this patent.
   2. Countries where patents are decreasing and countries where the 
      patents are increasing for Graphene to better understand the 
      geographical aspects. 
2. Top Competitors: Two bar charts are used for analyzing the number 
      of patents and owners' details.
    1. Bar chart for Top competitor - number of patents
    2. Bar chart for Top Technical competitor
3. Countries with a maximum number of patents: A bar chart is used for checking which countries own the most number of patents for Graphene. In the later part, this can also be very well enhanced and combined with Google Map to display the number of patents in the countries on the map.
  
## Screenshots and Implementation images:

All the screenshots are attached in the solution for better visualization.
