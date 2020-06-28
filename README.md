# StensalSelectjs
 A select-like element used for a bit more customization.
## Importing the element
Download the css & js and add this to your html:
```
<link rel="stylesheet" type="text/css" href="path-to-folder/selectjs.css"/>
<script defer src="path-to-folder/select.js" type="text/javascript" charset="UTF-8"></script>
```
## Starting/Making the element
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
var testerSelect = StensalSelect("tester", ["label1", "label2"], ["value1", "value2"], function(){console.log("clicked")});
```

## Basic Member Functions

## Main Modification Functions
```
addValue(option, option_value = null) -> null
removeValue(option_value) -> null
removeValueAll() ->
```
Use addValue() to add a value and removeValue() to remove a value. RemoveValueAll() removes all values.

Note: removeValue() removes based on value of the element and not the text of the element.

Ex:
```
testerSelect.addValue("label3", "value3");
testerSelect.removeValue("value1");
```

## Main Getter Functions

```
getCurrentValue() -> string
includes(option) -> boolean
includesValue(option_value) -> boolean
```
getCurrentValue() gets the current value of the select. Includes() checks if the text is in the select; includesValue() checks based on value rather than text.

Ex:
```
testerSelect.getCurrentValue();
if (testerSelect.includes("label2"))
{
 console.log("label2 here!");
}
if (testerSelect.includes("select2"))
{
 console.log("select2 here!");
}
```

## Main Setter Functions

```
setCurrentValue(option_value) -> null
```
setCurrentValue() sets the current value of the select. If it's not there, it will do nothing.

Ex:
```
testerSelect.setCurrentValue("value2");
```

## Main OnClick Functions 

```
changeOnClick(index: int, selectfunc: function) -> null
changeOnClickFull(index: int, selectfunc: function) -> null
```
changeOnClick() changes the option at index to also call selectfunc when clicked. changeOnClickFull() changes a function at index to call selectfunc when clicked. The difference is that changeOnClick() also makes the default clicking/selecting work while changeOnClickFull() will disable that.

Ex:
```
testerSelect.changeOnClickFull(1, function(){console.log("clicked");})
testerSelect.changeOnClick(1, function(){console.log("clicked");})
```

## Main Class Modification Functions
```
addClass(index: int, class_name: string) -> null
removeClass(index: int, class_name: string) -> null
```
addClass() adds a class class_name to the element at index. removeClass() removes that class at the element in index; if the class doesn't exist in that element, it does nothing.

Ex:
```
testerSelect.addClass(0, "blue-background");
testerSelect.removeClass(0, "blue-background");
```

## Main Disabling Functions
```
disable() -> null
enable() -> null
```
disable() disables the select as it would in a normal select element. enable() enables it back. Both calls will do nothing if it is disabled/enabled already.

Ex:
```
testerSelect.disable();
testerSelect.enable();
```
