# BOARDeaux
Screening test for LupSeat project. Description provided by Dr. Joël Porquet-Lupine:
> Write a web page containing a Javascript widget that allows the user to populate a table of students (name, email, level) interactively. The level field should be one of “{first,second,third,fourth}-year”. It should be also possible to edit any line of the table (not necessarily inside the table itself though –up to you). Your code should make sure that fields are validated before the input is inserted in the table.
> - Code that doesn’t rely on external libraries is strongly encouraged. Ideally, it should be all self-contained.

## Usage

In command line, go to the directory where index.js is and run:

```
$ node index.js
```
To kill server:
```
$ ^C
```
## To-Do
- **HIGH PRIORITY**: Populated with for loops for current testing, use a better method (UCD student pop: ~35000)
- **HIGH PRIORITY**: Toggle for edit
- **HIGH PRIORITY**: Send new data to server and populate (w/o communicating server?) new data after edit
- MEDIUM PRIORITY: Function that manages the size of table and implements pagination accordingly
	- First, previous, next, last (Buttons hidden according to which page and how many pages)
- MEDIUM PRIORITY: Search funtion with good search algorithm and populate in real time
- LOW PRIORITY: Button for table refresh
- LOW PRIORITY: Button for table download
- LOW PRIORITY: Button for row delete