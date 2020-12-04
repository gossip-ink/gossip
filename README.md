# Gossip 1.0

- [Gossip 1.0](#gossip-10)
  - [Overview](#overview)
  - [Get started](#get-started)
  - [Why is it](#why-is-it)
    - [Hard to author a presentation](#hard-to-author-a-presentation)
    - [Hard to delivery a presentation](#hard-to-delivery-a-presentation)
  - [Author a presentation](#author-a-presentation)
    - [Generating: Idea](#generating-idea)
    - [Organizing: Outline and Thumbnails](#organizing-outline-and-thumbnails)
    - [Composing: Main and Element](#composing-main-and-element)
    - [Revising: Style and Variable](#revising-style-and-variable)
  - [Delivery a presentation](#delivery-a-presentation)
    - [Switch animation: Zoom in, Zoom out, Rotate](#switch-animation-zoom-in-zoom-out-rotate)
    - [Overview: Word Cloud mode](#overview-word-cloud-mode)
  - [Limitations](#limitations)
  - [Future works](#future-works)
  - [How to contribute](#how-to-contribute)
  - [Technology stack](#technology-stack)
  
## Overview

Gossip is an online user interface to create awesome presentation efficiently. If you are in China you can try it [here](https://pearmini.gitee.io/gossip/), otherwise [here](https://pearmini.github.io/gossip/). Please use Chrome, Firefox or Safari for better experience.

There is a view in [**Sapiens: A Brief History of Humankind**](https://en.wikipedia.org/wiki/Sapiens:_A_Brief_History_of_Humankind) that the ability to tell and share stories makes humans far more strong than animals, because stories allow us to trust strangers which led to large-scale cooperation.

Presentation is a good way of telling and sharing stories, and gossip is one the favorite kinds of story which we talk anytime. So I name the software as **Gossip** in order to build a tool that enable users to create and tell stories more efficient and convenient.

**Make you next PPT not a PPT.**

![edit mode](./screenshots/edit_mode.png)

![word cloud](./screenshots/screening_mode.png)

## Get started

There is a [tutorials in Chinese](./tutorials.zh.md) to familiarize you with all the techniques you need know to author and delivery presentation by Gossip. And there is a upcoming tutorials in English.

## Why is it

Gossip is inspired by [impress.js](https://github.com/impress/impress.js). Although impress.js is impressive, it is also hard to use because you must code... In the meantime, existing tools to author and delivery presentation do have some problems which can't be ignored.

### Hard to author a presentation

On the one hand, existing tools make the authors pay more attention on graphics design of each slide, rather than the efficiency of transmitting information and the whole structure of the presentation.

The presenter ultimately has to decide what information will be included in the presentation, **how that information will be organized, and how to best turn that organization into a story for the target audience.**

### Hard to delivery a presentation

On the other hand, it is difficult for existing tools to provide the audience more context to hold their interest during delivering presentation, such as the individual slides relate to one another or how they fit into the larger structure of the presentation.

As a result, **they are often inadequate in helping presenter communicate the structure of a presentation to the audience.**

Next, there is a introduction to the workflow of Gossip which will show what makes Gossip unique.

## Author a presentation

Past research analyzed several models of authoring text and identified four common components in these models including: **generating**, **organizing**, **composing**, **revising**. The process of author presentation is very similar to authoring text, only it includes images and other multimedia. So Gossip are designed according to the four components.

### Generating: Idea

**The generating component is where ideas are collected and recorded.** These ideas can come from the author's introspection or from external sources.

When using traditional presentation software, there's no place for presenters to collect and record ideas, they must use other related software to do so. But there is a *Idea* panel in Gossip where users can collect and record scattered thoughts at the first stage of author a presentation.

![Idea panel](./screenshots/idea.png)

The idea can be text, image or even code.

![Idea pre](./screenshots/idea.gif)

### Organizing: Outline and Thumbnails

**The organizing component involves making decisions about abstractions and ordering leading to hierarchical and linear structures.**

Most of presentation tools allow presenters to organize slides in linear mode which is hard to understand or change the hierarchical relationship among them. Some tools enables users to order hierarchical structures, such as [Keynote](https://www.apple.com/keynote/) or [Prezi](https://prezi.com/), but they are still good enough.

In Gossip, there is a *Outline* panel to help presenters to make a clear hierarchical efficiently. Also a *Thumbnail* panel is provided to preview the whole presentation.

<img src="./screenshots/outline.png" height="300px">&emsp;<img src="./screenshots/thumbnail.png" height="300px">

In *Outline* panel, when presenter creates a new point node, Gossip will automatically create a slide for it. And users can simply drag a node to modify the linear order or hierarchical structure of the presentation rather than dragging many nodes for a slight change.

![outline](./screenshots/outline.gif)

### Composing: Main and Element

**In the composing stage, the author takes the structure developed in the generating and organization stages and turns it into an actual usable product.**

At this stage, it often requires a lot of drag and align operations to set the right position or size of each elements(texts, images, etc.) which is very time-consuming and annoying. This is because there is no constrains between elements which means users have to layout elements manually.

But it is possible to add constrains for elements according to logical structure, so Gossip allows user to organize elements in hierarchical structure in *Element* panel and changes in *Element* panel will reflect to *Maini* panel.

<img src="./screenshots/element.png" height="300px">

With the help of **[CSS Flexible Box Layout](https://en.wikipedia.org/wiki/CSS_Flexible_Box_Layout)**, Gossip provide the *container* element to manage other elements, such as texts, images, container, etc. Users can add elements to container and specify their arrangement(horizontal or vertical) and proportion(1:1 or 1:3).

One of the main advantages is that for each elements, Gossip will automatically set the proper position or size of it according to its container's styles(padding, direction, etc.) and the other elements in that container. The other one is that users can operate a group of elements rather than just on each time.

![element](./screenshots/element.gif)

### Revising: Style and Variable

**Lastly, the revision stage involves reviewing the work, adding new ideas and fixing inconsistencies with the original organization.**

The features introduced above already have shown that it is pretty easy to add, delete, edit each slides and adjust the structure of whole presentation in Gossip. Those are related to the content of presentation, but there is also a need to make change styles easy. To solve this problem, Gossip offer a *Style* and *Variable* panel to presenters.

<img src="./screenshots/style.png" height="300px">&emsp;<img src="./screenshots/variable.png" height="300px">

For those elements which tend to have the same or similar styles, such as the font color of highlight texts or the font size of title, Gossip enables user to create a variable and assign to these elements. **When user change the value of variable, Gossip will change the value of related elements as well!**

## Delivery a presentation

In order to hold audience's interests and help presenter communicate the structure of a presentation to the audience, Gossip uses some cool but meaningful switch animation and a *Word Cloud* mode.

### Switch animation: Zoom in, Zoom out, Rotate

The *Zoom in animation* will remind the audience of from big point to small point. And *Zoom out* animation is for small point to big point. If the two points are at the same level, it will be the *Rotate* animation.

### Overview: Word Cloud mode

*Word Cloud* mode use traditional word cloud algorithm to layout each slides which let the audience quickly familiarize or review the general content of the entire slide. It is also helpful when the audience asks the presenter a question about specific slide, because presenter needn't to scroll the mouse wheel to find the specific slide.

## Limitations

There are some limitations in Gossip now.

- Outline is not flexible enough.
- Variables are not easy enough to use.
- Layout method is not convent enough.
- No support for animation, template, shortcuts, redo, undo, etc.
- The context provided during delivering is not enough.
- Word cloud mode have some problems.

## Future works

- Solve the problems mentioned above.
- Design a better UI.

## How to contribute

Gossip 1.0 is just a course project, we need you encourage and advice to improve the code and features of it.

If you like Gossip, not only can you star it, you can also do the following things.

- Join [Telegram](https://t.me/joinchat/S4-TmBwTcGFnmSYM0gxsdw) to discuss.
- Give us the slides you made by Gossip and we will display some of them.
- Fill out the [questionnaire](https://www.wjx.cn/jq/77277467.aspx).
  
## Technology stack

[umi@2.x](https://v2.umijs.org/) + [antd@3.x](https://3x.ant.design/)
