---
title: spirografont
layout: home
---

# spirografont

Like a spirograph, for fonts: Change the parameters, make something pretty, and waste time.

{% for font in site.segmented %}
{% capture url %}{{ site.baseurl }}{{ font.url }}{% endcapture %}
- [{{ font.name }}]({{ url }})
{% endfor %}

[source code on github](https://github.com/mccalluc/spirografont)