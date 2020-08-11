# Interactive Tax Calculator
<p align='center'>
<img src="./readme_assets/tax_calc_functionality.gif" height='300'/>
</p>

An interactive tax calculator extension that displays US post-tax prices when the user hovers mouse over price information on relevant webpages. Users may save the zip code information of multiple addresses for easy access, which is placed in local chrome.storage; tax rates for all US zip codes are stored on an SQlite database. 

## Features

### SQLite Database and Local chrome.storage

Chrome extension queries updated US tax rates from SQlite database, and stores zip code information that user wishes to save, as well as whitelisted sites that user wishes to run their extension on a local chrome.storage.

### Programatically Injected React Content Scripts

Users may toggle whether or not they wish to run the extension on the active webpage, to maximize privacy and code efficiency. Content scripts are written in React and HTML/CSS, and are programatically injected into the underlying webpage using the chrome.tabs API. 

### Authors

Doanh Tran, Linda Huang Sijia, Mina Prapakamol