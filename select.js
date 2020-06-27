'use strict';

const StensalSelect = function(id, options = [], option_values = [], defaultOnClick = null)
{
    const exports = {};

    const addHTML = function()
    {
        select_element.innerHTML = '<div class="stensal-select-select"> <div class="stensal-select-select-trigger"> <span class="stensal-select-padding"> </span> <div class="arrow"></div></div><div class="stensal-select-options"></div></div>';
        const select_element_menu = select_element.getElementsByClassName('stensal-select-options')[0];
        for (var i = 0; i < select_element.classList.length; ++i)
        {
            select_element_menu.classList.add(select_element.classList[i]);
        }
        select_element.classList.add('stensal-select-select-wrapper');
    }

    const addSelect = function(option, option_value)
    {
        const opt = document.createElement('span');
        opt.classList.add('stensal-select-option');
        opt.textContent = option;
        opt.dataset.value = option_value;
        if (_default_on_click != null)
        {
            opt.onclick = function()
            {
                changeCurrentSelectorValue(opt);
                _default_on_click();
            }
        }
        else
        {
            opt.onclick = function()
            {
                changeCurrentSelectorValue(opt);
            }
        }
        select_element_menu.appendChild(opt);
    }
    
    const changeCurrentSelectorValue = function(select_v)
    {
        if (!select_v.classList.contains('selected')) {
            if (select_v.parentElement.getElementsByClassName('stensal-select-option selected').length != 0)
            {
                select_v.parentElement.getElementsByClassName('stensal-select-option selected')[0].classList.remove('selected');
            }
            select_v.classList.add('selected');
            select_element.dataset.value = select_v.dataset.value;
            select_element_display.textContent = select_v.textContent;
        }
    }

    exports.size = function()
    {
        return select_element_menu.children.length;
    }

    exports.includes = function(option)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].textContent == option)
            {
                return true;
            }
        }
        return false
    }

    exports.includesValue = function(option_value)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].dataset.value == option_value)
            {
                return true;
            }
        }
        return false;
    }
    
    exports.getCurrentValue = function()
    {
        return select_element.dataset.value;
    }

    exports.getValuefromIndex = function(index)
    {
        return select_element_menu.children[index].dataset.value;
    }

    exports.getTextfromIndex = function(index)
    {
        return select_element_menu.children[index].textContent;
    }

    exports.getValuefromText = function(option)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].textContent == option)
            {
                return select_element_menu.children[i].dataset.value;
            }
        }
        return null;
    }

    exports.getTextfromValue = function(option_value)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].dataset.value == option_value)
            {
                return select_element_menu.children[i].textContent;
            }
        }
        return null;
    }

    exports.getIndexof = function(option)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].textContent == option)
            {
                return i;
            }
        }
        return -1;
    }

    exports.getIndexofValue = function(option_value)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].dataset.value == option_value)
            {
                return i;
            }
        }
        return -1;
    }

    exports.setCurrentValue = function(option_value)
    {
        var i = 0;
        for (i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].dataset.value == option_value)
            {
                changeCurrentSelectorValue(select_element_menu.children[i]);
                break;
            }
        }
        if (i >= select_element_menu.children.length)
        {
            console.log("StensalSelect.setCurrentValue(" + option_value + "): option_value not found in " + id + ".");
        }
    }

    const addValue = exports.addValue = function(option, option_value = null)
    {
        addSelect(option, ((option_value != null) ? option_value : option));
        if (select_element_menu.children.length == 1)
        {
            changeCurrentSelectorValue(select_element_menu.children[0]);
        }
    }

    const removeValue = exports.removeValue = function(option_value)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            if (select_element_menu.children[i].dataset.value == option_value)
            {
                select_element_menu.removeChild(select_element_menu.childNodes[i]);
            }
        }
        if (select_element.dataset.value == option_value)
        {
            if (select_element_menu.children.length > 0)
            {
                select_element_display.textContent = select_element_menu.children[0].textContent;
                select_element.dataset.value = select_element_menu.children[0].dataset.value;
            }
            else
            {
                select_element_display.textContent = "";
                select_element.dataset.value = "";
            }
        }
    }

    exports.addValues = function(options, option_values = [])
    {
        if (option_values.length != options.length && option_values.length != 0)
        {
            console.log("StensalSelect.addValues(" + options +", " + option_values + "): Improper length of option_values for " + id + ".");
            return;
        }
        for (var i = 0; i < options.length; ++i)
        {
            addValue(options[i], ((option_values.length != options.length) ? options[i] : option_values[i]));
        }
    }

    exports.removeValues = function(option_values)
    {
        for (var i = 0; i < option_values.length; ++i)
        {
            removeValue(option_values[i]);
        }
    }

    exports.removeValuesAll = function()
    {
        while (select_element_menu.firstChild)
        {
            select_element_menu.removeChild(select_element_menu.firstChild);
        }
        select_element_display.textContent = "";
        select_element.dataset.value = "";
    }

    exports.changeOnClickDefault = function(selectfunc)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            changeOnClick(i, selectfunc);
        }
    }

    const changeOnClick = exports.changeOnClick = function(index, selectfunc)
    {
        select_element_menu.children[index].onclick = function()
        {
            changeCurrentSelectorValue(this);
            selectfunc();
        }
    }

    const changeOnClickFull = exports.changeOnClickFull = function(index, selectfunc)
    {
        console.log(select_element_menu.children[index]);
        select_element_menu.children[index].onclick = function()
        {
            selectfunc();
        }
    }

    exports.changeOnClickAll = function(selectfunc)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            changeOnClick(i, selectfunc);
        }
    }

    exports.changeOnClickFullAll = function(selectfunc)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            changeOnClickFull(i, selectfunc);
        }
    }

    const addClass = exports.addClass = function(index, class_name)
    {
        if (!select_element_menu.children[index].classList.contains(class_name))
        {
            select_element_menu.children[index].classList.add(class_name);
        }
        else
        {
            console.log("StensalSelect.addClass(" + index + ", " + class_name + "): class already exists in" + 
            " node with value \"" + select_element_menu.children[index].dataset.value + "\" and text \"" 
            + select_element_menu.children[index].textContent + "\".")
        }
    }

    const removeClass = exports.removeClass = function(index, class_name)
    {
        if (select_element_menu.children[index].classList.contains(class_name))
        {
            select_element_menu.children[index].classList.remove(class_name);
        }
        else
        {
            console.log("StensalSelect.removeClass(" + index + ", " + class_name + "): class does not exist in" + 
            " node with value \"" + select_element_menu.children[index].dataset.value + "\" and text \"" 
            + select_element_menu.children[index].textContent + "\".")
        }
    }
    
    exports.addClassAll = function(class_name)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            addClass(i, class_name);
        }
    }

    exports.removeClassAll = function(class_name)
    {
        for (var i = 0; i < select_element_menu.children.length; ++i)
        {
            removeClass(i, class_name);
        }
    }

    exports.disable = function()
    {
        if (!select_element.getElementsByClassName('stensal-select-select')[0].classList.contains('stensal-select-disabled'))
        {
            select_element.getElementsByClassName('stensal-select-select')[0].classList.add('stensal-select-disabled');
        }
    }

    exports.enable = function()
    {
        if (select_element.getElementsByClassName('stensal-select-select')[0].classList.contains('stensal-select-disabled'))
        {
            select_element.getElementsByClassName('stensal-select-select')[0].classList.remove('stensal-select-disabled');
        }
    }

    

    //constructor
    if (option_values.length != options.length && option_values.length != 0)
    {
        console.log("StesalSelect(" + id + ", " + options +", " + option_values + "): Improper length of option_values");
        return;
    }
    const _id = exports.id = id;
    var _options = options;
    var _option_values = option_values;
    const _default_on_click = defaultOnClick;
    const select_element = document.getElementById(id);
    addHTML();
    const select_element_display = select_element.getElementsByClassName('stensal-select-select-trigger')[0].getElementsByTagName('span')[0];
    const select_element_menu = select_element.getElementsByClassName('stensal-select-options')[0];
    for (var i = 0; i < options.length; ++i)
    {
        addSelect(options[i], ((option_values.length == options.length) ? option_values[i] : options[i]));
        if (option_values.length != options.length)
        {
            _option_values.push(options[i]);
        }
    }
    if (options.length > 0)
    {
        select_element.dataset.value = _option_values[0];
        select_element_display.textContent = _options[0];
        select_element_menu.children[0].classList.add('selected');
    }
    else
    {
        select_element.dataset.value = "";
        select_element_display.textContent = "";
    }

    select_element.onclick =  function() {
        if (!this.getElementsByClassName('stensal-select-select')[0].classList.contains('stensal-select-disabled')){
            this.getElementsByClassName('stensal-select-select')[0].classList.toggle('open');
        }
    }

    window.onclick = function(e) {
        for (const select of document.getElementsByClassName('stensal-select-select')) {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        }
    };  

    return exports;
}

const configurationSelector = StensalSelect("configuration-selector", ["build", "Edit Configs"], ["build", "edit config"]);
const changeConfig = function()
{
    console.log("config: " + configurationSelector.getCurrentValue() + " is selected.");
    Cee.coder.update_project_settings(function (model) {
        model["+configuration-selected"] = configurationSelector.getCurrentValue();
    });
};
configurationSelector.changeOnClickAll(changeConfig);
configurationSelector.changeOnClickFull(configurationSelector.size()-1, Cee.coder.async_openProjectConfiguration);
const recordingSelector = StensalSelect("recording-selector", ["Points-to", "Inaccessible"], ["points-to", "inaccessible"]);