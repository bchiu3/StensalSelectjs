# StensalSelectjs
 A select-like element used for a bit more customization.
## Importing the element
---
Download the css & js and add this to your html:
```
<link rel="stylesheet" type="text/css" href="path-to-folder/selectjs.css"/>
<script defer src="path-to-folder/select.js" type="text/javascript" charset="UTF-8"></script>
```
## Starting/Making the element
-----
On your HTML add a div with any id. Ex:

**Also add a class to create a background color as the standard select does not have one**

```
<div id="tester" class="white-background"></div>
```

The call to the create the element works like so:

**Note: There should only be one call per element**
```
StensalSelect(id, options = [], option_values = [], defaultOnClick = null)
```
- Parameters

    1. *id* - string: mandatory value of the id of the div

    2. *options* - list of string: a list of labels/text to initially add

    3. *option_values* - list of string: list of values to initally add, must be either empty or the same length as options 
        - Note: If options is a non-empty list and option_values is empty, the text from options will act as the option_values
    4. *defaultOnClick* - function: changes all current and future values to also call this function when clicked
        - Note: The function will not override the default action (i.e. changing the selected value).

Example linking the HTML tag from above:
```
testerSelect = StensalSelect("tester", ["label1", "label2"], ["value1", "value2"], function(){console.log("clicked")});
```

## Member Functions
----

### Utility Functions
```
size() -> int
```
- Gets the amount of values there are in the select

```
includes(option: string) -> boolean
```
- Parameters
    
    1. *option*: label of the element

- Checks if the option is a member of the select; true if in there, false otherwise

```
includesValue(option_value: string) -> boolean
```
- Parameters
    
    1. *option_value*: value of the element

- Checks if the select has a member with the value of option_value; true if in there, false otherwise

### Getter Functions
---
```
getCurrentValue() -> string
```
- Gets the value of the selected element

```
getValuefromIndex(index: int) -> string
``` 
- Parameters
    
    1. *index*: index of the element

- Gets the value of the element at the index

```
getTextfromIndex(index: int) -> string
``` 
- Parameters
    
    1. *index*: index of the element

- Gets the lable of the element at the index

```
getValuefromText(option: string) -> string
``` 
- Parameters
    
    1. *option*: label of the element

- Gets the value of the element from the first occurence of the label of said element

```
getTextromValue(option_value: string) -> string
``` 
- Parameters
    
    1. *option_value*: value of the element

- Gets the label of the element from the value of said element

```
getIndexof(option: string) -> int
```
- Parameters
    
    1. *option*: label of the element

- Gets the index of the element from the first occurence of label of said element

```
getIndexofValue(option_value: string) -> int
```
- Parameters
    
    1. *option_value*: value of the element

- Gets the index of the element from the value of said element

### Setter Functions
----

```
setCurrentValue(option_value: string) -> null
```
- Parameters
    
    1. *option_value*: value of the element

- Sets the selected value to be the option_value; if option_value is not an element of the select, it will do nothing

### Modifier Functions
----
```
addValue(option: string, option_value = null: string) -> null
```
- Parameters
    
    1. *option*: label of the element
    2. *option_value*: value of the element, optional

- Adds a element to the select with label option and value option_value; if given no option_value, the value of the element will be option
    
    - Note: if this is the only element in the select, the selected element will have this label and value

```
removeValue(option_value: string) -> null
```

- Parameters

    1. *option_value*: value of the element

- Removes the element with option_value from the select

    - Note: if the element removing is the selected element, the value and label of the selected element will be the empty string

```
addValue(option: list of string, option_value = []: list of string) -> null
```
- Parameters
    
    1. *option*: list of the label of the element
    2. *option_value*: list of the value of the element, optional

- Adds elements to the select equal to the size of option and option_value; if given no option_value, the value of the element will be option
    
    - Note: if there is no element in the select initially, the first option and option value will be choosen as the selected element

```
removeValues(option_values: list of string) -> null
```
- Parameters

    1. *option_values*: list of value of the element

- Removes all elements that have a value corresponding to a string in option_values

    - Note: if the element removing is the selected element, the value and label of the selected element will be the empty string

```
removeValuesAll() -> null
```
- Removes all elements from the select and sets the value and label of the selected element to be the empty string

```
changeOnClick(index: int, selectfunc: function) -> null
```
- Parameters

    1. *index*: index of the element
    2. *selectfunc*: function to change to

- Changes the onclick behavior of the element at index to also call selectfunc

    - Note: The function will not override the default action (i.e. changing the selected value).

```
changeOnClickFull(index: int, selectfunc: function) -> null
```
- Parameters

    1. *index*: index of the element
    2. *selectfunc*: function to change to

- Changes the onclick behavior of the element at index to call selectfunc

    - Note: The function **will** override the default action (i.e. changing the selected value).

```
changeOnClickAll(selectfunc: function) -> null
```
- Parameters

    1. *selectfunc*: function to change to

- Changes the onclick behavior of all elements at index to also call selectfunc

    - Note: The function will not override the default action (i.e. changing the selected value).

```
changeOnClickFullAll(selectfunc: function) -> null
```
- Parameters

    1. *selectfunc*: function to change to

- Changes the onclick behavior of all elements at index to call selectfunc

    - Note: The function **will** override the default action (i.e. changing the selected value).

```
addClass(index: int, class_name: string) -> null
```
- Parameters

    1. *index*: index of the element
    2. *class_name*: string of the class name to change to

- Adds a class to the element at index based on class_name, does nothing if already assigned to the element

```
removeClass(index: int, class_name: string) -> null
```
- Parameters

    1. *index*: index of the element
    2. *class_name*: string of the class name to change to

- Removes a class to the element at index based on class_name, does nothing if class not in the element

```
addClassAll(class_name: string) -> null
```
- Parameters

    1. *class_name*: string of the class name to change to

- Adds a class to all elements of the select based on class_name, does nothing if already assigned to the element

```
removeClassAll(class_name: string) -> null
```
- Parameters

    1. *class_name*: string of the class name to change to

- Removes a class to all elements of the select based on class_name, does nothing if class not in the element

```
disable() -> null
```
- Disables the select such that the options will not show

```
enable() -> null
```
- Enables the select if the select was previously disabled