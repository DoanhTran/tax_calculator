# Interactive Tax Calculator

<p align='center'>
<img src="./readme_assets/tax_calc_functionality.gif" height='400'/>
</p>

An interactive Google chrome extension that displays US post-tax prices when the user hovers mouse over price information on relevant webpages. Users may save the zip code information of multiple addresses for easy access, which is placed in local chrome.storage; tax rates for all US zip codes are stored on an SQlite database. 

## Features

<p align='center'>
<img src="./readme_assets/save_website_url.gif" height='400'/>
</p>

### SQLite Database and Local chrome.storage

Chrome extension queries updated US tax rates from SQlite database, and stores the zip code information that the user wishes to save, as well as whitelisted sites on which the user wishes the extension to run, on a local chrome.storage. Extension automatically runs on sites once they have been whitelisted.

### Programatically Injected React Content Scripts

Users may toggle whether or not they wish to run the extension on the active webpage, to maximize privacy and code efficiency. Content scripts are written in React and HTML/CSS, and are programatically injected into the underlying webpage using the chrome.tabs API. 

---

<p align='center'>
<img src="./readme_assets/compatibility.gif" height='400'/>
</p>

### Wide Compatibility

Extension utilizes depth first search algorithms to locate price information across a variety of websites. Extension is regularly updated to be compatible with new sites.

---

## Authors

Doanh Tran, Linda Huang Sijia, Mina Prapakamol
