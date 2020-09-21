# Flexbox Layout in CuteStrap
Flexbox layout implementation in CuteStrap is based on the Flexbox CSS Feature. Its very close replica of  the Flexbox implemented in AngularJS Material Flexbox Layout.

## Layout Containers
Two type of layout containers are: ```.cs-layout-row``` and ```.cs-layout-column``` for row-wise and column-wise layout.
Row-wise layout places children in horizontal order, and column-wise layout places children in vertical order.

### Use of Row layout
To use row layout, you need to include ```.cs-layout-row``` in css classes of the parent element.

```html
    <element class="... cs-layout-row ...">
        ...
        ...
        children elements here...
        ...
        ...
    </element>
```
### Use of Column layout
To use row layout, you need to include ```.cs-layout-column``` in css classes of the parent element.

```html
    <element class="... cs-layout-column ...">
        ...
        ...
        children elements here...
        ...
        ...
    </element>
```
## Layout Child Elements
Anything appearing immediately under the layout containers are layout child elements. Initially child elements will have there own specified and height and width. Undefined width will cause the element to be shrinked to fit the content.

```html
    <parent_element class="... cs-layout-column ...">
        ...
        <child_element>
            ...
        </child_element>
        <child_element>
            ...
        </child_element>
        <child_element>
            ...
        </child_element>
        ...
    </parent_element>
```
- Include ```.cs-flex``` class and make the child a flex element which will grow or shrink as needed.
- Include ```.cs-flex-xx``` class and make the child a flex element with ```xx```, is a integer multiple of 5 from 5 to 100 (inclusive), defining the basis of flex element which defines the ratio of growth of element w.r.t. other elements in  the parent containers and max relative growth of the element.<br>
    - Note: If total sum of flex basis is greater than 100, then the sum will act as 100% of the parent container and each element's share will be its own span in the parent container. Container will not wrap the elements. To disable this attach ```.cs-flex-wrap``` class to parent, or you can define some minimum width or height of the children.

```html
    <parent class="... cs-layout-row ...">
        <child_element class="cs-flex">
            This element will grow or shrink as needed.
        </child_element>
        <child_element class="cs-flex-35">
            This element will grow max 35% width of the parent.
        </child_element>
    </parent>
```

### Grow and Shrink
This classes are applied to child elements which are wrapped by some ```.cs-layout-*``` class parents.

- ```.cs-flex-grow``` class makes the child flex element to be grown by default to span along the available space.
- ```.cs-flex-shrink``` class makes the child flex element to be shrinked by default to wrap the content.
- ```.cs-no-grow``` class disables default grow behavior of the child flex element.
- ```.cs-no-shrink``` class disables default shrink behavior the child flex element.
- ```.cs-spacer``` class makes a element spacer element which takes up available space in the parent container.

```html
    <parent class="... cs-layout-row ...">
        <child_element class="cs-flex-grow">
            This element will grow by default.
        </child_element>
        <child_element class="cs-flex-shrink">
            This element will shrink by default.
        </child_element>
    </parent>
```


### Child Elements Alignment
This classes are applied to child elements which are wrapped by some ```.cs-layout-*``` class parents. These classes aligns the holding element in perpendicular direction of the parent layout.

- ```.cs-self-align-start``` class makes the flex element to be aligned to the start of the parent container.
- ```.cs-self-align-center``` class makes the flex element to be aligned to the center of the parent container.
- ```.cs-self-align-end``` class makes the flex element to be aligned to the end of the parent container.
- ```.cs-self-align-stretch``` class makes the flex element to be stretched along the parent container.

```html
    <parent class="... cs-layout-row ...">
        <child_element class="cs-flex-grow">
            This element will grow by default.
        </child_element>
        <child_element class="cs-flex-shrink">
            This element will shrink by default.
        </child_element>
    </parent>
```

### Show or Hide elements
- ```.cs-hide``` class hides the element.
- ```.cs-show``` class sets the display of element to initial.

```html
    <parent class="... cs-layout-row ...">
        <child_element class="cs-hide">
            This element will not be shown by default.
        </child_element>
    </parent>
```

## Alignment in Layout

Flex layout allows you to define the alignment of child elements as follows:

- in-direction: 
    - **start**: places elements in start position.
    - **center**: places elements in center position
    - **end**: places elements in end position
    - **space-between**: places elements from start to end position and add space between them.
    - **space-around**: places elements from start to end position and add space around them.

- cross-direction:
    - **start**: places elements in start position with cross-direction.
    - **end**: places elements in end position with cross-direction.
    - **center**: places elements in center position with cross-direction.
    - **stretch**: stretches elements along the cross-direction.

- **in-direction** is the direction of layout.
    - For Row Layout its horizontal direction.
    - For Column Layout its vertical direction
- **cross-direction** is perpendicular direction of the layout.
    - For Row Layout its vertical direction.
    - For Column Layout its horizontal direction.

To apply layout alignment its need to attach the alignment class mentioning both direction alignment one after another. ,<br>Pattern is ```.cs-in-derection-cross-direction```

Example:
    ```.cs-center-stretch``` class applies **center** alignment in *in-direction* and **stretch** alignment in *cross-direction*.

```html
    <parent class="... cs-layout-row cs-center-stretch...">
        <child_element>
            These elements will be centered row-wise and streched column-wise.
        </child_element>
        <child_element>
            Or we can say, These elements will be centered horizontally and streched vertically.
        </child_element>
    </parent>

    <parent class="... cs-layout-column cs-center-stretch...">
        <child_element>
            These elements will be centered column-wise and streched row-wise.
        </child_element>
        <child_element>
            Or we can say, These elements will be centered vertically and streched horizontally.
        </child_element>
    </parent>
```

## Responsive Layout

Flex layout also responds to screen sizes. Following are the breakpoints defined for screen size classes.

- **xs**:       
    - Applies to extra small screens having screen width less than 600px;
- **gt-xs**:    
    - Applies to all screen sizes having width greater than or equal to 600px;
- **sm**:       
    - Applies to all screen sizes having width in range 600px to less than 960px;
- **gt-sm**:    
    - Applies to all screen sizes having width greater than or equal to 960px;
- **md**:      
    - Applies to all screen sizes having width in range 960px to less than 1280px;
- **gt-md**:   
    - Applies to all screen sizes having width greater than or equal to 1280px;
- **lg**:      
    - Applies to all screen sizes having width in range 1280px to less than 1920px;
- **xl**:      
    - Applies to all screen sizes having width greater than or equal to 1920px;

To apply screen size specific layout properties, you need to add above breakpoints into the layout classes. <br>
Pattern: ```.cs-breakpoint-...``` <br>

For Example,<br>

```html
    <parent class="... cs-sm-layout-column cs-m-layout-row ...">
        <child_element>
            Layout Column will be applied to Small Screens.
        </child_element>
        <child_element>
            On Medium Screen sizes Layout Row will be applied.
        </child_element>
    </parent>

    <parent class="...cs-layout-row cs-gt-m-layout-column...">
        <child_element>
            Default layout is row. But on screen larger than medium screens the layout will be Column Layout.
        </child_element>
        <child_element class="cs-m-hide">
            This element will be hidden on Medium Screens only.
        </child_element>
    </parent>
```