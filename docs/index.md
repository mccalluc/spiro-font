---
title: spiro-font
layout: home
---

# spiro-font

Like a spirograph, for fonts: Change the parameters, make something interesting, and waste time.

{% for font in site.fonts %}
{% capture url %}{{ site.baseurl }}{{ font.url }}{% endcapture %}
- [{{ font.name }}]({{ url }})
{% endfor %}

[source code on github](https://github.com/mccalluc/spiro-font)