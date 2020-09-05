# Interactive Tax Calculator

<p align='center'>
<img src="./readme_assets/basic_functionality.gif" height='400'/>
</p>

An interactive Google chrome extension that displays US post-tax prices when the user hovers mouse over price information on relevant webpages. Users may save the zip code information of multiple addresses for easy access, which is placed in local chrome.storage; tax rates for all US zip codes are stored on an SQlite database. 

## Features

<p align='center'>
<img src="./readme_assets/save_url3.gif" height='400'/>
</p>

### SQLite Database and Local chrome.storage

Chrome extension queries updated US tax rates from SQlite database, and saves the whitelisted sites on which the user wishes the extension to run on local chrome.storage. Extension automatically runs on sites once they have been whitelisted.

### Programatically Injected React Content Scripts

Users may toggle whether or not they wish to run the extension on the active webpage, to maximize privacy and code efficiency. Content scripts are written in React and HTML/CSS, and are programatically injected into the underlying webpage using the chrome.tabs API. 

---

<p align='center'>
<img src="./readme_assets/amazon_searches.gif" height='400'/>
</p>

### Wide Compatibility

Extension utilizes depth first search algorithms to locate price information across a variety of websites. Extension is regularly updated to be compatible with new sites.

---

<p align='center'>
<img src="./readme_assets/zipcode_management.gif" height='400'/>
</p>

### Personalized Zip Code Management

Users may save frequently used zip codes to local chrome.storage, allowing for easy accessibility of relevant
tax information. The extension maintains each user's zip code information as a hash table, enabling efficient addition, deletion, and editing of zip code information. 

---

<p align='center'>
<img src="./readme_assets/report.gif" height='400'/>
</p>

A report form is available, upon which users may give feedback and raise concerns, allowing for the timely address of any issues. 

---

## Authors

Doanh Tran, Linda Huang Sijia, Mina Prapakamol
