export interface WidgetConfig{
    alignContent:string;												//Sets or returns the alignment between the lines inside a flexible container when the items do not use all available space
    alignItems:string;													//Sets or returns the alignment for items inside a flexible container
    alignSelf:string;													//Sets or returns the alignment for selected items inside a flexible container
    animation:string;													//A shorthand property for all the animation properties below, except the animationPlayState property
    animationDelay:string;												//Sets or returns when the animation will start
    animationDirection:string;											//Sets or returns whether or not the animation should play in reverse on alternate cycles
    animationDuration:string;											//Sets or returns how many seconds or milliseconds an animation takes to complete one cycle
    animationFillMode:string;											//Sets or returns what values are applied by the animation outside the time it is executing
    animationIterationCount:string;										//Sets or returns the number of times an animation should be played
    animationName:string;												//Sets or returns a name for the @keyframes animation
    animationTimingFunction:string;										//Sets or returns the speed curve of the animation
    animationPlayState:string;											//Sets or returns whether the animation is running or paused
    background:string;													//Sets or returns all the background properties in one declaration
    backgroundAttachment:string;										//Sets or returns whether a background-image is fixed or scrolls with the page
    backgroundColor:string;												//Sets or returns the background-color of an element
    backgroundImage:string;												//Sets or returns the background-image for an element
    backgroundPosition:string;											//Sets or returns the starting position of a background-image
    backgroundRepeat:string;											//Sets or returns how to repeat (tile) a background-image
    backgroundClip:string;												//Sets or returns the painting area of the background
    backgroundOrigin:string;											//Sets or returns the positioning area of the background images
    backgroundSize:string;												//Sets or returns the size of the background image
    backfaceVisibility:string;											//Sets or returns whether or not an element should be visible when not facing the screen
    border:string;														//Sets or returns borderWidth, borderStyle, and borderColor in one declaration
    borderBottom:string;												//Sets or returns all the borderBottom* properties in one declaration
    borderBottomColor:string;											//Sets or returns the color of the bottom border
    borderBottomLeftRadius:string;										//Sets or returns the shape of the border of the bottom-left corner
    borderBottomRightRadius:string;										//Sets or returns the shape of the border of the bottom-right corner
    borderBottomStyle:string;											//Sets or returns the style of the bottom border
    borderBottomWidth:string;											//Sets or returns the width of the bottom border
    borderCollapse:string;												//Sets or returns whether the table border should be collapsed into a single border, or not
    borderColor:string;													//Sets or returns the color of an element's border (can have up to four values)
    borderImage:string;													//A shorthand property for setting or returning all the borderImage* properties
    borderImageOutset:string;											//Sets or returns the amount by which the border image area extends beyond the border box
    borderImageRepeat:string;											//Sets or returns whether the image-border should be repeated, rounded or stretched
    borderImageSlice:string;											//Sets or returns the inward offsets of the image-border
    borderImageSource:string;											//Sets or returns the image to be used as a border
    borderImageWidth:string;											//Sets or returns the widths of the image-border
    borderLeft:string;													//Sets or returns all the borderLeft* properties in one declaration
    borderLeftColor:string;												//Sets or returns the color of the left border
    borderLeftStyle:string;												//Sets or returns the style of the left border
    borderLeftWidth:string;												//Sets or returns the width of the left border
    borderRadius:string;												//A shorthand property for setting or returning all the four border*Radius properties
    borderRight:string;													//Sets or returns all the borderRight* properties in one declaration
    borderRightColor:string;											//Sets or returns the color of the right border
    borderRightStyle:string;											//Sets or returns the style of the right border
    borderRightWidth:string;											//Sets or returns the width of the right border
    borderSpacing:string;												//Sets or returns the space between cells in a table
    borderStyle:string;													//Sets or returns the style of an element's border (can have up to four values)
    borderTop:string;													//Sets or returns all the borderTop* properties in one declaration
    borderTopColor:string;												//Sets or returns the color of the top border
    borderTopLeftRadius:string;											//Sets or returns the shape of the border of the top-left corner
    borderTopRightRadius:string;										//Sets or returns the shape of the border of the top-right corner
    borderTopStyle:string;												//Sets or returns the style of the top border
    borderTopWidth:string;												//Sets or returns the width of the top border
    borderWidth:string;													//Sets or returns the width of an element's border (can have up to four values)
    bottom:string;														//Sets or returns the bottom position of a positioned element
    boxDecorationBreak:string;											//Sets or returns the behaviour of the background and border of an element at page-break, or, for in-line elements, at line-break.
    boxShadow:string;													//Attaches one or more drop-shadows to the box
    boxSizing:string;													//Allows you to define certain elements to fit an area in a certain way
    captionSide:string;													//Sets or returns the position of the table caption
    clear:string;														//Sets or returns the position of the element relative to floating objects
    clip:string;														//Sets or returns which part of a positioned element is visible
    color:string;														//Sets or returns the color of the text
    columnCount:string;													//Sets or returns the number of columns an element should be divided into
    columnFill:string;													//Sets or returns how to fill columns
    columnGap:string;													//Sets or returns the gap between the columns
    columnRule:string;													//A shorthand property for setting or returning all the columnRule* properties
    columnRuleColor:string;												//Sets or returns the color of the rule between columns
    columnRuleStyle:string;												//Sets or returns the style of the rule between columns
    columnRuleWidth:string;												//Sets or returns the width of the rule between columns
    columns:string;														//A shorthand property for setting or returning columnWidth and columnCount
    columnSpan:string;													//Sets or returns how many columns an element should span across
    columnWidth:string;													//Sets or returns the width of the columns
    content:string;														//Used with the :before and :after pseudo-elements, to insert generated content
    counterIncrement:string;											//Increments one or more counters
    counterReset:string;												//Creates or resets one or more counters
    cursor:string;														//Sets or returns the type of cursor to display for the mouse pointer
    direction:string;													//Sets or returns the text direction
    display:string;														//Sets or returns an element's display type
    emptyCells:string;													//Sets or returns whether to show the border and background of empty cells, or not
    filter:string;														//Sets or returns image filters (visual effects, like blur and saturation)
    flex:string;														//Sets or returns the length of the item, relative to the rest
    flexBasis:string;													//Sets or returns the initial length of a flexible item
    flexDirection:string;												//Sets or returns the direction of the flexible items
    flexFlow:string;													//A shorthand property for the flexDirection and the flexWrap properties
    flexGrow:string;													//Sets or returns how much the item will grow relative to the rest
    flexShrink:string;													//Sets or returns how the item will shrink relative to the rest
    flexWrap:string;													//Sets or returns whether the flexible items should wrap or not
    cssFloat:string;													//Sets or returns the horizontal alignment of an element
    font:string;														//Sets or returns fontStyle, fontVariant, fontWeight, fontSize, lineHeight, and fontFamily in one declaration
    fontFamily:string;													//Sets or returns the font family for text
    fontSize:string;													//Sets or returns the font size of the text
    fontStyle:string;													//Sets or returns whether the style of the font is normal, italic or oblique
    fontVariant:string;													//Sets or returns whether the font should be displayed in small capital letters
    fontWeight:string;													//Sets or returns the boldness of the font
    fontSizeAdjust:string;												//Preserves the readability of text when font fallback occurs
    fontStretch:string;													//Selects a normal, condensed, or expanded face from a font family
    hangingPunctuation:string;											//Specifies whether a punctuation character may be placed outside the line box
    height:string;														//Sets or returns the height of an element
    hyphens:string;														//Sets how to split words to improve the layout of paragraphs
    icon:string;														//Provides the author the ability to style an element with an iconic equivalent
    imageOrientation:string;											//Specifies a rotation in the right or clockwise direction that a user agent applies to an image
    justifyContent:string;												//Sets or returns the alignment between the items inside a flexible container when the items do not use all available space.
    left:string;														//Sets or returns the left position of a positioned element
    letterSpacing:string;												//Sets or returns the space between characters in a text
    lineHeight:string;													//Sets or returns the distance between lines in a text
    listStyle:string;													//Sets or returns listStyleImage, listStylePosition, and listStyleType in one declaration
    listStyleImage:string;												//Sets or returns an image as the list-item marker
    listStylePosition:string;											//Sets or returns the position of the list-item marker
    listStyleType:string;												//Sets or returns the list-item marker type
    margin:string;														//Sets or returns the margins of an element (can have up to four values)
    marginBottom:string;												//Sets or returns the bottom margin of an element
    marginLeft:string;													//Sets or returns the left margin of an element
    marginRight:string;													//Sets or returns the right margin of an element
    marginTop:string;													//Sets or returns the top margin of an element
    maxHeight:string;													//Sets or returns the maximum height of an element
    maxWidth:string;													//Sets or returns the maximum width of an element
    minHeight:string;													//Sets or returns the minimum height of an element
    minWidth:string;													//Sets or returns the minimum width of an element
    navDown:string;														//Sets or returns where to navigate when using the arrow-down navigation key
    navIndex:string;													//Sets or returns the tabbing order for an element
    navLeft:string;														//Sets or returns where to navigate when using the arrow-left navigation key
    navRight:string;													//Sets or returns where to navigate when using the arrow-right navigation key
    navUp:string;														//Sets or returns where to navigate when using the arrow-up navigation key
    opacity:string;														//Sets or returns the opacity level for an element
    order:string;														//Sets or returns the order of the flexible item, relative to the rest
    orphans:string;														//Sets or returns the minimum number of lines for an element that must be left at the bottom of a page when a page break occurs inside an element
    outline:string;														//Sets or returns all the outline properties in one declaration
    outlineColor:string;												//Sets or returns the color of the outline around a element
    outlineOffset:string;												//Offsets an outline, and draws it beyond the border edge
    outlineStyle:string;												//Sets or returns the style of the outline around an element
    outlineWidth:string;												//Sets or returns the width of the outline around an element
    overflow:string;													//Sets or returns what to do with content that renders outside the element box
    overflowX:string;													//Specifies what to do with the left/right edges of the content, if it overflows the element's content area
    overflowY:string;													//Specifies what to do with the top/bottom edges of the content, if it overflows the element's content area
    padding:string;														//Sets or returns the padding of an element (can have up to four values)
    paddingBottom:string;												//Sets or returns the bottom padding of an element
    paddingLeft:string;													//Sets or returns the left padding of an element
    paddingRight:string;												//Sets or returns the right padding of an element
    paddingTop:string;													//Sets or returns the top padding of an element
    pageBreakAfter:string;												//Sets or returns the page-break behavior after an element
    pageBreakBefore:string;												//Sets or returns the page-break behavior before an element
    pageBreakInside:string;												//Sets or returns the page-break behavior inside an element
    perspective:string;													//Sets or returns the perspective on how 3D elements are viewed
    perspectiveOrigin:string;											//Sets or returns the bottom position of 3D elements
    position:string;													//Sets or returns the type of positioning method used for an element (static, relative, absolute or fixed)
    quotes:string;														//Sets or returns the type of quotation marks for embedded quotations
    resize:string;														//Sets or returns whether or not an element is resizable by the user
    right:string;														//Sets or returns the right position of a positioned element
    tableLayout:string;													//Sets or returns the way to lay out table cells, rows, and columns
    tabSize:string;														//Sets or returns the length of the tab-character
    textAlign:string;													//Sets or returns the horizontal alignment of text
    textAlignLast:string;												//Sets or returns how the last line of a block or a line right before a forced line break is aligned when text-align is "justify"
    textDecoration:string;												//Sets or returns the decoration of a text
    textDecorationColor:string;											//Sets or returns the color of the text-decoration
    textDecorationLine:string;											//Sets or returns the type of line in a text-decoration
    textDecorationStyle:string;											//Sets or returns the style of the line in a text decoration
    textIndent:string;													//Sets or returns the indentation of the first line of text
    textJustify:string;													//Sets or returns the justification method used when text-align is "justify"
    textOverflow:string;												//Sets or returns what should happen when text overflows the containing element
    textShadow:string;													//Sets or returns the shadow effect of a text
    textTransform:string;												//Sets or returns the capitalization of a text
    top:string;															//Sets or returns the top position of a positioned element
    transform:string;													//Applies a 2D or 3D transformation to an element
    transformOrigin:string;												//Sets or returns the position of transformed elements
    transformStyle:string;												//Sets or returns how nested elements are rendered in 3D space
    transition:string;													//A shorthand property for setting or returning the four transition properties
    transitionProperty:string;											//Sets or returns the CSS property that the transition effect is for
    transitionDuration:string;											//Sets or returns how many seconds or milliseconds a transition effect takes to complete
    transitionTimingFunction:string;									//Sets or returns the speed curve of the transition effect
    transitionDelay:string;												//Sets or returns when the transition effect will start
    unicodeBidi:string;													//Sets or returns whether the text should be overridden to support multiple languages in the same document
    verticalAlign:string;												//Sets or returns the vertical alignment of the content in an element
    visibility:string;													//Sets or returns whether an element should be visible
    whiteSpace:string;													//Sets or returns how to handle tabs, line breaks and whitespace in a text
    width:string;														//Sets or returns the width of an element
    wordBreak:string;													//Sets or returns line breaking rules for non-CJK scripts
    wordSpacing:string;													//Sets or returns the spacing between words in a text
    wordWrap:string;													//Allows long, unbreakable words to be broken and wrap to the next line
    widows:string;														//Sets or returns the minimum number of lines for an element that must be visible at the top of a page
    zIndex:string;														//Sets or returns the stack order of a positioned element
}